import { gql } from "apollo-server-express";

export const typeDefs = gql`
  # User type
  type User {
    id: ID!
    name: String!
    email: String!
    phoneNumber: String!
  }

  # Auth payload for login
  type AuthPayload {
    token: String!
    user: User!
  }

  # Match type
  type Match {
    id: ID!
    teamA: String!
    teamB: String!
    scoreA: Int
    scoreB: Int
    status: String
    startTime: String
  }

  # Player type
  type Player {
    id: ID!
    name: String!
    role: String!
    team: String!
    odds: Float!
  }

  # Queries
  type Query {
    matches: [Match]          # All matches
    match(id: ID!): Match     # Single match
    players: [Player]         # All players
  }

  # Mutations
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
