import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    phoneNumber: String!
  }

  type Query {
    users: [User]
    user(id: ID!): User
  }

  type Mutation {
    createUser(
      name: String!
      email: String!
      phoneNumber: String!
      password: String!
    ): User
  }
`;
