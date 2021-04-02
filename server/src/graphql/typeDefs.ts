import { gql } from 'apollo-server-core';

export default gql`
  type User {
    id: ID!
    name: String!
  }

  type Message {
    id: ID!
    content: String!
    createdAt: String!
    user: User!
  }

  type Query {
    messages: [Message!]
  }

  type Mutation {
    createMessage(userId: ID!, content: String!): ID!
    createUser(name: String!): ID!
  }

  type Subscription {
    messages: [Message!]
  }
`;
