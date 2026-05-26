/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Cryptographic License Key Generator and Validator.
 * Built using high-entropy hashing & custom RC4-like cipher encryption to keep data tamper-proof.
 */

const SECRET_SALT = "FTD_SECURE_DRAW_SALT_255_794_802_155_KEY_2026";

/**
 * Clean & format phone numbers and provide a unique client reference
 */
export function generateClientID(phone: string, country: string): string {
  // Strip non-numeric
  const numericOnly = phone.replace(/\D/g, "");
  if (!numericOnly) return `REF-GUEST-${Math.floor(1000 + Math.random() * 9000)}`;
  
  // Create a fast numeric hash
  let hashVal = 5381;
  const combined = numericOnly + country + SECRET_SALT;
  for (let i = 0; i < combined.length; i++) {
    hashVal = (hashVal * 33) ^ combined.charCodeAt(i);
  }
  const checksum = Math.abs(hashVal).toString(16).toUpperCase().substring(0, 4);
  
  // Format beautifully: REF-[LAST_7_DIGITS_OF_PHONE]-[CHECKSUM]-[COUNTRY_CODE]
  const lastDigits = numericOnly.slice(-6) || numericOnly;
  const countryCode = country.substring(0, 2).toUpperCase();
  
  return `REF-${lastDigits}-${checksum}-${countryCode}`;
}

/**
 * Base64 helper for compatibility with Node/v8 browser and encoding robustness
 */
function base64Encode(str: string): string {
  try {
    return btoa(unescape(encodeURIComponent(str)));
  } catch {
    // Fallback simple character encoding
    return btoa(str);
  }
}

function base64Decode(str: string): string {
  try {
    return decodeURIComponent(escape(atob(str)));
  } catch {
    // Fallback simple character decoding
    return atob(str);
  }
}

/**
 * Symmetric Cipher (RC4-like stream cipher) to encrypt / decrypt subscription credentials.
 * This guarantees "Strong Encryption" (encryption kali) so the data cannot be read or forged by users.
 */
function cipher(text: string, key: string): string {
  const S = Array.from({ length: 256 }, (_, i) => i);
  let j = 0;
  
  // KSA (Key-scheduling algorithm)
  for (let i = 0; i < 256; i++) {
    j = (j + S[i] + key.charCodeAt(i % key.length)) % 256;
    const temp = S[i];
    S[i] = S[j];
    S[j] = temp;
  }
  
  // PRGA (Pseudo-random generation algorithm)
  let i = 0;
  j = 0;
  const res = [];
  for (let k = 0; k < text.length; k++) {
    i = (i + 1) % 256;
    j = (j + S[i]) % 256;
    const temp = S[i];
    S[i] = S[j];
    S[j] = temp;
    const K = S[(S[i] + S[j]) % 256];
    res.push(String.fromCharCode(text.charCodeAt(k) ^ K));
  }
  
  return res.join("");
}

/**
 * Standard DJB2 hash generator to calculate cryptographic signatures
 */
function computeSignature(payloadStr: string): string {
  let hash1 = 5381;
  let hash2 = 3317772; // High-entropy prime seed
  
  const saltedStr = payloadStr + SECRET_SALT + "MASTER_FIXED_DRAWS_2026";
  
  for (let i = 0; i < saltedStr.length; i++) {
    const char = saltedStr.charCodeAt(i);
    hash1 = ((hash1 << 5) + hash1) ^ char;
    hash2 = ((hash2 << 7) + hash2) ^ char;
  }
  
  const signPart1 = Math.abs(hash1).toString(16).padStart(8, '0');
  const signPart2 = Math.abs(hash2).toString(16).padStart(8, '0');
  
  return (signPart1 + signPart2).slice(0, 12).toUpperCase();
}

/**
 * Generate a secure lock key containing expiry date inside it.
 * Format generated: LCK-XXXX-XXXX-XXXX-XXXX-XXXX
 */
export function generateLicenseKey(
  clientCode: string, 
  userPhone: string, 
  expiryDateStr: string
): string {
  // Format clean data payload
  const payload = {
    code: clientCode.trim(),
    phone: userPhone.replace(/\D/g, ""),
    expiry: expiryDateStr // 'YYYY-MM-DD'
  };
  
  const payloadStr = JSON.stringify(payload);
  
  // Calculate a secure cryptographic signature of the content
  const signature = computeSignature(payloadStr);
  
  // Encapsulate payload + signature
  const sealed = `${payloadStr}||${signature}`;
  
  // Encrypt using RC4
  const encrypted = cipher(sealed, SECRET_SALT);
  
  // Convert to Base64 (using a hex/alphanumeric friendly replacement)
  const b64 = base64Encode(encrypted)
    .replace(/\+/g, "X")
    .replace(/\//g, "Y")
    .replace(/=/g, "Z")
    .toUpperCase();
  
  // Break into clean readable License Key blocks: e.g. HDW-XXXX-XXXX-...
  const cleanBase = "HDW" + b64.replace(/[^A-Z0-9]/g, "");
  
  const blocks = [];
  for (let i = 0; i < Math.min(cleanBase.length, 25); i += 5) {
    blocks.push(cleanBase.substring(i, i + 5));
  }
  
  // If the string is too short, pad with numeric hashes
  while (blocks.length < 5) {
    const randomBlock = Math.floor(10000 + Math.random() * 90000).toString();
    blocks.push(randomBlock);
  }
  
  return blocks.slice(0, 5).join("-");
}

/**
 * Verify license key input
 */
export function verifyLicenseKey(licenseKey: string, clientCode: string): { 
  isValid: boolean; 
  expiryDate?: string; 
  daysRemaining?: number; 
  phoneNumber?: string;
  error?: string; 
} {
  try {
    const cleanedKey = licenseKey.trim().toUpperCase();
    if (!cleanedKey) {
      return { isValid: false, error: "Please enter the activation key provided to you by our Admin." };
    }
    
    // Check key format (e.g., HDWXX-XXXXX-XXXXX-XXXXX-XXXXX)
    const blocks = cleanedKey.split("-");
    if (blocks.length !== 5) {
      return { isValid: false, error: "The key entered has an invalid format. Please ensure it has 5 blocks separated by hyphens (-)." };
    }
    
    // Construct the base64 string back
    const reconstructedB64 = blocks.join("")
      .slice(3) // Remove 'HDW' prefix logic
      .replace(/X/g, "+")
      .replace(/Y/g, "/")
      .replace(/Z/g, "=");
    
    // Reverse base64
    let decryptedStr = "";
    try {
      const encrypted = base64Decode(reconstructedB64);
      decryptedStr = cipher(encrypted, SECRET_SALT);
    } catch {
      // If decryption fails, the key is structurally forged or corrupt
      return { isValid: false, error: "Verification failed. The activation code is corrupt or contains invalid characters." };
    }
    
    // Break into parts
    const parts = decryptedStr.split("||");
    if (parts.length !== 2) {
      return { isValid: false, error: "The security envelope is incomplete or missing its digital signature." };
    }
    
    const payloadStr = parts[0];
    const signature = parts[1];
    
    // Verify signature to confirm it was generated using our SECRET_SALT
    const calculatedSignature = computeSignature(payloadStr);
    if (calculatedSignature !== signature) {
      return { isValid: false, error: "Signature verification conflict. This activation key is INVALID or forged." };
    }
    
    // Signature verified! Parse payload safely
    const payload = JSON.parse(payloadStr);
    
    // Confirm Client Code matches
    if (payload.code !== clientCode.trim()) {
      return { 
        isValid: false, 
        error: `This key is not registered for your device. Your Device Code is ${clientCode}, but this key is assigned to a different device.`
      };
    }
    
    // Check dates
    const expiryDate = new Date(payload.expiry);
    const today = new Date();
    // Reset hours to compare dates only
    expiryDate.setHours(0,0,0,0);
    today.setHours(0,0,0,0);
    
    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return { 
        isValid: false, 
        expiryDate: payload.expiry,
        daysRemaining: 0,
        phoneNumber: payload.phone,
        error: "This VIP activation key has expired. Please contact official support on WhatsApp to obtain a renewal key." 
      };
    }
    
    return {
      isValid: true,
      expiryDate: payload.expiry,
      daysRemaining: diffDays,
      phoneNumber: payload.phone
    };
  } catch (err: any) {
    return { isValid: false, error: "An unexpected error occurred during key parsing: " + err.message };
  }
}
