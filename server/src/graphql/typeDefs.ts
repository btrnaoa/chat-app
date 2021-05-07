import { gql } from 'apollo-server-express';

export default gql`
  input MessageInput {
    content: String!
    userId: ID!
    conversationId: ID!
  }

  type Conversation {
    id: ID!
    name: String
    messages: [Message!]
    users: [User!]
  }

  type Message {
    id: ID!
    content: String!
    createdAt: String!
    user: User!
  }

  type User {
    id: ID!
    name: String!
    isOnline: Boolean!
  }

  type Query {
    conversation(userId: ID!, conversationId: ID): Conversation
    conversations(userId: ID!): [Conversation!]
    usersOnline: [User!]
  }

  type Mutation {
    createConversation(userIds: [ID!]!): ID!
    createMessage(input: MessageInput!): ID!
    createUser(name: String!, conversationName: String!): ID!
  }

  type Subscription {
    newMessage(conversationId: ID!): Message!
  }
`;
