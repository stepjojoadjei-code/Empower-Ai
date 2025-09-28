import { useState, useRef, useCallback, useEffect } from 'react';
import { Message } from '../types';
import { sendMessageToAI, startNewChat } from '../services/geminiService';
import { generateUUID } from '../utils/uuid';

const CHAT_HISTORY_KEY = 'stellar-solutions-chat-history';

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const storedMessages = localStorage.getItem(CHAT_HISTORY_KEY);
      if (storedMessages) {
        return JSON.parse(storedMessages);
      }
    } catch (e) {
      console.error("Failed to parse chat history from localStorage", e);
    }
    return [{
        id: generateUUID(),
        sender: 'ai',
        text: 'Hello! I am the Stellar AI Assistant. How can I help you with our services today?'
    }];
  });

  const [isLoading, setIsLoading] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    try {
        localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(messages));
    } catch (e) {
        console.error("Failed to save chat history to localStorage", e);
    }
  }, [messages]);

  const handleNewChat = useCallback(() => {
    setMessages([{
        id: generateUUID(),
        sender: 'ai',
        text: 'Hello! I am the Stellar AI Assistant. How can I help you with our services today?'
    }]);
    startNewChat();
    if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        abortControllerRef.current = null;
    }
    setIsLoading(false);
  }, []);

  const stopStreaming = useCallback(() => {
    if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        abortControllerRef.current = null;
        setIsLoading(false);
    }
  }, []);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = { id: generateUUID(), sender: 'user', text };
    const aiMessageId = generateUUID();
    const aiMessagePlaceholder: Message = { id: aiMessageId, sender: 'ai', text: '', error: false };

    setMessages((prev) => [...prev, userMessage, aiMessagePlaceholder]);
    setIsLoading(true);

    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    try {
      const stream = await sendMessageToAI(text);
      let fullText = '';
      
      for await (const chunk of stream) {
        if (signal.aborted) {
            console.log("Stream stopped by user.");
            break;
        }
        const chunkText = chunk.text;
        
        if (chunkText) {
            fullText += chunkText;
            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === aiMessageId ? { ...msg, text: fullText, error: false } : msg
              )
            );
        }
      }
      
    } catch (e) {
        console.error(e);
        setMessages((prev) =>
            prev.map((msg) =>
                msg.id === aiMessageId ? {
                    ...msg,
                    text: 'Sorry, an error occurred. Please try again.',
                    error: true
                } : msg
            )
        );
    } finally {
        setIsLoading(false);
        abortControllerRef.current = null;
    }
  }, []);

  const retryLastMessage = useCallback(() => {
    let lastErrorIndex = -1;
    for (let i = messages.length - 1; i >= 0; i--) {
        if (messages[i].sender === 'ai' && messages[i].error) {
            lastErrorIndex = i;
            break;
        }
    }

    if (lastErrorIndex > 0) {
        const precedingMessage = messages[lastErrorIndex - 1];
        if (precedingMessage.sender === 'user') {
            const userMessageToRetry = precedingMessage;
            setMessages(prev => prev.slice(0, lastErrorIndex - 1));
            sendMessage(userMessageToRetry.text);
        }
    }
  }, [messages, sendMessage]);


  return { messages, isLoading, sendMessage, handleNewChat, stopStreaming, retryLastMessage };
};