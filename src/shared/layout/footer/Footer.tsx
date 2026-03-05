import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <p className="copy">
        &copy; {new Date().getFullYear()} Burger Restaurants. All rights reserved
      </p>
    </footer>
  );
};

export default Footer;
