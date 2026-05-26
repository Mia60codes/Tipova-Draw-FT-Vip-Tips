import { useState, useEffect } from 'react';
import { getMatches } from './data/mockMatches';
import { generateClientID, verifyLicenseKey } from './utils/crypto';
import { LockedDraws } from './components/LockedDraws';
import { AdminPanel } from './components/AdminPanel';
import { LicenseStatus } from './types';
import { 
  Flame, Lock, Unlock, Settings, Info 
} from 'lucide-react';

export default function App() {
  const currentDateStr = "2026-05-23"; // Steady current local date
  const allMatches = getMatches(currentDateStr);

  // States
  const [showAdmin, setShowAdmin] = useState<boolean>(false);
  
  // Credentials and licensing state
  const [authorizedKey, setAuthorizedKey] = useState<string | null>(null);
  const [buyerPhone, setBuyerPhone] = useState<string>("");
  const [licenseStatus, setLicenseStatus] = useState<LicenseStatus | null>(null);

  // Check state on load
  useEffect(() => {
    const storedKey = localStorage.getItem("fixed_tips_vip_license");
    const storedPhone = localStorage.getItem("fixed_tips_buyer_phone") || "GUEST";
    
    if (storedKey) {
      // Re-validate cryptographic key
      const clientCode = generateClientID(storedPhone, "TZ"); // Standard validation matching client TZ
      const verify = verifyLicenseKey(storedKey, clientCode);
      
      if (verify.isValid) {
        setAuthorizedKey(storedKey);
        setBuyerPhone(storedPhone);
        setLicenseStatus({
          isValid: true,
          expiryDate: verify.expiryDate,
          daysRemaining: verify.daysRemaining,
          clientCode,
          phoneNumber: storedPhone
        });
      } else {
        // Expired or corrupt, clean it out
        localStorage.removeItem("fixed_tips_vip_license");
        localStorage.removeItem("fixed_tips_buyer_phone");
        setLicenseStatus({
          isValid: false,
          error: "The registration key has expired or is invalid. Please check your inputs or obtain a new key."
        });
      }
    }
  }, []);

  // Set new valid credentials on successful verification
  const handleUnlockSuccess = (key: string, phone: string, expiry: string) => {
    const clientCode = generateClientID(phone, "TZ");
    localStorage.setItem("fixed_tips_vip_license", key);
    localStorage.setItem("fixed_tips_buyer_phone", phone);
    
    setAuthorizedKey(key);
    setBuyerPhone(phone);
    
    // Recalculate days remaining
    const expiryDate = new Date(expiry);
    const today = new Date();
    expiryDate.setHours(0,0,0,0);
    today.setHours(0,0,0,0);
    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    setLicenseStatus({
      isValid: true,
      expiryDate: expiry,
      daysRemaining: diffDays,
      clientCode,
      phoneNumber: phone
    });
  };

  // Exit VIP
  const handleClearLicense = () => {
    localStorage.removeItem("fixed_tips_vip_license");
    localStorage.removeItem("fixed_tips_buyer_phone");
    setAuthorizedKey(null);
    setBuyerPhone("");
    setLicenseStatus(null);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-slate-800 font-sans selection:bg-amber-100 selection:text-amber-900 pb-28">
      
      {/* 1. TOP HEADER / BRAND NAVIGATION */}
      <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#EBE5D8] px-4 py-4 sm:px-8 shadow-sm">
        <div className="max-w-md mx-auto flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <div className="p-2 bg-gradient-to-br from-[#D4AF37] to-[#AA7C11] text-white rounded-xl shadow-[0_4px_12px_rgba(212,175,55,0.15)]">
                <Flame className="w-4.5 h-4.5 text-white fill-current animate-pulse" />
              </div>
              <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </div>
            
            <div className="space-y-0.5">
              <h1 id="app-main-title" className="text-[13px] font-black tracking-widest font-display text-slate-800 uppercase">
                Fixed Draws <span className="text-amber-700 font-black font-sans text-[10px]/none tracking-wider">VIP</span>
              </h1>
              <div className="flex items-center gap-1 text-[8.5px] text-slate-500 font-mono">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>SYSTEM LIVE</span>
              </div>
            </div>
          </div>

          {/* Secure VIP state badge inside header */}
          <div className="flex items-center">
            {licenseStatus?.isValid ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-[10px] font-black font-mono bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-sm">
                <Unlock className="w-3 h-3 text-emerald-600" /> VIP ON
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-[10px] font-black font-mono bg-amber-50 text-amber-800 border border-amber-200/60 animate-pulse">
                <Lock className="w-3 h-3 text-amber-600" /> VIP LOCKED
              </span>
            )}
          </div>

        </div>
      </header>

      {/* 2. BODY LAYOUT HERO SECTION */}
      <main className="max-w-md mx-auto px-4 py-6 space-y-6">
        
        {/* Exclusive Content display */}
        <div>
          <LockedDraws 
            currentDateStr={currentDateStr} 
            allMatches={allMatches}
            onUnlockSuccess={handleUnlockSuccess}
            authorizedKey={authorizedKey}
            licenseStatus={licenseStatus}
            onClearLicense={handleClearLicense}
          />
        </div>

        {/* 3. OPTIONAL COLLAPSIBLE ADMIN CONTROL PANEL FOR OWNER */}
        <div className="border-t border-[#EBE5D8] pt-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-[9px] text-slate-400 font-mono uppercase tracking-wider">
              SYSTEM: ENCRYPTED • RC4 SIGNATURE ACTIVE
            </div>
            
            <button
              onClick={() => {
                setShowAdmin(!showAdmin);
              }}
              className="px-2.5 py-1.5 rounded-xl bg-white border border-[#E4DDD0] hover:border-slate-350 text-slate-600 hover:text-slate-800 text-[10px] font-bold font-mono flex items-center gap-1 transition-all shadow-sm cursor-pointer"
            >
              <Settings className="w-3 h-3 text-slate-500" /> 
              {showAdmin ? "Close Admin" : "Open Admin"}
            </button>
          </div>

          {showAdmin && (
            <div id="admin-tab-container" className="animate-scale-up">
              <AdminPanel currentDateStr={currentDateStr} />
            </div>
          )}
        </div>

      </main>

      {/* 4. FOOTER */}
      <footer className="border-t border-[#EBE5D8] bg-[#F4EFE6] py-12 mt-16 px-4 text-center text-xs text-slate-500">
        <div className="max-w-2xl mx-auto space-y-3">
          <p className="font-mono text-[10px] leading-relaxed uppercase tracking-wider">
            Sports predictions and gaming are strictly for 18+. Please play responsibly.
          </p>
          <p className="text-[10px] text-slate-450 leading-relaxed">
            Copyright © 2026 Fixed Draws FT. All rights reserved. Cryptographic locks powered by RC4 Symmetric Cipher keys.
          </p>
        </div>
      </footer>

      {/* 5. GORGEOUS STICKY FLOATING BOTTOM BAR WITH GLASS EFFECT AND GOLD ACCENTS */}
      <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4.5 pointer-events-none">
        <div className="max-w-md mx-auto pointer-events-auto">
          {/* Main button card with dual-color high premium gradient border */}
          <div className="bg-gradient-to-r from-amber-600 via-[#D4AF37] to-emerald-600 p-[1.5px] rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_50px_rgba(0,0,0,0.38)] duration-300">
            <a 
              href="https://wa.me/255794802155?text=Hello%20Bro%20i%20am%20ready%20to%20pay%20for%20fixed%20draws"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-3 bg-gradient-to-r from-[#10b981] to-[#059669] hover:from-[#059669] hover:to-[#047857] text-white px-4.5 py-4 rounded-[14px] transition-all duration-300 group no-underline shadow-inner"
            >
              <div className="flex items-center gap-2.5">
                <div className="relative flex h-3 w-3 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-85"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                </div>
                <div className="space-y-0.5">
                  <span className="block text-[11.5px] font-black tracking-widest leading-none font-sans text-white uppercase group-hover:underline">
                    MESSAGE OWNER TO GET VIP
                  </span>
                  <span className="block text-[8.5px] font-mono font-black tracking-wider text-emerald-100 uppercase">
                    10+ Odds Guaranteed Draws FT • ACTIVE
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-1.5 bg-black/15 text-white font-mono text-[9px] font-extrabold px-3 py-2 rounded-xl border border-white/20 shrink-0 shadow-sm">
                +255794802155 📲
              </div>
            </a>
          </div>
        </div>
      </div>

    </div>
  );
}
