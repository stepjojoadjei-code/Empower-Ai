import React from 'react';
import CanvasBackground from './CanvasBackground';

const Hero: React.FC = () => {
    return (
        <section id="home" className="relative min-h-screen flex items-center bg-gradient-to-br from-gray-50 via-white to-blue-100/50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-900/50 overflow-hidden">
            <CanvasBackground />
            <div className="container mx-auto px-6 text-center relative z-10">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6 animate-fade-in-down">
                        Pioneering Tomorrow's Technology, Today.
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 animate-fade-in-up">
                        We deliver cutting-edge AI, Cybersecurity, and Cloud solutions to propel your business into the future.
                    </p>
                    <a
                        href="#contact"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105 inline-block"
                    >
                        Get a Free Consultation
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Hero;