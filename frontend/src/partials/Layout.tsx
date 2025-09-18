import { Outlet } from 'react-router';
import Header from './Header';
import Footer from './Footer';
import Logo from '@/assets/logo.png';

export default function Layout() {
    return (
        <div className="flex flex-col min-h-screen relative">
            {/* Centered background logo */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                <img src={Logo} alt="Logo" className="w-1/3 opacity-5" />
            </div>
            <div className="relative z-10 flex flex-col min-h-screen">
                <Header />
                <main className="w-5/6 flex-grow mx-auto p-2 ">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    );
}
