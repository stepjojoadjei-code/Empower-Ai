import React, { useState, useRef, useEffect } from 'react';
import { ChatIcon } from './icons/ChatIcon';
import { CloseIcon } from './icons/CloseIcon';
import { SendIcon } from './icons/SendIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import { SpinnerIcon } from './icons/SpinnerIcon';
import { NewChatIcon } from './icons/NewChatIcon';
import { Message } from '../types';
import { sendMessageToAI, startNewChat } from '../services/geminiService';
import MarkdownRenderer from './MarkdownRenderer';

const AIChat: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages, isLoading]);

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setMessages([{ sender: 'ai', text: "Hello! I'm the Stellar Solutions AI assistant. How can I help you today?" }]);
        }
    }, [isOpen, messages.length]);

    const handleNewChat = () => {
        startNewChat();
        setMessages([{ sender: 'ai', text: "Hello! I'm the Stellar Solutions AI assistant. How can I help you today?" }]);
    };

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: Message = { sender: 'user', text: input.trim() };
        setMessages(prev => [...prev, userMessage, { sender: 'ai', text: '' }]);
        setInput('');
        setIsLoading(true);

        try {
            const stream = await sendMessageToAI(userMessage.text);
            for await (const chunk of stream) {
                // Fix: Using `chunk.text` directly as per Gemini API guidelines.
                const chunkText = chunk.text;
                setMessages(prev => {
                    const lastMessage = prev[prev.length - 1];
                    if (lastMessage && lastMessage.sender === 'ai') {
                        lastMessage.text += chunkText;
                        return [...prev.slice(0, -1), lastMessage];
                    }
                    return prev;
                });
            }
        } catch (error) {
            console.error("Error sending message:", error);
            setMessages(prev => {
                const updatedMessages = [...prev];
                const lastMessage = updatedMessages[updatedMessages.length - 1];
                if (lastMessage && lastMessage.sender === 'ai') {
                    lastMessage.text = "Sorry, I encountered an error. Please try again.";
                }
                return updatedMessages;
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Chat Bubble */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg z-[60] transition-transform transform hover:scale-110"
                aria-label="Open AI Chat"
            >
                {isOpen ? <CloseIcon /> : <ChatIcon />}
            </button>

            {/* Chat Window */}
            <div className={`fixed bottom-24 right-8 w-[calc(100vw-4rem)] max-w-md h-[70vh] max-h-[500px] bg-gray-800/80 backdrop-blur-md rounded-xl shadow-2xl flex flex-col transition-all duration-300 z-50 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b border-gray-700">
                    <div className="flex items-center space-x-2">
                        <SparklesIcon />
                        <h3 className="font-bold text-white">Stellar AI Assistant</h3>
                    </div>
                    <div className="flex items-center space-x-2">
                         <button onClick={handleNewChat} className="text-gray-400 hover:text-white" aria-label="Start new chat">
                            <NewChatIcon />
                        </button>
                        <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white" aria-label="Close chat">
                            <CloseIcon />
                        </button>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto space-y-4">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] rounded-lg px-4 py-2 ${msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-200'}`}>
                               <MarkdownRenderer text={msg.text} />
                            </div>
                        </div>
                    ))}
                    {isLoading && messages[messages.length-1]?.sender === 'ai' && messages[messages.length-1]?.text === '' && (
                         <div className="flex justify-start">
                             <div className="max-w-[80%] rounded-lg px-4 py-2 bg-gray-700 text-gray-200 flex items-center space-x-2">
                                <SpinnerIcon />
                                <span>Thinking...</span>
                            </div>
                         </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-gray-700">
                    <div className="flex items-center bg-gray-700 rounded-full">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Ask me anything..."
                            className="w-full bg-transparent text-white placeholder-gray-400 px-5 py-2 focus:outline-none"
                            disabled={isLoading}
                        />
                        <button onClick={handleSend} disabled={isLoading || !input.trim()} className="p-3 text-white disabled:text-gray-500 disabled:cursor-not-allowed hover:text-blue-400 transition-colors">
                            {isLoading ? <SpinnerIcon /> : <SendIcon />}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AIChat;
