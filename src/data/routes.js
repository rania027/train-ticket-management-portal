const iso = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

// Date n days from today, as "YYYY-MM-DD"
export const dateFromToday = (n) => {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return iso(d);
};

// "2026-10-08" -> "8 Oct"
export const formatDay = (isoStr) =>
  new Date(isoStr + "T00:00:00").toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });

// offset = days from today the train runs
const BASE = [
  { id: 1, team1: "Bengaluru", team2: "Mumbai", venue: "KSR Bengaluru Junction", price: 1250, offset: 0 },
  { id: 2, team1: "Delhi", team2: "Chennai", venue: "New Delhi Railway Station", price: 1650, offset: 0 },
  { id: 3, team1: "Kolkata", team2: "Hyderabad", venue: "Howrah Junction", price: 1100, offset: 1 },
  { id: 4, team1: "Pune", team2: "Jaipur", venue: "Pune Junction", price: 950, offset: 1 },
  { id: 5, team1: "Chennai", team2: "Bengaluru", venue: "MGR Chennai Central", price: 450, offset: 1 },
  { id: 6, team1: "Mumbai", team2: "Delhi", venue: "Mumbai Central", price: 1500, offset: 2 },
  { id: 7, team1: "Hyderabad", team2: "Pune", venue: "Secunderabad Junction", price: 800, offset: 2 },
  { id: 8, team1: "Jaipur", team2: "Delhi", venue: "Jaipur Junction", price: 400, offset: 3 },
  { id: 9, team1: "Bengaluru", team2: "Kolkata", venue: "KSR Bengaluru Junction", price: 1900, offset: 4 },
  { id: 10, team1: "Mumbai", team2: "Chennai", venue: "Mumbai Central", price: 1400, offset: 5 },
];

export const ROUTES = BASE.map(({ offset, ...r }) => ({
  ...r,
  date: dateFromToday(offset),
}));

export const CLASS_MULTIPLIER = { Sleeper: 1, "3AC": 2.2, "2AC": 3.1, "1AC": 5 };

export const routeLabel = (r) => `${r.team1} → ${r.team2}`;

export const calcTotal = (route, cls, tickets) =>
  route ? Math.round(route.price * CLASS_MULTIPLIER[cls] * Number(tickets || 0)) : 0;

export const formatPrice = (n) => "₹" + Number(n).toLocaleString("en-IN");
