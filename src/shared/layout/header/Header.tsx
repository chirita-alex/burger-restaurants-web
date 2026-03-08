import "./Header.scss";

import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <Link to="/" className="logo" aria-label="Burger restaurants home page">
        Burger Restaurants
      </Link>
      <nav aria-label="Main navigation">
        <ul className="nav">
          <li>
            <Link
              to="/"
              aria-label="Nearby restaurants page"
            >
              Nearby restaurants
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
