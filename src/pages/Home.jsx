import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="hero hero-photo">
      <h1>Welcome to the Train Ticket Management Portal</h1>
      <p>
        Browse routes, book tickets in seconds, and keep track of all your
        journeys in one place.
      </p>
      <div className="hero-buttons">
        <Link to="/matches" className="btn btn-primary">View Routes</Link>
        <Link to="/booking" className="btn btn-outline">Book Now</Link>
      </div>
    </section>
  );
}

export default Home;
