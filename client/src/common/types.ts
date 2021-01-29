export interface ChatMessageProps {
  user: string;
  time: number;
  message: string;
}

export interface User {
  name: string;
  socketId: string;
}
