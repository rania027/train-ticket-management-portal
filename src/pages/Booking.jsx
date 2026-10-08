import { useState } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "../supabase";
import { ROUTES, routeLabel, calcTotal, formatPrice, formatDay } from "../data/routes";
import RouteImage from "../components/RouteImage";

function Booking() {
  const location = useLocation();

  const [name, setName] = useState("");
  const [tickets, setTickets] = useState(1);
  const [stand, setStand] = useState("Sleeper");
  const [venue, setVenue] = useState(location.state?.venue || "");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const selectedRoute = ROUTES.find((r) => routeLabel(r) === venue);
  const total = calcTotal(selectedRoute, stand, tickets);

  const validate = () => {
    if (!name.trim()) return "Please enter your name.";
    if (!selectedRoute) return "Please select a route.";
    const count = Number(tickets);
    if (!Number.isInteger(count) || count < 1) return "Tickets must be at least 1.";
    if (count > 6) return "You can book a maximum of 6 tickets at a time.";
    return null;
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    const error = validate();
    if (error) {
      setMessage({ type: "error", text: error });
      return;
    }

    setLoading(true);
    const { error: dbError } = await supabase.from("bookings").insert([
      {
        name: name.trim(),
        tickets: Number(tickets),
        stand,
        venue,
        total_price: total,
      },
    ]);
    setLoading(false);

    if (dbError) {
      setMessage({ type: "error", text: "Booking failed: " + dbError.message });
      return;
    }

    setMessage({
      type: "success",
      text: `🎉 Ticket booked successfully! Total paid: ${formatPrice(total)}`,
    });
    setName("");
    setTickets(1);
    setStand("Sleeper");
    setVenue("");
  };

  return (
    <section>
      <h2 className="page-title">Book Your Ticket</h2>
      <div className="booking-layout">
        <form className="form" onSubmit={handleBooking}>
          <label htmlFor="name">Passenger Name</label>
          <input
            id="name"
            type="text"
            placeholder="Enter full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="venue">Station / Route</label>
          <select id="venue" value={venue} onChange={(e) => setVenue(e.target.value)}>
            <option value="">Select a route</option>
            {ROUTES.map((r) => (
              <option key={r.id} value={routeLabel(r)}>
                {routeLabel(r)} ({formatDay(r.date)})
              </option>
            ))}
          </select>

          <label htmlFor="stand">Class</label>
          <select id="stand" value={stand} onChange={(e) => setStand(e.target.value)}>
            <option value="Sleeper">Sleeper</option>
            <option value="3AC">3AC</option>
            <option value="2AC">2AC</option>
            <option value="1AC">1AC</option>
          </select>

          <label htmlFor="tickets">Number of Tickets</label>
          <input
            id="tickets"
            type="number"
            min="1"
            max="6"
            value={tickets}
            onChange={(e) => setTickets(e.target.value)}
          />

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Booking..." : `Confirm Booking${total ? " · " + formatPrice(total) : ""}`}
          </button>

          {message.text && (
            <p className={`message ${message.type}`}>{message.text}</p>
          )}
        </form>

        <div className="preview">
          <RouteImage
            key={selectedRoute ? selectedRoute.id : 0}
            seed={selectedRoute ? selectedRoute.id : 0}
            alt="Selected train route"
          />
          <h3>Live Preview</h3>
          <p><strong>Name:</strong> {name || "—"}</p>
          <p><strong>Route:</strong> {venue || "—"}</p>
          <p><strong>Date:</strong> {selectedRoute ? formatDay(selectedRoute.date) : "—"}</p>
          <p><strong>Class:</strong> {stand}</p>
          <p><strong>Tickets:</strong> {tickets || "—"}</p>
          {selectedRoute && (
            <p className="muted">
              {formatPrice(selectedRoute.price)} base fare × class × {tickets || 0}
            </p>
          )}
          <p className="total">Total: {total ? formatPrice(total) : "—"}</p>
        </div>
      </div>
    </section>
  );
}

export default Booking;
