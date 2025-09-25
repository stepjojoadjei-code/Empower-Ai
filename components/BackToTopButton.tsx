import React, { useState, useEffect } from 'react';
import { UpArrowIcon } from './icons/UpArrowIcon';

const BackToTopButton: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-24 right-8 md:bottom-8 md:right-8 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-opacity duration-300 z-50 ${
                isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            aria-label="Go to top"
        >
           <UpArrowIcon />
        </button>
    );
};

export default BackToTopButton;
