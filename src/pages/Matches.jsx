import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  ROUTES,
  routeLabel,
  formatPrice,
  dateFromToday,
  formatDay,
} from "../data/routes";
import RouteImage from "../components/RouteImage";

// Props: id, team1 (from), team2 (to), venue (station), date, price
function MatchCard({ id, team1, team2, venue, date, price }) {
  const navigate = useNavigate();

  const handleBook = () => {
    navigate("/booking", { state: { venue: routeLabel({ team1, team2 }) } });
  };

  return (
    <div className="card">
      <RouteImage seed={id} alt={`${team1} to ${team2} train`} />
      <h3 className="card-title">
        {team1} <span className="arrow">→</span> {team2}
      </h3>
      <p><strong>Station:</strong> {venue}</p>
      <p><strong>Date:</strong> {formatDay(date)}</p>
      <p className="price-tag">
        {formatPrice(price)} <span>onwards (Sleeper)</span>
      </p>
      <button className="btn btn-primary" onClick={handleBook}>
        Book Ticket
      </button>
    </div>
  );
}

const SORTERS = {
  "date-asc": (a, b) => a.date.localeCompare(b.date),
  "date-desc": (a, b) => b.date.localeCompare(a.date),
  "price-asc": (a, b) => a.price - b.price,
  "price-desc": (a, b) => b.price - a.price,
  "from-asc": (a, b) => a.team1.localeCompare(b.team1),
  "to-asc": (a, b) => a.team2.localeCompare(b.team2),
};

const QUICK_DATES = [0, 1, 2].map(dateFromToday);

function Matches() {
  const [sortBy, setSortBy] = useState("date-asc");
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("all");

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    const filtered = ROUTES.filter(
      (r) =>
        (dateFilter === "all" || r.date === dateFilter) &&
        `${r.team1} ${r.team2} ${r.venue}`.toLowerCase().includes(q)
    );
    return [...filtered].sort(SORTERS[sortBy]);
  }, [search, sortBy, dateFilter]);

  return (
    <section>
      <h2 className="page-title">Available Train Routes</h2>

      <div className="chips">
        <button
          className={`chip ${dateFilter === "all" ? "active" : ""}`}
          onClick={() => setDateFilter("all")}
        >
          All dates
        </button>
        {QUICK_DATES.map((d, i) => (
          <button
            key={d}
            className={`chip ${dateFilter === d ? "active" : ""}`}
            onClick={() => setDateFilter(d)}
          >
            {formatDay(d)}
            {i < 2 && <small>{i === 0 ? "Today" : "Tomorrow"}</small>}
          </button>
        ))}
        <input
          type="date"
          min={QUICK_DATES[0]}
          value={dateFilter === "all" ? "" : dateFilter}
          onChange={(e) => setDateFilter(e.target.value || "all")}
          aria-label="Pick a date"
        />
      </div>

      <div className="toolbar">
        <input
          type="text"
          placeholder="Search city or station..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="date-asc">Date: earliest first</option>
          <option value="date-desc">Date: latest first</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
          <option value="from-asc">From: A to Z</option>
          <option value="to-asc">To: A to Z</option>
        </select>
      </div>

      {visible.length === 0 ? (
        <p className="empty">
          No routes on this date. Try another date or clear the search.
        </p>
      ) : (
        <div className="card-grid">
          {visible.map((r) => (
            <MatchCard
              key={r.id}
              id={r.id}
              team1={r.team1}
              team2={r.team2}
              venue={r.venue}
              date={r.date}
              price={r.price}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default Matches;
