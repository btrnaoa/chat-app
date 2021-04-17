import { gql } from 'apollo-server-express';

export default gql`
  type Channel {
    id: ID!
    name: String!
    conversation: Conversation!
  }

  type Conversation {
    id: ID!
    messages: [Message!]
    users: [User!]
  }

  type Message {
    id: ID!
    content: String!
    createdAt: String!
    user: User!
    conversation: Conversation!
  }

  type User {
    id: ID!
    name: String!
    messages: [Message!]
    conversations: [Conversation!]
  }

  type Query {
    channels: [Channel!]
    conversation(conversationId: ID!): Conversation
  }

  type Mutation {
    createConversation(userId: ID!): ID!
    createMessage(conversationId: ID!, userId: ID!, content: String!): ID!
    createUser(name: String!): User!
  }

  type Subscription {
    newMessage(conversationId: ID!): Message!
  }
`;
