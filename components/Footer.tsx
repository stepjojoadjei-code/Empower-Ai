import React from 'react';
import { LinkedInIcon } from './icons/LinkedInIcon';
import { TwitterIcon } from './icons/TwitterIcon';
import { GithubIcon } from './icons/GithubIcon';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-800/50">
            <div className="container mx-auto px-6 py-8">
                <div className="flex flex-col items-center justify-between sm:flex-row">
                    <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} Stellar Solutions. All rights reserved.</p>
                    <div className="flex space-x-4 mt-4 sm:mt-0">
                        <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300" aria-label="Twitter">
                           <TwitterIcon />
                        </a>
                         <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300" aria-label="LinkedIn">
                           <LinkedInIcon />
                        </a>
                         <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300" aria-label="Github">
                           <GithubIcon />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
