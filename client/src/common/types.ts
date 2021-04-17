export type Channel = {
  id: string;
  name: string;
  conversation: Conversation;
};

export type Conversation = {
  id: string;
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
