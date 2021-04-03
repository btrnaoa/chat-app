import { gql } from 'apollo-server-core';

export default gql`
  type User {
    id: ID!
    name: String!
  }

  type Conversation {
    id: ID!
    isPrivate: Boolean!
  }

  type Message {
    id: ID!
    content: String!
    createdAt: String!
    user: User!
    conversation: Conversation!
  }

  type Query {
    messages: [Message!]
  }

  type Mutation {
    createConversation(isPrivate: Boolean = false): ID!
    createMessage(userId: ID!, content: String!, conversationId: ID!): ID!
    createUser(name: String!): ID!
  }

  type Subscription {
    messages: [Message!]
  }
`;
