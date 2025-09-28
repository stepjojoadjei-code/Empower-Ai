import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set. Please add it to your environment.");
}

// As per guidelines, the API key must be from process.env.API_KEY.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

let chat: Chat | null = null;

async function initializeChat(): Promise<Chat> {
    if (chat) {
        return chat;
    }
    
    // Using the recommended 'gemini-2.5-flash' model for general text tasks.
    chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: 'You are a helpful and friendly assistant for a tech solutions company called "Stellar Solutions". Your goal is to answer questions about our services (AI Development, Cybersecurity, Cloud Solutions, Data Analytics), our company, and general tech topics. Keep your answers concise, professional, and encouraging. Use markdown for formatting when appropriate.',
        },
    });
    return chat;
}

export async function startNewChat() {
    chat = null; // This will force re-initialization on the next message
}

export async function sendMessageToAI(message: string): Promise<AsyncIterable<GenerateContentResponse>> {
    const currentChat = await initializeChat();
    
    // Using sendMessageStream for streaming chat responses.
    const result = await currentChat.sendMessageStream({ message });
    return result;
}