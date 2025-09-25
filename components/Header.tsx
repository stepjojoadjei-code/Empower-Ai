import React, { useState, useEffect } from 'react';
import { SparklesIcon } from './icons/SparklesIcon';
import { HamburgerIcon } from './icons/HamburgerIcon';

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const navLinks = [
        { href: '#services', label: 'Services' },
        { href: '#about', label: 'About' },
        { href: '#testimonials', label: 'Testimonials' },
        { href: '#contact', label: 'Contact' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-900/80 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}>
            <div className="container mx-auto px-6 py-3">
                <div className="flex justify-between items-center">
                    <a href="#home" className="flex items-center space-x-2 text-2xl font-bold text-white">
                        <SparklesIcon />
                        <span>Stellar Solutions</span>
                    </a>
                    <nav className="hidden md:flex space-x-8">
                        {navLinks.map((link) => (
                            <a key={link.href} href={link.href} className="text-gray-300 hover:text-white transition-colors duration-300">{link.label}</a>
                        ))}
                    </nav>
                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
                            <HamburgerIcon isOpen={isOpen} />
                        </button>
                    </div>
                </div>
                {/* Mobile Menu */}
                <div className={`md:hidden mt-4 transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                    <nav className="flex flex-col space-y-4 items-center bg-gray-800/90 rounded-lg p-4">
                         {navLinks.map((link) => (
                            <a key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white transition-colors duration-300 py-2 w-full text-center">{link.label}</a>
                        ))}
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
