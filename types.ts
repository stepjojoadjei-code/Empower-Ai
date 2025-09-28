
export interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  error?: boolean;
}
