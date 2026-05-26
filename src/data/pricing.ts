import { CountryPricing } from '../types';

export const ADMIN_WHATSAPP = "255794802155";
export const ADMIN_WHATSAPP_DISPLAY = "+255 794 802 155";

export const PRICING_LIST: CountryPricing[] = [
  {
    id: "TZ",
    country: "Tanzania",
    currency: "TSh",
    price: 40000,
    priceFormatted: "Tsh 40,000",
    flag: "🇹🇿",
    whatsappMessage: "Habari Admin, niko Tanzania 🇹🇿 naomba kujiunga na Fixed Draws FT (Odds 10+). Malipo ya Tsh 40,000 ya miezi miwili yako tayari. Tafadhali nitumie Msimbo wa Ufunguo kwa ajili ya Msimbo huu wa Kifaa changu: "
  },
  {
    id: "KE",
    country: "Kenya",
    currency: "KSh",
    price: 2700,
    priceFormatted: "KSh 2,700",
    flag: "🇰🇪",
    whatsappMessage: "Habari Kaka, niko Kenya 🇰🇪 naomba kupata access ya Fixed Draws FT. Malipo ya KSh 2,700 ya miezi miwili yako tayari. Nifahamishe msimbo wa ufunguo kwa ajili ya Msimbo wangu huu mkuu: "
  },
  {
    id: "NG",
    country: "Nigeria",
    currency: "Naira",
    price: 30000,
    priceFormatted: "₦ 30,000 Naira",
    flag: "🇳🇬",
    whatsappMessage: "Hello Admin, I am from Nigeria 🇳🇬. I want to purchase the Fixed Draws FT tier for 30,000 Naira (2 months). Payment is ready, please generate my secure key for Client Code: "
  },
  {
    id: "UG",
    country: "Uganda",
    currency: "UGX",
    price: 65000,
    priceFormatted: "UGX 65,000",
    flag: "🇺🇬",
    whatsappMessage: "Habari Kaka, niko Uganda 🇺🇬. Naomba nijiunge na Fixed Draws FT kwa UGX 65,000 (miezi miwili). Malipo yako tayari, tafadhali nitengenezee ufunguo kwa ajili ya Msimbo wangu huu: "
  },
  {
    id: "GH",
    country: "CED (Ghana GHS)",
    currency: "GHS",
    price: 300,
    priceFormatted: "300 GHS (CED)",
    flag: "🇬🇭",
    whatsappMessage: "Hello Admin, I am from Ghana 🇬🇭. I want to buy the Fixed Draws FT access for 300 GHS (2 months). Here is my Device Client Code for key generation: "
  },
  {
    id: "OTHER",
    country: "Nchi Nyingine / Other Countries",
    currency: "USD",
    price: 45,
    priceFormatted: "45 USD ($)",
    flag: "🌍",
    whatsappMessage: "Hello Admin, I am from overseas 🌍. I want to request Fixed Draws FT access via payment of 45 USD ($) for 2 months. Here is my secure Client Code: "
  }
];
