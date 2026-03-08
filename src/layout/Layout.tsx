import './Layout.scss';

import { Outlet, ScrollRestoration } from 'react-router-dom';

import Footer from '../shared/layout/footer/Footer';
import Header from '../shared/layout/header/Header';

const Layout = () => (
  <div className="layout">
    <ScrollRestoration />
    <Header />
    <main className="content">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default Layout;
