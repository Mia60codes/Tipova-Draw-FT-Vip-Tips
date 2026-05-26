export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  league: string;
  tip: string;
  odds: number;
  time: string; // Dynamic simulated matches based on current date
  status: 'pending' | 'won' | 'lost';
  classification: 'free' | 'vip' | 'premium_draw'; // premium_draw holds the Fixed Draws 10+ Odds
}

export interface CountryPricing {
  id: string;
  country: string;
  currency: string;
  price: number;
  priceFormatted: string;
  flag: string;
  whatsappMessage: string;
}

export interface CryptoLog {
  id: string;
  timestamp: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

export interface LicenseStatus {
  isValid: boolean;
  expiryDate?: string;
  daysRemaining?: number;
  clientCode?: string;
  phoneNumber?: string;
  error?: string;
}
