SET timezone TO 'UTC';

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(32) NOT NULL
);

CREATE TABLE conversations (
  conversation_id SERIAL PRIMARY KEY,
  is_private BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE messages (
  message_id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  user_id INT NOT NULL REFERENCES users,
  conversation_id INT NOT NULL REFERENCES conversations
);
