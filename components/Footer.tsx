
import React from 'react';
import { GithubIcon } from './icons/GithubIcon';
import { LinkedInIcon } from './icons/LinkedInIcon';
import { TwitterIcon } from './icons/TwitterIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import { AppleStoreIcon } from './icons/AppleStoreIcon';
import { MicrosoftStoreIcon } from './icons/MicrosoftStoreIcon';

const Footer: React.FC = () => {
    const AppButton: React.FC<{ icon: React.ReactNode; store: string; link: string; }> = ({ icon, store, link }) => (
        <a href={link} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg px-4 py-2 transition-colors duration-300">
            {icon}
            <div className="text-left">
                <p className="text-xs">Download on the</p>
                <p className="text-lg font-semibold leading-tight">{store}</p>
            </div>
        </a>
    );

    return (
        <footer className="bg-gray-100 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Column 1: Branding and Social */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <a href="#home" className="flex items-center space-x-2 text-xl font-bold text-gray-800 dark:text-white">
                            <SparklesIcon />
                            <span>Stellar Solutions</span>
                        </a>
                        <p className="mt-2 text-gray-500 dark:text-gray-400">Pioneering Tomorrow's Technology, Today.</p>
                        <div className="flex space-x-6 mt-4">
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-gray-400 hover:text-blue-500 transition-colors duration-300">
                                <TwitterIcon />
                            </a>
                            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-gray-400 hover:text-blue-500 transition-colors duration-300">
                                <GithubIcon />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-400 hover:text-blue-500 transition-colors duration-300">
                                <LinkedInIcon />
                            </a>
                        </div>
                    </div>

                    {/* Column 2: App Downloads */}
                     <div className="flex flex-col items-center md:items-start space-y-4">
                        <h4 className="font-semibold text-gray-800 dark:text-white">Download Our App</h4>
                        <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-4">
                           <AppButton icon={<AppleStoreIcon />} store="App Store" link="https://www.apple.com/app-store/" />
                           <AppButton icon={<MicrosoftStoreIcon />} store="Microsoft Store" link="https://www.microsoft.com/store/apps" />
                        </div>
                    </div>

                    {/* Column 3: Quick Links (Example) */}
                    <div className="flex flex-col items-center md:items-start">
                        <h4 className="font-semibold text-gray-800 dark:text-white">Quick Links</h4>
                        <a href="#services" className="mt-2 text-gray-500 dark:text-gray-400 hover:text-blue-500">Services</a>
                        <a href="#about" className="mt-2 text-gray-500 dark:text-gray-400 hover:text-blue-500">About Us</a>
                        <a href="#contact" className="mt-2 text-gray-500 dark:text-gray-400 hover:text-blue-500">Contact</a>
                    </div>
                </div>

                <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-8 text-center text-gray-500 dark:text-gray-400 text-sm">
                    <p>&copy; {new Date().getFullYear()} Stellar Solutions. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
