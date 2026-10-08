import { useState, useMemo } from "react";
import { supabase } from "../supabase";
import { formatPrice } from "../data/routes";

const SORTERS = {
  newest: (a, b) => new Date(b.created_at) - new Date(a.created_at),
  oldest: (a, b) => new Date(a.created_at) - new Date(b.created_at),
  "name-asc": (a, b) => a.name.localeCompare(b.name),
  "price-desc": (a, b) => (b.total_price ?? 0) - (a.total_price ?? 0),
  "price-asc": (a, b) => (a.total_price ?? 0) - (b.total_price ?? 0),
  "tickets-desc": (a, b) => b.tickets - a.tickets,
  "route-asc": (a, b) => a.venue.localeCompare(b.venue),
};

function BookingHistory() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fetched, setFetched] = useState(false);
  const [sortBy, setSortBy] = useState("newest");
  const [search, setSearch] = useState("");

  const fetchBookings = async () => {
    setLoading(true);
    setError("");

    const { data, error } = await supabase.from("bookings").select("*");

    setLoading(false);

    if (error) {
      setError("Could not fetch bookings: " + error.message);
      return;
    }

    setBookings(data || []);
    setFetched(true);
  };

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    const filtered = bookings.filter((b) =>
      `${b.name} ${b.venue}`.toLowerCase().includes(q)
    );
    return [...filtered].sort(SORTERS[sortBy]);
  }, [bookings, search, sortBy]);

  return (
    <section>
      <h2 className="page-title">Booking History</h2>
      <button className="btn btn-primary" onClick={fetchBookings} disabled={loading}>
        {loading ? "Loading..." : "Fetch Bookings"}
      </button>

      {error && <p className="message error">{error}</p>}

      {fetched && bookings.length === 0 && !error && (
        <p className="empty">No bookings found.</p>
      )}

      {bookings.length > 0 && (
        <>
          <div className="toolbar">
            <input
              type="text"
              placeholder="Search name or route..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="newest">Booked: newest first</option>
              <option value="oldest">Booked: oldest first</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="route-asc">Route: A to Z</option>
              <option value="price-desc">Price: high to low</option>
              <option value="price-asc">Price: low to high</option>
              <option value="tickets-desc">Most tickets</option>
            </select>
          </div>

          {visible.length === 0 ? (
            <p className="empty">No bookings match your search.</p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Tickets</th>
                  <th>Class</th>
                  <th>Route / Venue</th>
                  <th>Total</th>
                  <th>Booked On</th>
                </tr>
              </thead>
              <tbody>
                {visible.map((b) => (
                  <tr key={b.id}>
                    <td data-label="Name">{b.name}</td>
                    <td data-label="Tickets">{b.tickets}</td>
                    <td data-label="Class">{b.stand}</td>
                    <td data-label="Route / Venue">{b.venue}</td>
                    <td data-label="Total">
                      {b.total_price != null ? formatPrice(b.total_price) : "—"}
                    </td>
                    <td data-label="Booked On">
                      {new Date(b.created_at).toLocaleDateString("en-IN")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </section>
  );
}

export default BookingHistory;
