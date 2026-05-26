import React, { useState } from 'react';
import { generateLicenseKey } from '../utils/crypto';
import { KeyRound, Copy, Check, ShieldCheck, Calendar, ShieldAlert, Key, MessageSquare } from 'lucide-react';

interface AdminPanelProps {
  currentDateStr: string;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ currentDateStr }) => {
  const [isAdminUnlocked, setIsAdminUnlocked] = useState<boolean>(false);
  const [adminPin, setAdminPin] = useState<string>("");
  const [pinError, setPinError] = useState<string>("");

  // Key generator inputs
  const [customerClientCode, setCustomerClientCode] = useState<string>("");
  const [customerPhone, setCustomerPhone] = useState<string>("");
  const [validityDays, setValidityDays] = useState<number>(60); // Default 2 months
  
  // Output Key
  const [generatedKey, setGeneratedKey] = useState<string>("");
  const [copiedKey, setCopiedKey] = useState<boolean>(false);

  // Authenticate Admin
  const handleAdminVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPin === "2026" || adminPin.toLowerCase() === "admin") {
      setIsAdminUnlocked(true);
      setPinError("");
    } else {
      setPinError("Invalid Master PIN. Please try using '2026' to unlock the admin dashboard.");
    }
  };

  // Generate cryptographic Key
  const handleGenerateKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerClientCode.trim()) {
      alert("Please enter a Client Device Code to generate a working key.");
      return;
    }

    // Calculate expiry date
    const expDate = new Date(currentDateStr);
    expDate.setDate(expDate.getDate() + validityDays);
    const dateFormatted = expDate.toISOString().split('T')[0];

    // Lock key generation
    const key = generateLicenseKey(customerClientCode.trim(), customerPhone || "GUEST", dateFormatted);
    setGeneratedKey(key);
    setCopiedKey(false);
  };

  // Copy Key Helper
  const handleCopyKey = () => {
    navigator.clipboard.writeText(generatedKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  // WhatsApp share back to customer
  const handleSendToUserWhatsApp = () => {
    if (!customerPhone) {
      alert("Please enter a buyer WhatsApp number to forward the key.");
      return;
    }
    const cleanPhone = customerPhone.replace(/\D/g, "");
    const msg = `Hello! Your payment for Fixed Draws FT has been fully verified. ✅\n\nHere is your unique Activation Key to unlock the application for 60 Days (2 Months):\n\n🔑 Key: ${generatedKey}\n\nExpiration Date: ${
      new Date(new Date(currentDateStr).getTime() + validityDays * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    }\n\nEnter this key in your app under the Activation Key option to get instant VIP access to our 10+ odds matches!`;
    
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="bg-[#FCFAF3] border border-[#E7E0D2] rounded-3xl p-6 relative overflow-hidden shadow-md">
      
      {/* Decorative luxury line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-amber-600 to-[#AA7C11]"></div>

      {/* Admin header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#E7E0D2] mb-5">
        <div>
          <h2 className="text-sm font-black text-slate-800 flex items-center gap-2">
            ADMIN SYSTEM CONTROL <ShieldCheck className="w-5 h-5 text-amber-700" />
          </h2>
          <p className="text-slate-500 text-[11px] leading-normal font-medium">Cryptographic panel for application administrators to generate secure Activation Keys for authenticated buyers.</p>
        </div>
      </div>

      {/* ADMIN IS LOCKED STATE */}
      {!isAdminUnlocked ? (
        <div id="admin-login-holder" className="max-w-md mx-auto py-4">
          <form onSubmit={handleAdminVerify} className="space-y-4">
            <div className="text-center space-y-2 mb-4">
              <div className="inline-flex p-3 rounded-2xl bg-[#FAF6EE] border border-[#E7E0D2] text-amber-700">
                <KeyRound className="w-6 h-6" />
              </div>
              <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest font-mono">Verify Administrator Status</h3>
              <p className="text-[10.5px] text-slate-500 leading-relaxed font-semibold">
                Provide the administrator master PIN to authorize key issuance. Default PIN is <strong className="text-amber-800">2026</strong>.
              </p>
            </div>

            <div className="space-y-2">
              <input
                type="password"
                value={adminPin}
                onChange={(e) => setAdminPin(e.target.value)}
                placeholder="Enter password/PIN (e.g. 2026)"
                className="w-full bg-white border border-[#CBD5E1] rounded-xl px-4 py-3 text-center text-slate-800 focus:outline-none focus:border-amber-600 tracking-widest font-mono text-xs shadow-sm"
              />
            </div>

            {pinError && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-[10px] text-rose-800 flex items-start gap-2 font-semibold">
                <ShieldAlert className="w-4.5 h-4.5 mt-0.5 shrink-0 text-rose-600" />
                <span>{pinError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-600 to-[#AA7C11] text-white font-black py-3 rounded-2xl text-xs transition active:scale-95 cursor-pointer uppercase tracking-wider font-mono shadow-sm border-none"
            >
              Verify Master PIN & Unlock
            </button>
          </form>
        </div>
      ) : (
        
        // ADMIN ACCESSED STATE
        <div id="admin-unlocked-holder" className="space-y-6 animate-fade-in text-slate-800">
          
          <div className="p-4 bg-emerald-50 border border-emerald-250 rounded-2xl text-emerald-800 text-[10.5px] flex items-center justify-between font-semibold leading-relaxed">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 shrink-0 text-emerald-600" />
              <span>Authorized Session: Encryption engines and Key generation routines are unlocked.</span>
            </div>
            <button
              onClick={() => {
                setIsAdminUnlocked(false);
                setAdminPin("");
              }}
              className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-800 text-[9px] font-bold font-mono border border-[#CBD5E1] shadow-sm shrink-0 cursor-pointer"
            >
              LOGOUT / SECURE CARD
            </button>
          </div>

          <form onSubmit={handleGenerateKey} className="grid grid-cols-1 md:grid-cols-2 gap-6 text-slate-800">
            
            <div className="space-y-4">
              <h3 className="text-xs font-black text-slate-800 border-b border-[#E7E0D2] pb-1.5 flex items-center gap-2 uppercase tracking-wider font-mono">
                <Calendar className="w-4 h-4 text-amber-700" /> 1. Authenticated Buyer Details
              </h3>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-bold block">Buyer Device Code (Client ID) <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required
                  value={customerClientCode}
                  onChange={(e) => setCustomerClientCode(e.target.value)}
                  placeholder="e.g. REF-802155-BFA8-TZ"
                  className="w-full bg-white border border-[#CBD5E1] rounded-xl px-3.5 py-2.5 text-slate-800 placeholder-slate-400 font-mono text-xs focus:outline-none focus:border-amber-600 shadow-sm"
                />
                <span className="text-[9px] text-slate-450 font-medium leading-none block pt-0.5">The buyer copies and sends this code from their App screen.</span>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-bold block">Buyer WhatsApp Number (Optional)</label>
                <input
                  type="text"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="e.g. 255794802155"
                  className="w-full bg-white border border-[#CBD5E1] rounded-xl px-3.5 py-2.5 text-slate-800 placeholder-slate-400 font-mono text-xs focus:outline-none focus:border-amber-600 shadow-sm"
                />
                <span className="text-[9px] text-slate-450 font-medium leading-none block pt-0.5">Formulates a direct pre-configured copyable message for WhatsApp messaging.</span>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-bold block">License Validity Duration</label>
                <select
                  value={validityDays}
                  onChange={(e) => setValidityDays(Number(e.target.value))}
                  className="w-full bg-white border border-[#CBD5E1] rounded-xl px-3.5 py-2.5 text-slate-800 font-mono text-xs focus:outline-none focus:border-amber-600 shadow-sm"
                >
                  <option value={60}>60 Days (2 Months) - Recommended</option>
                  <option value={30}>30 Days (1 Month)</option>
                  <option value={120}>120 Days (4 Months)</option>
                  <option value={365}>365 Days (1 Year)</option>
                  <option value={2}>2 Days (Testing / Sandbox)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-600 to-[#AA7C11] text-white font-black py-2.5 rounded-xl text-xs transition duration-200 block text-center cursor-pointer font-mono border-none shadow-sm"
              >
                Generate Device Activation Key
              </button>
            </div>

            {/* Generated results key section */}
            <div className="space-y-4">
              <h3 className="text-xs font-black text-slate-805 border-b border-[#E7E0D2] pb-1.5 flex items-center gap-1.5 uppercase tracking-wider font-mono">
                <Key className="w-4 h-4 text-emerald-700" /> 2. Generated System Key
              </h3>

              {!generatedKey ? (
                <div className="h-44 bg-[#FAF6EE] border border-[#CBD5E1] border-dashed rounded-2xl flex items-center justify-center text-xs text-slate-450 italic font-semibold text-center px-4">
                  Fill in the client details on the left, then click generate key.
                </div>
              ) : (
                <div className="space-y-4 animate-scale-up">
                  <div className="bg-white border-2 border-emerald-500/30 rounded-2xl p-4.5 text-center relative shadow-sm">
                    <span className="text-[8px] text-amber-800 bg-amber-50 border border-[#E1D4C0]/70 px-2.5 py-1 rounded-full font-black font-mono uppercase absolute -top-2.5 left-1/2 transform -translate-x-1/2 block">
                      EXCLUSIVE LICENSE ACCESS KEY
                    </span>
                    
                    <div className="text-sm font-black text-emerald-700 tracking-widest font-mono py-4 select-all">
                      {generatedKey}
                    </div>

                    <div className="flex items-center justify-around gap-2 pt-2 border-t border-[#E7E0D2] text-[10px] text-slate-500 font-mono">
                      <span>Ref: {validityDays} Days</span>
                      <span>•</span>
                      <span>Expires: {new Date(new Date(currentDateStr).getTime() + validityDays * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={handleCopyKey}
                      className="w-full bg-white hover:bg-slate-50 border border-[#CBD5E1] text-slate-700 font-semibold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition cursor-pointer shadow-sm"
                    >
                      {copiedKey ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-600" /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" /> Copy Key
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      disabled={!customerPhone}
                      onClick={handleSendToUserWhatsApp}
                      className="w-full bg-[#10b981] hover:bg-[#059669] text-white font-semibold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition disabled:opacity-40 cursor-pointer shadow-sm border-none"
                    >
                      <MessageSquare className="w-4 h-4" /> Send Key WA
                    </button>
                  </div>
                  
                  {!customerPhone && (
                    <p className="text-[10px] text-amber-800 italic text-center font-semibold">Provide the buyer's phone number on the left to activate instant WhatsApp forwarding.</p>
                  )}
                </div>
              )}
            </div>

          </form>

        </div>
      )}

    </div>
  );
};
export default AdminPanel;
