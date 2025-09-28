import React, { useState, useRef } from 'react';
import { SparklesIcon } from './icons/SparklesIcon';
import { HamburgerIcon } from './icons/HamburgerIcon';
import { useTheme } from '../contexts/ThemeContext';
import { SunIcon } from './icons/SunIcon';
import { MoonIcon } from './icons/MoonIcon';
import { useScrollPosition } from '../hooks/useScrollPosition';

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const scrollY = useScrollPosition();
    const isScrolled = scrollY > 10;
    const { theme, toggleTheme } = useTheme();
    const menuButtonRef = useRef<HTMLButtonElement>(null);

    const navLinks = [
        { href: '#services', label: 'Services' },
        { href: '#about', label: 'About' },
        { href: '#testimonials', label: 'Testimonials' },
        { href: '#contact', label: 'Contact' },
    ];
    
    const handleMenuLinkClick = () => {
        setIsOpen(false);
        // Return focus to the menu button after a selection is made for accessibility
        menuButtonRef.current?.focus();
    };

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}>
            <div className="container mx-auto px-6 py-3">
                <div className="flex justify-between items-center">
                    <a href="#home" className="flex items-center space-x-2 text-2xl font-bold text-gray-800 dark:text-white">
                        <SparklesIcon />
                        <span>Stellar Solutions</span>
                    </a>
                    <div className="flex items-center space-x-4 md:space-x-8">
                        <nav className="hidden md:flex space-x-8">
                            {navLinks.map((link) => (
                                <a key={link.href} href={link.href} className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white transition-colors duration-300">{link.label}</a>
                            ))}
                        </nav>
                        <button onClick={toggleTheme} aria-label="Toggle theme" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white transition-colors duration-300">
                            {theme === 'light' ? <MoonIcon /> : <SunIcon />}
                        </button>
                        <div className="md:hidden">
                            <button ref={menuButtonRef} onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu" aria-expanded={isOpen}>
                                <HamburgerIcon isOpen={isOpen} />
                            </button>
                        </div>
                    </div>
                </div>
                {/* Mobile Menu */}
                <div className={`md:hidden mt-4 transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                    <nav className="flex flex-col space-y-4 items-center bg-gray-100/90 dark:bg-gray-800/90 rounded-lg p-4">
                         {navLinks.map((link) => (
                            <a key={link.href} href={link.href} onClick={handleMenuLinkClick} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white transition-colors duration-300 py-2 w-full text-center">{link.label}</a>
                        ))}
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;