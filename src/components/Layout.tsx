import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Rollover" />
      <main className="flex-grow">
        <div className="px-8 pt-8 pb-[150px] w-full h-[91%] overflow-auto bg-secondary_bg">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;