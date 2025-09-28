import React, { useState, useRef, useEffect } from 'react';
import { useChat } from '../hooks/useChat';
import { Message } from '../types';
import { ChatIcon } from './icons/ChatIcon';
import { CloseIcon } from './icons/CloseIcon';
import { SendIcon } from './icons/SendIcon';
import { RefreshIcon } from './icons/NewChatIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import { StopIcon } from './icons/StopIcon';
import MarkdownRenderer from './MarkdownRenderer';
import { CopyIcon } from './icons/CopyIcon';
import { CheckIcon } from './icons/CheckIcon';
import MessageSkeleton from './MessageSkeleton';

const AIChat: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { messages, isLoading, sendMessage, handleNewChat, stopStreaming, retryLastMessage } = useChat();
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);
    
    useEffect(() => {
        if (isOpen) {
            // Delay focus slightly to allow for transition
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    // Auto-resize textarea
    useEffect(() => {
        const textarea = inputRef.current;
        if (textarea) {
            textarea.style.height = 'auto'; // Reset height
            const scrollHeight = textarea.scrollHeight;
            textarea.style.height = `${scrollHeight}px`;
        }
    }, [input]);

    const handleSendMessage = () => {
        if (input.trim() && !isLoading) {
            sendMessage(input);
            setInput('');
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSendMessage();
    };

    const toggleChat = () => setIsOpen(!isOpen);
    
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <>
            <button
                onClick={toggleChat}
                className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-transform transform hover:scale-110 z-50"
                aria-label="Toggle AI Chat"
            >
                {isOpen ? <CloseIcon /> : <ChatIcon />}
            </button>

            <div
                className={`fixed bottom-24 right-8 w-[calc(100vw-4rem)] max-w-lg h-[70vh] max-h-[600px] bg-white dark:bg-gray-800 rounded-xl shadow-2xl flex flex-col transition-all duration-300 ease-in-out z-50 ${
                    isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
                }`}
                role="dialog"
                aria-modal="true"
                aria-labelledby="ai-chat-title"
            >
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-2">
                        <SparklesIcon />
                        <h3 id="ai-chat-title" className="font-bold text-lg text-gray-800 dark:text-white">Stellar AI Assistant</h3>
                    </div>
                    <button onClick={handleNewChat} className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-white" aria-label="New Chat">
                        <RefreshIcon />
                    </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4" aria-live="polite" aria-atomic="false">
                    {messages.map((msg) => (
                        <ChatMessage key={msg.id} message={msg} onRetry={retryLastMessage} />
                    ))}
                    {isLoading && <MessageSkeleton />}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Form */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <form onSubmit={handleSubmit} className="relative flex items-center">
                        <textarea
                            ref={inputRef}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Ask about our services..."
                            className="w-full bg-gray-100 dark:bg-gray-700 border-transparent rounded-lg py-2 pl-4 pr-20 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white"
                            rows={1}
                            style={{maxHeight: '120px'}}
                            aria-label="Chat input"
                        />
                        <div className="absolute right-2 flex items-center">
                            {isLoading && (
                                <button
                                    type="button"
                                    onClick={stopStreaming}
                                    className="p-2 text-gray-500 hover:text-gray-800 dark:hover:text-white"
                                    aria-label="Stop generating"
                                >
                                    <StopIcon />
                                </button>
                            )}
                            <button
                                type="submit"
                                disabled={isLoading || !input.trim()}
                                className="p-2 rounded-full text-blue-600 hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-gray-600 disabled:text-gray-400 dark:disabled:text-gray-500 disabled:cursor-not-allowed transition-colors"
                                aria-label="Send message"
                            >
                                <SendIcon />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

const ChatMessage: React.FC<{ message: Message; onRetry: () => void; }> = ({ message, onRetry }) => {
    const isUser = message.sender === 'user';
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(message.text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
            <div className={`group relative rounded-lg px-4 py-3 max-w-xs lg:max-w-md ${
                isUser 
                ? 'bg-blue-600 text-white' 
                : message.error 
                ? 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
            }`}>
                 <MarkdownRenderer text={message.text} />

                 {message.error && (
                    <button onClick={onRetry} className="mt-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                        Retry
                    </button>
                 )}

                 {!isUser && !message.error && message.text && (
                    <button
                        onClick={handleCopy}
                        className="absolute -top-2 -right-2 p-1 bg-gray-300 dark:bg-gray-600 rounded-full text-gray-600 dark:text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Copy message"
                    >
                       {copied ? <CheckIcon /> : <CopyIcon />}
                    </button>
                )}
            </div>
        </div>
    );
};

export default AIChat;