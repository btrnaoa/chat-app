import { gql } from 'apollo-server-express';

export default gql`
  type User {
    id: ID!
    name: String!
    messages: [Message!]
    conversations: [Conversation!]
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

  type Query {
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
