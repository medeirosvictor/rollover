import { BrowserRouter, Routes, Route } from 'react-router';
import Toast from '@/components/Toast';
import Home from '@/pages/Home';
import Layout from '@/partials/Layout';
import About from '@/pages/About';
import Logout from '@/pages/Logout';
import LoginOrRegister from '@/pages/LoginOrRegister';
import NotFound from '@/pages/NotFound';
import Room from './pages/Room';
import Profile from './pages/Profile';
import { UserProvider } from './context/UserProvider';

function App() {
    return (
        <BrowserRouter>
            {/* <Toast /> */}
            <UserProvider>
                <Routes>
                    {/* Layout-wrapped routes */}
                    <Route element={<Layout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/room/:roomCode" element={<Room />} />
                        <Route path="/about" element={<About />} />
                    </Route>

                    {/* Top-level routes */}
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/login" element={<LoginOrRegister />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </UserProvider>
        </BrowserRouter>
    );
}

export default App;
