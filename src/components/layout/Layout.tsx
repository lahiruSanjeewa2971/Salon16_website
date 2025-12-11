import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="min-h-screen flex flex-col w-full overflow-x-hidden">
      {!isAuthPage && <Navbar />}
      <main className="flex-1 w-full overflow-x-hidden">
        <Outlet />
      </main>
      {!isAuthPage && <Footer />}
    </div>
  );
};

export default Layout;

