import React from 'react';

const Hero: React.FC = () => {
    return (
        <section id="home" className="min-h-screen flex items-center bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900/50">
            <div className="container mx-auto px-6 text-center">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6 animate-fade-in-down">
                        Pioneering Tomorrow's Technology, Today.
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 mb-8 animate-fade-in-up">
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
