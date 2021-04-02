export type Message = {
  message_id: number;
  content: string;
  created_at: string;
  user: User;
};

export type User = {
  user_id: number;
  username: string;
};
