// import { gql } from "apollo-server-express";

// export const typeDefs = gql`
//   type User {
//     id: ID!
//     name: String!
//     email: String!
//     phoneNumber: String!
//   }

//   type Query {
//     users: [User]
//     user(id: ID!): User
//   }

//   type Mutation {
//     createUser(
//       name: String!
//       email: String!
//       phoneNumber: String!
//       password: String!
//     ): User
//   }
// `;
import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    phoneNumber: String!
  }

  type AuthPayload {
    token: String!
    user: User!
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

    loginUser(email: String!, password: String!): AuthPayload
  }
`;
