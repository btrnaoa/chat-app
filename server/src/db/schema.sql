SET timezone TO 'UTC';

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(32)
);

CREATE TABLE messages (
  message_id SERIAL PRIMARY KEY,
  content TEXT,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  user_id INT REFERENCES users
);
