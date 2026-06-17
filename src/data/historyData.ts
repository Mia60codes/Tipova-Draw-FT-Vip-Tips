// HISTORIA YA MATOKEO YA NYUMA (PAST MATCH RESULTS HISTORY)
// ==========================================================

export interface HistoryMatch {
  homeTeam: string;
  awayTeam: string;
  tip: string;
  odds: string;
  status: 'WON' | 'PENDING' | 'LOST';
}

export interface HistoryDay {
  date: string;
  totalOdds: string;
  matches: HistoryMatch[];
}

export const historyDays: HistoryDay[] = [

  {
    date: "17-06-2026",
    totalOdds: "27.00",
    matches: [
      { homeTeam: "Locked 🔐", awayTeam: "Locked 🔐", tip: "Draw FT", odds: "3.05", status: "PENDING" },
      { homeTeam: "Locked 🔐", awayTeam: "Locked 🔐", tip: "Draw FT", odds: "3.05", status: "PENDING" },
      { homeTeam: "Locked 🔐", awayTeam: "Locked 🔐", tip: "Draw FT", odds: "3.00", status: "PENDING" },
    ]
  },

  {
    date: "16-06-2026",
    totalOdds: "19.31",
    matches: [
      { homeTeam: "Ethio Electric", awayTeam: "Makelle 70", tip: "Draw FT", odds: "3.00", status: "WON" },
      { homeTeam: "Sheger Ketema", awayTeam: "Welwalo", tip: "Draw FT", odds: "2.80", status: "WON" },
      { homeTeam: "Shahrdari", awayTeam: "Navad Urmia", tip: "Draw FT", odds: "2.90", status: "WON" },
    ]
  },

  {
    date: "15-06-2026",
    totalOdds: "11.23",
    matches: [
      { homeTeam: "Belgium", awayTeam: "Egypt", tip: "Draw FT", odds: "4.00", status: "WON" },
      { homeTeam: "Atl. Rafaela", awayTeam: "Drp. Riestra", tip: "Draw FT", odds: "3.00", status: "WON" },
    ]
  },

  {
    date: "14-06-2026",
    totalOdds: "21.31",
    matches: [
      { homeTeam: "Netherlands", awayTeam: "Japan", tip: "Draw FT", odds: "3.16", status: "WON" },
      { homeTeam: "Kimberley", awayTeam: "Alvarado", tip: "Draw FT", odds: "2.90", status: "WON" },
      { homeTeam: "Quilmes", awayTeam: "Armenio", tip: "Draw FT", odds: "3.05", status: "WON" },
    ]
  },

];