import { Match } from '../types';

export const getMatches = (currentDateStr: string = "2026-05-23"): Match[] => {
  // Let's parse the current date or use a solid reference
  const baseDate = new Date(currentDateStr);
  
  const formatDate = (daysOffset: number): string => {
    const d = new Date(baseDate);
    d.setDate(baseDate.getDate() + daysOffset);
    return d.toISOString().split('T')[0];
  };

  const yesterdayStr = formatDate(-1);
  const todayStr = formatDate(0);
  const tomorrowStr = formatDate(1);

  return [
    // --- YESTERDAY'S FREE MATCHES (All Won!) ---
    {
      id: "f-y1",
      homeTeam: "Manchester United",
      awayTeam: "Chelsea FC",
      league: "England - Premier League",
      tip: "Over 2.5 Goals",
      odds: 1.65,
      time: `${yesterdayStr} 18:45`,
      status: 'won',
      classification: 'free'
    },
    {
      id: "f-y2",
      homeTeam: "Simba SC",
      awayTeam: "Azam FC",
      league: "Tanzania - Ligi Kuu Bara",
      tip: "Home WIN (1)",
      odds: 1.85,
      time: `${yesterdayStr} 14:00`,
      status: 'won',
      classification: 'free'
    },
    {
      id: "f-y3",
      homeTeam: "Real Madrid",
      awayTeam: "Athletic Bilbao",
      league: "Spain - La Liga",
      tip: "Draw or Away (X2)",
      odds: 1.95,
      time: `${yesterdayStr} 20:00`,
      status: 'won',
      classification: 'free'
    },

    // --- YESTERDAY'S LOCKED FT DRAWS (Unlocking history shows these as WON) ---
    {
      id: "p-y1",
      homeTeam: "Genoa CFC",
      awayTeam: "Torino FC",
      league: "Italy - Serie A",
      tip: "Full Time DRAW (X)",
      odds: 3.15,
      time: `${yesterdayStr} 19:00`,
      status: 'won',
      classification: 'premium_draw'
    },
    {
      id: "p-y2",
      homeTeam: "RC Lens",
      awayTeam: "Montpellier HSC",
      league: "France - Ligue 1",
      tip: "Full Time DRAW (X)",
      odds: 3.40,
      time: `${yesterdayStr} 20:00`,
      status: 'won',
      classification: 'premium_draw'
    },

    // --- TODAY'S FREE MATCHES (Pending / Live) ---
    {
      id: "f-t1",
      homeTeam: "Yanga SC",
      awayTeam: "Singida Fountain Gate",
      league: "Tanzania - Ligi Kuu Bara",
      tip: "Home WIN (1)",
      odds: 1.45,
      time: `${todayStr} 16:00`,
      status: 'pending',
      classification: 'free'
    },
    {
      id: "f-t2",
      homeTeam: "Gor Mahia",
      awayTeam: "Tusker FC",
      league: "Kenya - Premier League",
      tip: "Under 2.5 Goals",
      odds: 1.55,
      time: `${todayStr} 15:00`,
      status: 'pending',
      classification: 'free'
    },
    {
      id: "f-t3",
      homeTeam: "Arsenal FC",
      awayTeam: "Aston Villa",
      league: "England - Premier League",
      tip: "Home WIN & BTS",
      odds: 2.75,
      time: `${todayStr} 17:30`,
      status: 'pending',
      classification: 'free'
    },
    {
      id: "f-t4",
      homeTeam: "Enyimba FC",
      awayTeam: "Kano Pillars",
      league: "Nigeria - NPFL",
      tip: "Home WIN (1)",
      odds: 1.60,
      time: `${todayStr} 16:00`,
      status: 'pending',
      classification: 'free'
    },

    // --- TODAY'S EXTREMELY HIGH ODDS PREMIUM DR00S (Odds 10+) ---
    {
      id: "p-t1",
      homeTeam: "Real Valladolid",
      awayTeam: "Getafe CF",
      league: "Spain - La Liga",
      tip: "Full Time DRAW (X)",
      odds: 3.10,
      time: `${todayStr} 18:00`,
      status: 'pending',
      classification: 'premium_draw'
    },
    {
      id: "p-t2",
      homeTeam: "FC Augsburg",
      awayTeam: "Werder Bremen",
      league: "Germany - Bundesliga",
      tip: "Full Time DRAW (X)",
      odds: 3.45,
      time: `${todayStr} 15:30`,
      status: 'pending',
      classification: 'premium_draw'
    },
    {
      id: "p-t3",
      homeTeam: "Bristol City",
      awayTeam: "Preston North End",
      league: "England - Championship",
      tip: "Full Time DRAW (X)",
      odds: 3.20,
      time: `${todayStr} 16:00`,
      status: 'pending',
      classification: 'premium_draw'
    },

    // --- TOMORROW'S PREVIEW FREE ---
    {
      id: "f-tm1",
      homeTeam: "Barcelona FC",
      awayTeam: "Real Sociedad",
      league: "Spain - La Liga",
      tip: "Home WIN (1)",
      odds: 1.62,
      time: `${tomorrowStr} 21:00`,
      status: 'pending',
      classification: 'free'
    },
    {
      id: "f-tm2",
      homeTeam: "Kampala City Council",
      awayTeam: "Vipers SC",
      league: "Uganda - Premier League",
      tip: "Double Chance (1X)",
      odds: 1.48,
      time: `${tomorrowStr} 16:00`,
      status: 'pending',
      classification: 'free'
    }
  ];
};
