export type Message = {
  id: number;
  content: string;
  createdAt: string;
  user: User;
};

export type User = {
  id: number;
  name: string;
};
