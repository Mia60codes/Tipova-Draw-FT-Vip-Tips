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
    date: "05-06-2026",
    totalOdds: "23.61",
    matches: [
      { homeTeam: "Kabylie", awayTeam: "Belouizdad", tip: "Draw FT", odds: "3.20", status: "WON" },
      { homeTeam: "Mostaganem", awayTeam: "El Bayadh", tip: "Draw FT", odds: "2.95", status: "WON" },
      { homeTeam: "Angola", awayTeam: "Mauritania", tip: "Draw FT", odds: "3.10", status: "WON" },
    ]
  },

  {
    date: "04-06-2026",
    totalOdds: "21.00",
    matches: [
      { homeTeam: "Goree", awayTeam: "Mbour", tip: "Draw FT", odds: "2.80", status: "WON" },
      { homeTeam: "Welayta Dicha", awayTeam: "Negele Arsi", tip: "Draw FT", odds: "2.90", status: "WON" },
      { homeTeam: "Paraguari", awayTeam: "Tembetary", tip: "Draw FT", odds: "3.00", status: "WON" },
    ]
  },

  {
    date: "03-06-2026",
    totalOdds: "8.85",
    matches: [
      { homeTeam: "Atletico FC", awayTeam: "Nueva", tip: "Draw FT", odds: "2.80", status: "WON" },
      { homeTeam: "Brescia", awayTeam: "Ascoli", tip: "Draw FT", odds: "2.90", status: "WON" },
    ]
  },

  {
    date: "02-06-2026",
    totalOdds: "9.01",
    matches: [
      { homeTeam: "Belouizdad", awayTeam: "USM Alger", tip: "Draw FT", odds: "3.00", status: "WON" },
      { homeTeam: "Eslamshahr", awayTeam: "Shahrdari", tip: "Draw FT", odds: "2.70", status: "WON" },
    ]
  },

  {
    date: "01-06-2026",
    totalOdds: "11.29",
    matches: [
      { homeTeam: "Ponte Preta", awayTeam: "Botafogo SP", tip: "Draw FT", odds: "3.10", status: "WON" },
      { homeTeam: "Al Masry", awayTeam: "ZED", tip: "Draw FT", odds: "3.00", status: "WON" },
    ]
  },

  {
    date: "31-05-2026",
    totalOdds: "20.20",
    matches: [
      { homeTeam: "Madryn", awayTeam: "Acassuso", tip: "Draw FT", odds: "2.90", status: "WON" },
      { homeTeam: "Constanta", awayTeam: "Chindia", tip: "Draw FT", odds: "3.00", status: "WON" },
      { homeTeam: "Patronato", awayTeam: "Tristan Suarez", tip: "Draw FT", odds: "2.90", status: "WON" },
    ]
  },

  {
    date: "30-05-2026",
    totalOdds: "21.53",
    matches: [
      { homeTeam: "Makelle 70", awayTeam: "Bahir Dar kenema", tip: "Draw FT", odds: "2.90", status: "WON" },
      { homeTeam: "Welwalo", awayTeam: "Ethiopian Insuarance", tip: "Draw FT", odds: "3.00", status: "WON" },
      { homeTeam: "FUS Rabat", awayTeam: "FAR Rabat", tip: "Draw FT", odds: "3.20", status: "WON" },
    ]
  },

  {
    date: "29-05-2026",
    totalOdds: "21.66",
    matches: [
      { homeTeam: "Locked Tips 🔐", awayTeam: "Locked 🔐", tip: "Draw FT", odds: "2.95", status: "PENDING" },
      { homeTeam: "Locked  🔐", awayTeam: "Locked 🔐", tip: "Draw FT", odds: "2.90", status: "PENDING" },
      { homeTeam: "Locked 🔐", awayTeam: "Locked 🔐", tip: "Draw FT", odds: "4.00", status: "PENDING" },
    ]
  },

  {
    date: "28-05-2026",
    totalOdds: "22.88",
    matches: [
      { homeTeam: "River Plate 2", awayTeam: "San lorenzo", tip: "Draw FT", odds: "3.10", status: "WON" },
      { homeTeam: "Rio Branco", awayTeam: "Vilavelhense", tip: "Draw FT", odds: "3.00", status: "WON" },
      { homeTeam: "Minaaa", awayTeam: "Al Talaba", tip: "Draw FT", odds: "3.05", status: "WON" },
    ]
  },

  {
    date: "27-05-2026",
    totalOdds: "20.07",
    matches: [
      { homeTeam: "Niyore Zamini", awayTeam: "Havadar", tip: "Draw FT", odds: "3.00", status: "WON" },
      { homeTeam: "Mara sugar", awayTeam: "Gor Mahia", tip: "Draw FT", odds: "2.80", status: "WON" },
      { homeTeam: "Kibera", awayTeam: "Nairobi City", tip: "Draw FT", odds: "3.00", status: "WON" },
    ]
  },

  {
    date: "26-05-2026",
    totalOdds: "18.13",
    matches: [
      { homeTeam: "Frandria", awayTeam: "Arsenal Sarandi", tip: "Draw FT", odds: "2.95", status: "WON" },
      { homeTeam: "Sidama Bunna", awayTeam: "Ethiopian Insuarance", tip: "Draw FT", odds: "2.70", status: "WON" },
      { homeTeam: "Deportivo Merlo", awayTeam: "Liniers", tip: "Draw FT", odds: "2.90", status: "WON" },
    ]
  },

  {
    date: "25-05-2026",
    totalOdds: "23.90",
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