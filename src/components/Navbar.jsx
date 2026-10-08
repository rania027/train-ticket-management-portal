import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">🚆 RailPortal</h2>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/matches">Routes</Link>
        <Link to="/booking">Book Ticket</Link>
        <Link to="/history">Booking History</Link>
      </div>
    </nav>
  );
}

export default Navbar;
