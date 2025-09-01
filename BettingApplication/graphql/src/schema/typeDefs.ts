import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    phoneNumber: String!
    money: Int!
  }

  type WalletResponse {
    email: String!
    balance: Int!
    deposited: Int
    withdrawn: Int
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Match {
    id: String!
    teamA: String!
    teamB: String!
    scoreA: Int
    scoreB: Int
    status: String
    startTime: String
  }

  type Player {
    id: ID!
    name: String!
    role: String!
    team: String!
    odds: Float!
  }

  type CricketMatch {
    id: String!
    dateTimeGMT: String!
    matchType: String!
    status: String!
    ms: String!
    t1: String!
    t2: String!
    t1s: String
    t2s: String
    t1img: String
    t2img: String
    series: String!
  }

  type DeleteResponse {
    message: String!
  }

  type UserMoney {
    email: String!
    money: Int!
  }

  type Bet {
    id: ID!
    userEmail: String!
    matchId: String!
    team: String!
    amount: Int!
    createdAt: String!
  }

  type Query {
    matches: [Match]
    match(id: String!): Match

    players: [Player]

    cricketMatches: [CricketMatch!]!
    cricketMatch(id: String!): CricketMatch

    getUserMoney(email: String!): UserMoney!
  }

  input UpdateCricketMatchInput {
    dateTimeGMT: String
    matchType: String
    status: String
    ms: String
    t1: String
    t2: String
    t1s: String
    t2s: String
    t1img: String
    t2img: String
    series: String
  }

  type Mutation {
    createUser(
      name: String!
      email: String!
      phoneNumber: String!
      password: String!
    ): User

    loginUser(email: String!, password: String!): AuthPayload

    createCricketMatch(
      id: ID!
      dateTimeGMT: String!
      matchType: String!
      status: String!
      ms: String!
      t1: String!
      t2: String!
      t1s: String
      t2s: String
      t1img: String
      t2img: String
      series: String!
    ): CricketMatch!

    updateCricketMatch(
      id: ID!
      updateData: UpdateCricketMatchInput!
    ): CricketMatch!

    deleteCricketMatch(id: ID!): DeleteResponse!

    depositMoney(email: String!, amount: Int!): WalletResponse
    withdrawMoney(email: String!, amount: Int!): WalletResponse
  }

  type Subscription {
    withdrawalOccurred: WalletResponse!
  }
`;
