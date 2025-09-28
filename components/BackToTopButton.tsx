import React from 'react';
import { UpArrowIcon } from './icons/UpArrowIcon';
import { useScrollPosition } from '../hooks/useScrollPosition';

const BackToTopButton: React.FC = () => {
    const scrollY = useScrollPosition();
    const isVisible = scrollY > 300;

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-24 right-8 md:bottom-8 md:right-24 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-opacity duration-300 z-50 ${
                isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            aria-label="Go to top"
        >
           <UpArrowIcon />
        </button>
    );
};

export default BackToTopButton;