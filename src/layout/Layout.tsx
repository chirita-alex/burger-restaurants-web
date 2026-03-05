import { Outlet } from "react-router-dom";
import Header from "../shared/layout/header/Header";
import Footer from "../shared/layout/footer/Footer";
import "./Layout.scss";

const Layout = () => (
  <div className="layout">
    <Header />
    <main className="content">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default Layout;
