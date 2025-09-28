
import React from 'react';
import { TypingIndicator } from './TypingIndicator';

const MessageSkeleton: React.FC = () => {
    return (
        <div className="flex justify-start">
            <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-3 max-w-xs lg:max-w-md">
                <TypingIndicator />
            </div>
        </div>
    );
};

export default MessageSkeleton;
