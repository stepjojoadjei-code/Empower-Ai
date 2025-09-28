import React, { useState } from 'react';
import { CopyIcon } from './icons/CopyIcon';
import { CheckIcon } from './icons/CheckIcon';

const CodeBlock: React.FC<{ language: string; code: string }> = ({ language, code }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <div className="bg-gray-900 dark:bg-black rounded-lg my-4 border border-gray-700 dark:border-gray-800 text-sm">
            <div className="flex justify-between items-center px-4 py-2 bg-gray-800 dark:bg-gray-900/50 rounded-t-lg">
                <span className="text-gray-300 font-sans">{language || 'code'}</span>
                <button
                    onClick={handleCopy}
                    className="flex items-center text-xs text-gray-300 hover:text-white transition-colors"
                    aria-label="Copy code to clipboard"
                >
                    {copied ? <CheckIcon /> : <CopyIcon />}
                    <span className="ml-2">{copied ? 'Copied!' : 'Copy code'}</span>
                </button>
            </div>
            <pre className="p-4 overflow-x-auto text-white">
                <code>{code}</code>
            </pre>
        </div>
    );
};

export default CodeBlock;