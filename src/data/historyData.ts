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
    date: "26-05-2026",
    totalOdds: "21.90",
    matches: [
      { homeTeam: "FAR Rabat", awayTeam: "Mamelodi", tip: "Draw FT", odds: "3.20", status: "WON" },
      { homeTeam: "Agropecuario", awayTeam: "Quilmes", tip: "Draw FT", odds: "2.90", status: "WON" },
      { homeTeam: "Gimnasia y tiro", awayTeam: "Jujuy", tip: "Draw FT", odds: "3.00", status: "WON" },
    ]
  },

  {
    date: "25-05-2026",
    totalOdds: "27.90",
    matches: [
      { homeTeam: "Enppi", awayTeam: "Wadi Degla", tip: "Draw FT", odds: "3.00", status: "WON" },
      { homeTeam: "Welwalo", awayTeam: "Makelle 70", tip: "Draw FT", odds: "3.00", status: "WON" },
      { homeTeam: "Derry City", awayTeam: "Shelbourne", tip: "Draw FT", odds: "3.10", status: "WON" },
    ]
  },

  {
    date: "24-05-2026",
    totalOdds: "24.96",
    matches: [
      { homeTeam: "Fiorentina", awayTeam: "Roma", tip: "Draw FT", odds: "3.10", status: "WON" },
      { homeTeam: "Tombense", awayTeam: "Botafogo SP", tip: "Draw FT", odds: "3.20", status: "WON" },
      { homeTeam: "Tigre", awayTeam: "San Lorenzo", tip: "Draw FT", odds: "2.90", status: "WON" },
    ]
  },

  {
    date: "23-05-2026",
    totalOdds: "21.00",
    matches: [
      { homeTeam: "Nueva Chicago", awayTeam: "Temperley", tip: "Draw FT", odds: "2.90", status: "WON" },
      { homeTeam: "Armenio", awayTeam: "Dock Sud", tip: "Draw FT", odds: "2.80", status: "WON" },
      { homeTeam: "Modern Sport", awayTeam: "Ghazl EL Mahallah", tip: "Draw FT", odds: "2.90", status: "WON" },
    ]
  },

  {
    date: "22-05-2026",
    totalOdds: "24.82",
    matches: [
      { homeTeam: "Fiorentina", awayTeam: "Atalanta", tip: "Draw FT", odds: "3.20", status: "WON" },
      { homeTeam: "Arsenal Sarandi", awayTeam: "Villa San Carlos", tip: "Draw FT", odds: "3.20", status: "WON" },
      { homeTeam: "Sudtirol", awayTeam: "Bari", tip: "Draw FT", odds: "3.30", status: "WON" },
    ]
  },

  {
    date: "21-05-2026",
    totalOdds: "19.61",
    matches: [
      { homeTeam: "Barracas", awayTeam: "Union De Santa", tip: "Draw FT", odds: "3.30", status: "WON" },
      { homeTeam: "Wadi Degla", awayTeam: "ZED", tip: "Draw FT", odds: "2.90", status: "WON" },
      { homeTeam: "Adama City", awayTeam: "Welwalo Adigrat", tip: "Draw FT", odds: "2.80", status: "WON" },
    ]
  },

  {
    date: "20-05-2026",
    totalOdds: "20.81",
    matches: [
      { homeTeam: "Ethio Electric", awayTeam: "Dire Dawa", tip: "Draw FT", odds: "2.90", status: "WON" },
      { homeTeam: "Dodoma Jiji", awayTeam: "Mashujaa", tip: "Draw FT", odds: "3.10", status: "WON" },
      { homeTeam: "Kabwe", awayTeam: "Zanaco", tip: "Draw FT", odds: "3.00", status: "WON" },
    ]
  },

  {
    date: "19-05-2026",
    totalOdds: "24.61",
    matches: [
      { homeTeam: "Banfield 2", awayTeam: "Aldosivi 2", tip: "Draw FT", odds: "3.20", status: "WON" },
      { homeTeam: "Constantine", awayTeam: "Khenchela", tip: "Draw FT", odds: "3.20", status: "WON" },
      { homeTeam: "Hadiya Hossana", awayTeam: "Ethiopia Nigd Bank", tip: "Draw FT", odds: "2.80", status: "WON" },
    ]
  },

  {
    date: "18-05-2026",
    totalOdds: "19.63",
    matches: [
      { homeTeam: "Belgrano", awayTeam: "Chaco For Ever", tip: "Draw FT", odds: "3.00", status: "WON" },
      { homeTeam: "Italiano", awayTeam: "Laferrere", tip: "Draw FT", odds: "2.80", status: "WON" },
      { homeTeam: "Arab Contractor", awayTeam: "Wadi Degla", tip: "Draw FT", odds: "2.90", status: "WON" },
    ]
  },

];