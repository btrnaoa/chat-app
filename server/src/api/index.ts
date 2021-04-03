import db from '../db';

export async function createConversation(isPrivate: boolean) {
  const {
    rows,
  } = await db.query(
    'INSERT INTO conversations (is_private) VALUES ($1) RETURNING conversation_id',
    [isPrivate],
  );
  return rows[0].conversation_id;
}

export async function createMessage(userId: number, content: string, conversationId: number) {
  const {
    rows,
  } = await db.query(
    'INSERT INTO messages (user_id, content, conversation_id) VALUES ($1, $2, $3) RETURNING message_id',
    [userId, content, conversationId],
  );
  return rows[0].message_id;
}

export async function createUser(name: string) {
  const { rows } = await db.query('INSERT INTO users (username) VALUES ($1) RETURNING user_id', [
    name,
  ]);
  return rows[0].user_id;
}

export async function getAllMessages() {
  const text =
    'SELECT message_id, content, created_at, u.user_id, username, c.conversation_id, is_private FROM users u JOIN messages m ON m.user_id = u.user_id JOIN conversations c ON m.conversation_id = c.conversation_id';
  const { rows } = await db.query(text);
  return rows.map(
    ({ message_id, content, created_at, user_id, username, conversation_id, is_private }) => {
      return {
        id: message_id,
        content,
        createdAt: created_at,
        user: {
          id: user_id,
          name: username,
        },
        conversation: {
          id: conversation_id,
          isPrivate: is_private,
        },
      };
    },
  );
}
