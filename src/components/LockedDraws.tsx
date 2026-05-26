import React, { useState } from 'react';
import { Match, LicenseStatus } from '../types';
import { PRICING_LIST, ADMIN_WHATSAPP } from '../data/pricing';
import { generateClientID, verifyLicenseKey } from '../utils/crypto';
import { historyDays } from '../data/historyData';
import { 
  Lock, Unlock, ShieldAlert, Copy, Check, 
  MessageSquare, History, Sparkles, KeyRound, BadgeInfo, 
  Award, BookOpen, Zap
} from 'lucide-react';

interface LockedDrawsProps {
  currentDateStr: string;
  allMatches: Match[];
  onUnlockSuccess: (key: string, phone: string, expiry: string) => void;
  authorizedKey: string | null;
  licenseStatus: LicenseStatus | null;
  onClearLicense: () => void;
}

export const LockedDraws: React.FC<LockedDrawsProps> = ({ 
  currentDateStr,
  allMatches,
  onUnlockSuccess,
  authorizedKey,
  licenseStatus,
  onClearLicense
}) => {
  // Navigation states
  const [showActivationModal, setShowActivationModal] = useState<boolean>(false);
  const [showHistoryModal, setShowHistoryModal] = useState<boolean>(false);
  const [showDescriptionModal, setShowDescriptionModal] = useState<boolean>(false);
  const [selectedCountryId, setSelectedCountryId] = useState<string>("TZ");
  const [phoneInput, setPhoneInput] = useState<string>("");
  const [licenseKeyInput, setLicenseKeyInput] = useState<string>("");
  
  // Interaction states
  const [copiedClientId, setCopiedClientId] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [checking, setChecking] = useState<boolean>(false);

  // Dynamic date calculations
  const baseDate = new Date(currentDateStr);
  const getOffsetDateStr = (offset: number): string => {
    const d = new Date(baseDate);
    d.setDate(baseDate.getDate() + offset);
    return d.toISOString().split('T')[0];
  };
  const yesterdayStr = getOffsetDateStr(-1);
  const todayStr = getOffsetDateStr(0);

  const currentPricing = PRICING_LIST.find(p => p.id === selectedCountryId) || PRICING_LIST[0];
  const activeClientCode = generateClientID(phoneInput || "GUEST", currentPricing.id);

  // Copy helper
  const handleCopyClientId = () => {
    navigator.clipboard.writeText(activeClientCode);
    setCopiedClientId(true);
    setTimeout(() => setCopiedClientId(false), 2000);
  };

  // Launch pre-filled WhatsApp link with the user's exact requested phrase
  const handleContactWhatsApp = () => {
    const baseMessage = "Hello Bro i am ready to pay for fixed draws";
    const details = `\n\n📍 COUNTRY: ${currentPricing.country} ${currentPricing.flag}\n💵 PRICE: ${currentPricing.priceFormatted}\n🔑 SMART CLIENT ID: ${activeClientCode}${phoneInput ? `\n📱 PHONE: ${phoneInput}` : ''}`;
    const fullMessage = `${baseMessage}${details}`;
    const whatsappUrl = `https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(fullMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  // Verify activation key
  const handleVerifyKey = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setChecking(true);

    setTimeout(() => {
      const result = verifyLicenseKey(licenseKeyInput, activeClientCode);
      if (result.isValid && result.expiryDate) {
        onUnlockSuccess(licenseKeyInput, result.phoneNumber || phoneInput || "GUEST", result.expiryDate);
        setShowActivationModal(false);
        setLicenseKeyInput("");
      } else {
        setErrorMessage(result.error || "The license key was not found or verified on our authorization servers. Please purchase a valid key from official WhatsApp support.");
      }
      setChecking(false);
    }, 1200);
  };

  // Extract matches categorizations
  const premiumMatches = allMatches.filter(m => m.classification === 'premium_draw');
  const yesterdaysPremiumDraws = premiumMatches.filter(m => m.time.startsWith(yesterdayStr));
  const activePremiumDraws = premiumMatches.filter(m => m.time.startsWith(todayStr));

  // If client is UNLOCKED
  if (licenseStatus?.isValid) {
    return (
      <div className="space-y-6 animate-fade-in max-w-md mx-auto">
        
        {/* Active badge with Ultra Premium Cream card with forest-green border */}
        <div className="bg-[#FCFAF3] border-2 border-emerald-600 rounded-3xl p-6 text-center space-y-4 shadow-md relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl"></div>
          
          <div className="inline-flex p-3 rounded-2xl bg-gradient-to-tr from-emerald-600 to-emerald-500 text-white shadow-md animate-bounce">
            <Unlock className="w-5.5 h-5.5" />
          </div>
          
          <div className="space-y-1.5">
            <h3 className="text-sm font-black tracking-widest text-emerald-700 uppercase font-display">YOUR VIP LICENSE IS ACTIVE</h3>
            <p className="text-[11px] text-slate-600 max-w-xs mx-auto leading-relaxed font-semibold">
              Congratulations! Your license key is valid and successfully saved on your device. Enjoy today's 3 fixed tips below.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3.5 py-1 text-center font-mono">
            <div className="bg-[#FAF6EE] border border-emerald-650/15 rounded-2xl p-3 shadow-inner">
              <span className="text-[8.5px] text-slate-500 uppercase block font-bold">DAYS REMAINING</span>
              <span className="text-sm font-black text-emerald-700">{licenseStatus.daysRemaining} Days</span>
            </div>
            <div className="bg-[#FAF6EE] border border-emerald-650/15 rounded-2xl p-3 shadow-inner">
              <span className="text-[8.5px] text-slate-500 uppercase block font-bold">EXPIRATION DATE</span>
              <span className="text-[11px] font-bold text-slate-700">{licenseStatus.expiryDate}</span>
            </div>
          </div>

          <button 
            onClick={onClearLicense}
            className="w-full text-center text-[9.5px] font-mono text-rose-600 hover:text-rose-500 py-1 transition cursor-pointer hover:underline font-bold"
          >
            Exit VIP Account (Deactivate Key)
          </button>
        </div>

        {/* Matches lists */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping"></span>
              <span className="text-[11px] font-black text-slate-705 uppercase tracking-widest font-mono">TODAY'S ODDS 10+ MATCHES</span>
            </div>
            <span className="text-[8.5px] font-black text-emerald-700 font-mono bg-emerald-50 border border-emerald-300/40 px-2.5 py-1 rounded-xl">VIP ACTIVE</span>
          </div>

          <div className="space-y-3.5">
            {activePremiumDraws.map((match) => (
              <div 
                key={match.id}
                className="bg-[#FCFAF3] border border-[#E7E0D2] rounded-3xl p-5 space-y-4 hover:border-amber-450 transition-all duration-300 relative overflow-hidden shadow-sm"
              >
                {/* Subtle Luxury amber left indicator border */}
                <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-gradient-to-b from-[#D4AF37] to-[#AA7C11]"></div>

                <div className="flex items-center justify-between text-[10px] text-slate-550 pl-2">
                  <span className="bg-[#FAF6EE] px-3 py-1 rounded-lg font-black text-amber-800 border border-[#EBE5D8] truncate max-w-[170px] uppercase font-mono">
                    {match.league}
                  </span>
                  <span className="font-mono bg-[#FAF6EE] px-2.5 py-1 rounded-lg font-bold text-slate-500 text-[9px] border border-[#EBE5D8]">
                    Time: {match.time.split(' ')[1]} EAT
                  </span>
                </div>

                <div className="flex flex-col text-center space-y-1.5 py-1">
                  <span className="text-sm font-black text-slate-800 uppercase tracking-tight">{match.homeTeam}</span>
                  <span className="text-[9px] font-black text-amber-805 tracking-widest font-mono self-center px-3 py-0.5 bg-[#FAF6EE] rounded-xl border border-[#EBE5D8]">VS</span>
                  <span className="text-sm font-black text-slate-800 uppercase tracking-tight">{match.awayTeam}</span>
                </div>

                <div className="border-t border-[#EBE5D8] pt-3.5 flex items-center justify-between pl-2">
                  <div className="flex flex-col">
                    <span className="text-[8.5px] text-slate-400 uppercase font-mono tracking-wider font-bold">PREDICTION</span>
                    <span className="text-sm font-black text-emerald-700 font-mono tracking-widest">{match.tip}</span>
                  </div>
                  <div className="bg-[#FAF6EE] px-4 py-2 rounded-xl border border-[#EBE5D8] text-center shadow-inner">
                    <span className="text-[8.5px] text-slate-400 block font-mono font-bold">ODDS</span>
                    <span className="text-sm font-black text-amber-800 font-mono">{match.odds.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Combined Accumulator info */}
          <div className="bg-[#FCFAF3] border border-[#E7E0D2] rounded-3xl p-5 flex items-center justify-between shadow-sm">
            <div className="space-y-1">
              <span className="text-[8.5px] text-slate-400 uppercase font-mono block font-bold">MULTI-BET SUMMARY</span>
              <span className="text-[11px] text-slate-700 font-bold leading-tight">All three (3) draws combined together</span>
            </div>
            <div className="bg-[#FAF6EE] border border-[#EBE5D8] px-4 py-2 rounded-xl text-center shadow-inner">
              <span className="text-[8.5px] text-slate-450 block font-bold">Total Odds</span>
              <span className="text-base font-black text-emerald-700 font-mono leading-none">
                {activePremiumDraws.reduce((acc, m) => acc * m.odds, 1).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // PORTRAIT ACCORDING TO SCREENSHOT - WITH RICH EYE-SHATTERING STUNNING MILK-CREAM GORGEOUS DESIGNS
  return (
    <div className="max-w-md mx-auto space-y-5 animate-fade-in relative z-10 select-none pb-12 font-sans text-slate-800">
      
      {/* 1. Header Banner with Stunning Sand/Milk Gold gradient and custom outer glow */}
      <div className="bg-gradient-to-br from-[#E1D4C0] via-[#C5B49F] to-[#AA7C11] rounded-3xl p-[1.5px] shadow-sm">
        <div className="bg-[#FCFAF3] rounded-[22px] py-5 px-4 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-300 via-amber-500 to-amber-200"></div>
          <h3 className="text-[15.5px] text-slate-800 font-black tracking-widest font-display uppercase flex items-center justify-center gap-2">
            <Zap className="w-4 h-4 text-amber-600 fill-amber-600 animate-pulse" /> 
            Smart Draw Fixed System
          </h3>
          <p className="text-[9.5px] text-slate-500 uppercase tracking-widest font-mono mt-0.5 font-bold">
            99% Super Correct Score & Fulltime Draws
          </p>
        </div>
      </div>

      {/* EXTRAORDINARY ANIMATED VIP ASSISTANT AMINA CONVERSION SECTION */}
      <div className="bg-[#FCFAF3] border border-[#E7E0D2] rounded-3xl p-4.5 shadow-sm relative overflow-hidden flex items-start gap-4">
        {/* Left: Beautifully animated Lady Portrait */}
        <div className="relative shrink-0 mt-1">
          <div className="absolute -inset-1.5 bg-gradient-to-tr from-amber-400 to-[#AA7C11] rounded-full blur opacity-30 animate-pulse"></div>
          <div className="relative w-12 h-12 rounded-full bg-[#FAF6EE] flex items-center justify-center text-3xl border-2 border-[#D4AF37] shadow-sm transform hover:scale-105 duration-300">
            👩‍💼
          </div>
          {/* Animated finger icon inside left circle */}
          <div className="absolute -bottom-1 -right-1 text-base animate-bounce bg-white rounded-full p-0.5 shadow-md border border-[#E7E0D2]">
            👉
          </div>
          <span className="absolute top-0 right-0 h-3.5 w-3.5 rounded-full bg-emerald-500 border-2 border-white"></span>
        </div>

        {/* Right: Dialogue bubble */}
        <div className="space-y-1.5 flex-1">
          <div className="flex items-center gap-1.5 justify-between">
            <span className="text-[10px] font-black text-amber-800 uppercase tracking-widest font-mono">VIP SUPPORT (AMINA)</span>
            <span className="text-[8px] bg-emerald-100/70 text-emerald-800 border border-emerald-300 font-mono px-2 py-0.5 rounded uppercase font-bold animate-pulse">Online</span>
          </div>
          <p className="text-[11.5px] text-slate-755 leading-relaxed font-semibold">
            "Hello! Welcome to our verified Fixed Draws platform. Please click the left button below to read the system details or the right button to view our past winning records! 🤝 👇"
          </p>
          <div className="flex items-center gap-1 text-amber-600 font-mono text-[9px] pt-1 font-bold">
            <span className="text-base animate-bounce inline-block">👇</span>
            <span className="text-amber-800">TAP THE GESTURE BUTTONS BELOW TO EXPAND:</span>
          </div>
        </div>
      </div>

      {/* STUNNING INTERACTIVE ACTION ROW - DESCRIPTION & VIEW HISTORY */}
      <div className="grid grid-cols-2 gap-3.5">
        <button
          onClick={() => setShowDescriptionModal(true)}
          className="relative group overflow-hidden bg-[#FCFAF3] border-2 border-amber-600/60 hover:border-amber-600 px-3 py-4 rounded-3xl shadow-sm transition-all duration-300 active:scale-95 text-center cursor-pointer"
        >
          <div className="absolute top-0 right-0 w-16 h-16 bg-amber-400/5 rounded-full blur-xl group-hover:bg-amber-400/10 transition"></div>
          <div className="flex flex-col items-center gap-1.5">
            <div className="p-2 rounded-2xl bg-amber-50 text-amber-700 border border-amber-200 group-hover:scale-110 transition duration-300 shadow-inner">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="text-[12px] font-black tracking-wider uppercase text-amber-950 font-display flex items-center gap-1">
              GUIDE <span className="text-[11px] animate-bounce">👇</span>
            </span>
            <span className="text-[8.5px] font-mono text-slate-450 uppercase font-black">SYSTEM GUIDE</span>
          </div>
        </button>

        <button
          onClick={() => setShowHistoryModal(true)}
          className="relative group overflow-hidden bg-[#FCFAF3] border-2 border-amber-600/60 hover:border-amber-600 px-3 py-4 rounded-3xl shadow-sm transition-all duration-300 active:scale-95 text-center cursor-pointer"
        >
          <div className="absolute top-0 right-0 w-16 h-16 bg-amber-400/5 rounded-full blur-xl group-hover:bg-amber-400/10 transition"></div>
          <div className="flex flex-col items-center gap-1.5">
            <div className="p-2 rounded-2xl bg-amber-50 text-amber-700 border border-amber-200 group-hover:scale-110 transition duration-300 shadow-inner">
              <History className="w-5 h-5" />
            </div>
            <span className="text-[12px] font-black tracking-wider uppercase text-amber-950 font-display flex items-center gap-1">
              HISTORY <span className="text-[11px] animate-bounce">👇</span>
            </span>
            <span className="text-[8.5px] font-mono text-slate-450 uppercase font-black">MATCH RESULTS</span>
          </div>
        </button>
      </div>

      {/* 2. Flag country selection badge layout with dynamic vivid styling */}
      <div className="bg-[#FCFAF3] border border-[#E7E0D2] px-4 py-4 rounded-3xl shadow-sm">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-700" />
            <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest font-mono">CLICK YOUR COUNTRY TO ACTIVATE DISCOUNT:</span>
          </div>
          <div className="flex gap-1.5 overflow-x-auto scrollbar-none py-1">
            {PRICING_LIST.map((country) => (
              <button
                key={country.id}
                onClick={() => setSelectedCountryId(country.id)}
                className={`px-3.5 py-2.5 rounded-2xl text-xs font-mono transition-all duration-300 cursor-pointer flex items-center gap-1.5 shrink-0 active:scale-95 ${
                  selectedCountryId === country.id
                    ? 'bg-gradient-to-r from-amber-600 to-[#AA7C11] text-white font-black shadow-md border-t border-amber-300'
                    : 'bg-white border border-[#E7E0D2] text-slate-500 hover:text-slate-800'
                }`}
              >
                <span className="text-sm leading-none">{country.flag}</span>
                <span className="text-[10px] font-black uppercase tracking-wider">{country.id}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Daily Games & Target Odds highlight with striking dual-tone headers */}
      <div className="grid grid-cols-2 gap-3.5">
        <div className="bg-[#FCFAF3] border border-[#E7E0D2] rounded-3xl py-5 px-3.5 text-center relative overflow-hidden shadow-sm group transition duration-300">
          <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-amber-400 to-amber-600"></div>
          <span className="text-[10px] text-amber-800 font-black uppercase tracking-widest block font-mono">📋 DAILY TIPS</span>
          <span className="text-[18px] font-black text-slate-800 font-display mt-1 block">3 Games Only</span>
        </div>

        <div className="bg-[#FCFAF3] border border-[#E7E0D2] rounded-3xl py-5 px-3.5 text-center relative overflow-hidden shadow-sm group transition duration-300">
          <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-amber-600 to-[#AA7C11]"></div>
          <span className="text-[10px] text-amber-800 font-black uppercase tracking-widest block font-mono">📈 TARGET ODDS</span>
          <span className="text-[18px] font-black text-emerald-700 font-display font-mono mt-1 block">10+ ODDS</span>
        </div>
      </div>

      {/* 4. Accuracy banner with high contrast elegant aesthetic */}
      <div className="bg-gradient-to-r from-amber-50 via-amber-100/50 to-amber-50 border border-[#E1D4C0] rounded-3xl py-4.5 text-center relative overflow-hidden shadow-sm">
        <span className="text-[9px] text-amber-800 font-mono uppercase font-black tracking-widest block">👑 FOREVER WIN PROTOCOL</span>
        <span className="text-[15px] font-black text-slate-805 font-display tracking-widest uppercase mt-0.5 block">
          ★ 99% PRO SOURCE FIXED ★
        </span>
      </div>

      {/* 5. System Info Card with elegant cream highlights */}
      <div className="bg-[#FCFAF3] border border-[#E7E0D2] rounded-3xl p-5 shadow-sm space-y-4">
        <h4 className="text-[11px] font-black text-slate-800 uppercase tracking-widest border-b border-[#E7E0D2] pb-2.5 flex items-center justify-between">
          <span className="flex items-center gap-1.5"><BadgeInfo className="w-4.5 h-4.5 text-amber-700" /> SYSTEM ARCHITECTURE:</span>
          <span className="text-[8px] px-2 py-0.5 bg-amber-100 text-amber-800 rounded-lg border border-amber-200 font-mono font-bold uppercase">PRO ENG</span>
        </h4>
        
        <div className="space-y-3.5 text-xs font-mono">
          <div className="flex items-center justify-between text-slate-650">
            <span className="text-slate-500 font-semibold">Prediction Strategy</span>
            <span className="text-slate-800 font-extrabold">Full-Time Draws (X)</span>
          </div>
          <div className="flex items-center justify-between border-t border-[#E7E0D2] pt-3 text-slate-650">
            <span className="text-slate-500 font-semibold">Success Probability</span>
            <span className="text-emerald-750 font-extrabold uppercase tracking-wide">Daily Wins Guaranteed</span>
          </div>
          <div className="flex items-center justify-between border-t border-[#E7E0D2] pt-3 text-slate-650">
            <span className="text-slate-500 font-semibold">Membership Access Duration</span>
            <span className="text-amber-805 font-extrabold">60 Days (2 Full Months)</span>
          </div>
        </div>
      </div>

      {/* 6. Elegant VIP Pricing Tier */}
      <div className="bg-[#FCFAF3] border border-[#E7E0D2] rounded-3xl p-5 relative overflow-hidden shadow-sm">
        <div className="absolute top-0 bottom-0 left-0 w-[4.5px] bg-gradient-to-b from-amber-400 to-[#AA7C11]"></div>

        <div className="space-y-2.5 text-xs">
          {PRICING_LIST.map((country) => {
            const isSelected = selectedCountryId === country.id;
            return (
              <div
                key={country.id}
                onClick={() => setSelectedCountryId(country.id)}
                className={`flex items-center justify-between py-2.5 px-3.5 rounded-2xl transition-all duration-300 cursor-pointer ${
                  isSelected 
                    ? 'bg-amber-100/50 border border-[#CBD5E1] text-slate-800 shadow-sm' 
                    : 'text-slate-550 hover:bg-[#FAF6EE] border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base leading-none">{country.flag}</span>
                  <span className={`text-[12px] ${isSelected ? 'font-black text-amber-900' : 'font-semibold text-slate-600'}`}>
                    {country.country}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`font-black font-mono text-xs tracking-wide ${isSelected ? 'text-emerald-750 font-extrabold' : 'text-slate-700'}`}>
                    {country.priceFormatted}
                  </span>
                  {isSelected && (
                    <span className="text-[8px] bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-mono font-black px-2 py-0.5 rounded-lg shadow-sm uppercase">
                      OFFER
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 7. Beautiful action buttons with ultra premium style */}
      <div className="gap-4 space-y-4 pt-1.5">
        
        {/* VIEW MATCH RESULTS HISTORY with gold gradient */}
        <button
          onClick={() => setShowHistoryModal(true)}
          className="w-full bg-gradient-to-r from-[#AA7C11] via-[#D4AF37] to-[#8C6208] hover:brightness-105 text-white font-black py-4.5 rounded-2xl text-[11px] uppercase tracking-widest font-mono transition-all duration-300 cursor-pointer flex items-center justify-center gap-2.5 active:scale-97 shadow-sm border-none"
        >
          <History className="w-4.5 h-4.5" /> 
          <span>VIEW MATCH RESULTS HISTORY</span>
        </button>

        {/* Secret Activation Key input drawer */}
        <button
          onClick={() => setShowActivationModal(true)}
          className="w-full text-slate-500 hover:text-amber-800 text-[10px] font-mono tracking-widest uppercase transition py-1 text-center cursor-pointer flex items-center justify-center gap-1.5 font-bold"
        >
          🔑 DO YOU HAVE A VALID ACTIVATION KEY? <span className="underline text-amber-700 font-extrabold hover:text-amber-900">VERIFY KEY HERE</span>
        </button>

        {/* High Conversion Vibrant Green WhatsApp CTA container with massive glow */}
        <div className="relative group p-[1px] rounded-[24px]">
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-[24px] blur opacity-25 group-hover:opacity-45 transition duration-500 animate-pulse"></div>
          
          <button
            onClick={handleContactWhatsApp}
            className="w-full relative bg-[#10b981] hover:bg-[#059669] text-white font-black py-5 px-6 rounded-[22px] text-[13.5px] uppercase tracking-widest transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-3 shadow-md cursor-pointer border border-emerald-300/30"
          >
            <MessageSquare className="w-5.5 h-5.5 fill-current shrink-0 text-white" /> 
            <span>GET FULL VIP ACCESS NOW</span>
          </button>
        </div>
      </div>

      {/* ========================================================== */}
      {/* MODAL 1: PREVIOUS MATCH RESULTS HISTORY */}
      {showHistoryModal && (
        <div id="history-results-dialog" className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto text-black">
          <div className="bg-[#f7d3b2] border-2 border-[#8a6442] rounded-3xl w-full max-w-sm p-3 relative shadow-2xl flex flex-col max-h-[92vh] font-sans">
            
            {/* Embedded styles exactly as provided by user */}
            <style dangerouslySetInnerHTML={{ __html: `
              @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800;900&display=swap');
              
              .draw-history-modal {
                font-family: 'Poppins', sans-serif;
                background: #f7d3b2;
                color: #000000;
              }

              /* BANNER LINK (WhatsApp) */
              .owner-link-custom { text-decoration:none; display:block; margin:0 4px 12px; }
              .owner-banner-custom {
                background:#d64c00; color:#ffffff; text-align:center; padding:12px 10px;
                font-size:13px; letter-spacing:1px; border-radius:6px; position:relative;
                overflow:hidden; font-weight:700; border:2px solid #8a6442; cursor:pointer;
              }
              .owner-banner-custom::before {
                content:''; position:absolute; top:0; left:-100%; width:50%; height:100%;
                background:linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent);
                animation:shimmer-custom 2.5s infinite;
              }
              @keyframes shimmer-custom { 0%{left:-100%} 100%{left:200%} }

              /* SECTION */
              .section-custom {
                margin:0 4px 12px; border-radius:8px; overflow:hidden;
                border:2.5px solid #8a6442; background:#fcf0e3;
                box-shadow:0 5px 15px rgba(0,0,0,0.15);
              }

              /* DATE HEADER */
              .sec-hdr-custom {
                background:#e0bd9b; display:flex; align-items:center; justify-content:center;
                padding:9px 12px; gap:8px; border-bottom:2px solid #8a6442;
              }
              .hdr-line-custom { flex:1; height:2px; background:#d64c00; }
              .hdr-date-custom { font-size:14px; letter-spacing:1px; color:#000000; font-weight:800; }
              .hdr-icon-custom { font-size:12px; }

              /* TABLE STRUCTURE */
              .table-custom { width:100%; border-collapse:collapse; table-layout:fixed; }
              .table-custom thead tr { background:#e0bd9b; border-bottom:2.5px solid #8a6442; }
              .table-custom thead th { color:#000000; font-size:13px; padding:10px 6px; font-weight:800; }

              .table-custom thead th:nth-child(1) { width:38%; text-align:left; padding-left:10px; }
              .table-custom thead th:nth-child(2) { width:22%; text-align:center; }
              .table-custom thead th:nth-child(3) { width:22%; text-align:center; }
              .table-custom thead th:nth-child(4) { width:18%; text-align:center; padding-right:10px; }

              .table-custom tbody tr { border-bottom:1.5px solid #8a6442; background:#fff9f2; }
              .table-custom tbody tr:last-child { border-bottom:none; }

              .table-custom tbody tr.won-row-custom { border-left:5px solid #059669; }
              .table-custom tbody tr.lost-row-custom { border-left:5px solid #dc2626; }
              .table-custom tbody tr.pend-row-custom { border-left:5px solid #d97706; }

              .table-custom tbody td { padding:11px 4px; color:#000000; font-size:13px; font-weight:700; }
              .table-custom tbody td:nth-child(1) { padding-left:10px; }
              .table-custom tbody td:nth-child(4) { padding-right:10px; }

              .match-name-custom { font-size:13px; font-weight:700; line-height:1.2; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; color:#000000; }
              .match-name-custom .vs-custom { color:#d64c00; font-size:11px; font-weight:800; margin:0 3px; }

              .tip-custom { display:block; color:#000000; font-size:13px; font-weight:700; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; text-align:center; }
              .odds-custom { font-size:13px; color:#000000; font-weight:700; display:block; text-align:center; }

              .badge-custom { display:inline-flex; align-items:center; justify-content:center; width:100%; padding:4px 0; border-radius:4px; font-size:11px; font-weight:800; white-space:nowrap; }
              .badge-custom.won { background:#059669; color:#ffffff; border:1px solid #059669; }
              .badge-custom.lost { background:#dc2626; color:#ffffff; border:1px solid #dc2626; }
              .badge-custom.pend { background:#d97706; color:#000000; border:1px solid #d97706; }

              /* TOTAL ODDS */
              .total-custom { background:#e0bd9b; display:flex; justify-content:space-between; align-items:center; padding:10px 12px; border-top:2.5px solid #8a6442; }
              .total-lbl-custom { font-size:13px; color:#000000; font-weight:700; }
              .total-val-custom { font-size:15px; color:#000000; font-weight:800; }
            ` }} />
            
            {/* Close Button Header */}
            <div className="flex items-center justify-between border-b-2 border-[#8a6442] pb-2 mb-3 px-1 draw-history-modal">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#d64c00]">
                📅 Tipova Betting Tips
              </span>
              <button 
                onClick={() => setShowHistoryModal(false)}
                className="bg-[#d64c00] text-white hover:bg-red-800 transition px-2.5 py-1 rounded font-black font-mono text-[10px] cursor-pointer border-2 border-[#8a6442]"
              >
                ✕ CLOSE
              </button>
            </div>

            {/* Scrollable history canvas */}
            <div className="overflow-y-auto pr-1 flex-grow scrollbar-thin draw-history-modal">
              
              <a href="https://wa.me/255794802155" target="_blank" rel="noreferrer" className="owner-link-custom">
                <div className="owner-banner-custom">📲 CLICK HERE — MESSAGE OWNER +255794802155</div>
              </a>

              {historyDays.map((day, dIdx) => (
                <div key={dIdx} className="section-custom">
                  <div className="sec-hdr-custom">
                    <div className="hdr-line-custom"></div>
                    <span className="hdr-icon-custom">📅</span>
                    <span className="hdr-date-custom">{day.date}</span>
                    <div className="hdr-line-custom"></div>
                  </div>
                  <table className="table-custom">
                    <thead>
                      <tr>
                        <th>MATCH</th>
                        <th>TIP</th>
                        <th>ODDS</th>
                        <th>STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {day.matches.map((m, mIdx) => {
                        let rowClass = "won-row-custom";
                        let statusBadgeClass = "badge-custom won";
                        if (m.status === "PENDING") {
                          rowClass = "pend-row-custom";
                          statusBadgeClass = "badge-custom pend";
                        } else if (m.status === "LOST") {
                          rowClass = "lost-row-custom";
                          statusBadgeClass = "badge-custom lost";
                        }

                        return (
                          <tr key={mIdx} className={rowClass}>
                            <td className="history-td history-td-col1">
                              <div className="match-name-custom">
                                {m.homeTeam}
                                <span className="vs-custom">VS</span>
                                {m.awayTeam}
                              </div>
                            </td>
                            <td className="history-td">
                              <span className="tip-custom">{m.tip}</span>
                            </td>
                            <td className="history-td">
                              <span className="odds-custom">{m.odds}</span>
                            </td>
                            <td className="history-td history-td-col4">
                              <span className={statusBadgeClass}>{m.status}</span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <div className="total-custom">
                    <span className="total-lbl-custom">TOTAL ODDS:</span>
                    <span className="total-val-custom">{day.totalOdds}</span>
                  </div>
                </div>
              ))}

            </div>

            {/* Bottom Standard Dismiss Button */}
            <div className="pt-2">
              <button
                onClick={() => setShowHistoryModal(false)}
                className="w-full bg-[#d64c00] hover:bg-neutral-900 text-white font-extrabold py-3 rounded-xl text-xs transition duration-200 cursor-pointer border-2 border-[#8a6442] shadow-md uppercase tracking-wide font-mono"
              >
                ✕ RUDI NYUMA (CLOSE)
              </button>
            </div>

          </div>
        </div>
      )}

      {/* MODAL 2: INTERACTIVE ACTIVATION KEY DRAWER */}
      {showActivationModal && (
        <div id="activation-key-dialog" className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#FCFAF3] border-2 border-[#CBD5E1] rounded-3xl w-full max-w-sm p-6 space-y-4 animate-scale-up relative">
            
            <div className="flex items-center justify-between pb-3.5 border-b border-[#E7E0D2]">
              <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest font-mono flex items-center gap-1.5">
                <KeyRound className="w-4 h-4 text-amber-700" /> Enter VIP Activation Key
              </h3>
              <button 
                onClick={() => {
                  setShowActivationModal(false);
                  setErrorMessage("");
                }}
                className="text-slate-400 hover:text-slate-800 font-mono text-sm cursor-pointer p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-slate-800">
              <div className="space-y-1">
                <label className="text-[9px] uppercase font-mono tracking-wider text-slate-505 block font-bold text-slate-500">Your Current Country</label>
                <select
                  value={selectedCountryId}
                  onChange={(e) => setSelectedCountryId(e.target.value)}
                  className="w-full bg-white border border-[#CBD5E1] rounded-xl px-3 py-2 text-slate-700 text-xs font-mono focus:outline-none focus:border-amber-600 shadow-sm"
                >
                  {PRICING_LIST.map(p => (
                    <option key={p.id} value={p.id}>{p.flag} {p.country} ({p.currency})</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] uppercase font-mono tracking-wider text-slate-505 block font-bold text-slate-500 font-bold">WhatsApp Phone number (for Verification)</label>
                <input
                  type="tel"
                  value={phoneInput}
                  onChange={(e) => setPhoneInput(e.target.value)}
                  placeholder="Example: 255794802155"
                  className="w-full bg-white border border-[#CBD5E1] rounded-xl px-3.5 py-2.5 text-slate-800 placeholder-slate-400 font-mono text-xs focus:outline-none focus:border-amber-600 shadow-sm"
                />
              </div>

              {/* Secure Client ID Container */}
              <div className="bg-white border border-[#E7E0D2] rounded-2xl p-3.5 text-center font-mono space-y-1 relative group">
                <span className="text-[9px] text-amber-800 uppercase block font-black tracking-widest">DEVICE CODE (CLIENT ID)</span>
                <span className="text-[11px] font-black text-slate-800 break-all select-all tracking-wider block bg-slate-50 py-1.5 px-2 rounded-xl">{activeClientCode}</span>
                <button
                  onClick={handleCopyClientId}
                  className="pt-1.5 text-[9px] text-slate-500 hover:text-amber-800 underline flex items-center justify-center gap-1 mx-auto transition"
                >
                  {copiedClientId ? <span className="text-emerald-700 font-bold">Copied successfully!</span> : "Copy Device Code to Clipboard"}
                </button>
              </div>

              <form onSubmit={handleVerifyKey} className="space-y-4 pt-1">
                <div className="space-y-2">
                  <label className="text-[9px] uppercase font-mono tracking-wider text-slate-500 block text-center font-bold">Enter the system Activation Key:</label>
                  <input
                    type="text"
                    required
                    value={licenseKeyInput}
                    onChange={(e) => setLicenseKeyInput(e.target.value)}
                    placeholder="KEY-XXXX-XXXX-XXXX"
                    className="w-full bg-white border-2 border-[#CBD5E1] rounded-2xl px-3 py-3 text-center text-amber-800 font-mono tracking-widest text-[13px] uppercase font-black focus:outline-none focus:border-amber-600 shadow-sm"
                  />
                </div>

                {errorMessage && (
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-[10px] flex items-start gap-1.5 leading-relaxed font-semibold">
                    <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3 pt-1 font-mono">
                  <button
                    type="button"
                    onClick={() => {
                      setShowActivationModal(false);
                      setErrorMessage("");
                    }}
                    className="w-full py-2.5 bg-white hover:bg-slate-50 text-slate-500 hover:text-slate-800 border border-[#CBD5E1] rounded-xl text-xs transition cursor-pointer shadow-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={checking}
                    className="w-full py-2.5 bg-gradient-to-r from-amber-600 to-[#AA7C11] hover:brightness-105 text-white font-black rounded-xl text-xs flex items-center justify-center gap-1 cursor-pointer disabled:opacity-50 transition border-none shadow-sm"
                  >
                    {checking ? "Verifying..." : "Verify Key"}
                  </button>
                </div>
              </form>

              <div className="text-[9px] text-slate-500 text-center leading-relaxed font-semibold">
                If you do not have a VIP key yet, click <span className="text-amber-800 font-extrabold">"GET FULL VIP ACCESS NOW"</span> to chat directly with our VIP Admin on WhatsApp.
              </div>
            </div>

          </div>
        </div>
      )}
      
      {/* MODAL 3: EXPLAINER DESCRIPTION MODAL */}
      {showDescriptionModal && (
        <div id="description-explainer-dialog" className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#FCFAF3] border-2 border-[#CBD5E1] rounded-3xl w-full max-w-sm p-6 space-y-4 animate-scale-up relative text-slate-800">
            
            <div className="flex items-center justify-between border-b border-[#E7E0D2] pb-3">
              <span className="text-[11px] font-black text-slate-800 font-mono tracking-wider flex items-center gap-1.5 animate-pulse">
                <BookOpen className="w-4 h-4 text-amber-700" /> FULL SYSTEM GUIDE
              </span>
              <button 
                onClick={() => setShowDescriptionModal(false)}
                className="text-slate-450 hover:text-slate-800 font-bold font-mono text-sm cursor-pointer p-1"
              >
                ✕
              </button>
            </div>

            <div className="max-h-[320px] overflow-y-auto space-y-4 pr-1 scrollbar-thin text-xs text-slate-750">
              <div className="space-y-4">
                
                <div className="p-3.5 bg-amber-50 border border-[#E1D4C0] rounded-2xl space-y-1 font-sans">
                  <h4 className="font-black text-amber-900 text-[10.5px] font-display uppercase tracking-wider flex items-center gap-1">
                    ★ HOW IT WORKS ★
                  </h4>
                  <p className="text-[11px] leading-relaxed text-slate-700 font-semibold text-justify">
                    Our verified <strong>Smart Draw Fixed System</strong> publishes 3 daily football occurrences sourced from reliable first-tier draw specialists for maximum prediction precision.
                  </p>
                </div>

                <div className="space-y-2 font-sans">
                  <h4 className="font-black text-amber-805 uppercase text-[9.5px] tracking-widest font-mono">VIP MEMBER PRIVILEGES:</h4>
                  <ul className="space-y-2.5 text-[11px] pl-1 font-semibold text-slate-700">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 mt-0.5 text-xs shrink-0">✔</span>
                      <span><strong>99% Mathematical Accuracy:</strong> Draws are selected with verified statistics to maintain a massive profit curve.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 mt-0.5 text-xs shrink-0">✔</span>
                      <span><strong>60 Days Duration:</strong> Your personal license is valid for 2 complete months, giving you absolute freedom.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 mt-0.5 text-xs shrink-0">✔</span>
                      <span><strong>Instant WhatsApp Support:</strong> Connect with official administrators seamlessly for verification.</span>
                    </li>
                  </ul>
                </div>

                <div className="p-3 bg-[#FAF6EE] border border-[#CBD5E1] rounded-2xl text-center">
                  <span className="text-[9px] text-amber-800 block font-mono font-black border-b border-[#E7E0D2] pb-1 uppercase">SECURE DELIVERY</span>
                  <span className="text-[10px] text-slate-500 block mt-1 leading-relaxed font-semibold">Your activation key is linked cryptographically to your device identifier within 3 minutes of request.</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowDescriptionModal(false)}
              className="w-full bg-gradient-to-r from-amber-600 to-[#AA7C11] hover:brightness-105 text-white font-black py-3 rounded-2xl text-xs transition cursor-pointer active:scale-97 border-none shadow-sm"
            >
              UNDERSTOOD (CLOSE GUIDE)
            </button>

          </div>
        </div>
      )}

    </div>
  );
};
