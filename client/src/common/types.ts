export type Conversation = {
  id: string;
  name?: string;
  messages: Message[];
  users: User[];
};

export type Message = {
  id: string;
  content: string;
  createdAt: string;
  user: User;
};

export type User = {
  id: string;
  name: string;
};
