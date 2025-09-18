import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';

export default function Header() {
    const [isTopOfPage, setIsTopOfPage] = useState<boolean>(true);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY === 0) {
                setIsTopOfPage(true);
            }
            if (window.scrollY !== 0) setIsTopOfPage(false);
        };

        window.addEventListener('scroll', handleScroll);

        // when the component unmounts/disappears
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    return <Navbar />;
}
