import { BrowserRouter, Routes, Route } from 'react-router';
import Toast from '@/components/Toast';
import Home from '@/pages/Home';
import Layout from '@/partials/Layout';
import About from '@/pages/About';
import Logout from '@/pages/Logout';
import LoginOrRegister from '@/pages/LoginOrRegister';
import NotFound from '@/pages/NotFound';

function App() {
    return (
        <BrowserRouter>
            {/* <Toast /> */}
            <Routes>
                {/* Layout-wrapped routes */}
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                </Route>

                {/* Top-level routes */}
                <Route path="/logout" element={<Logout />} />
                <Route path="/login" element={<LoginOrRegister />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
