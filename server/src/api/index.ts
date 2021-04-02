import db from '../db';
import { Message, User } from './types';

export async function createMessage(userId: number, content: string) {
  const {
    rows,
  } = await db.query(
    'INSERT INTO messages (user_id, content) VALUES ($1, $2) RETURNING message_id',
    [userId, content],
  );
  return rows[0];
}

export async function createUser(name: string) {
  const { rows } = await db.query('INSERT INTO users (username) VALUES ($1) RETURNING user_id', [
    name,
  ]);
  return rows[0];
}

export async function getAllMessages() {
  const text = 'SELECT * FROM messages JOIN users USING (user_id)';
  const { rows } = await db.query(text);
  return rows.map(({ message_id, content, created_at, user_id, username }: Message & User) => {
    return {
      id: message_id,
      content,
      createdAt: created_at,
      user: {
        id: user_id,
        name: username,
      },
    };
  });
}
