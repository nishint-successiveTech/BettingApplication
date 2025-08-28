// import { gql } from "apollo-server-express";

// export const typeDefs = gql`
//   # -------------------------------
//   # User type
//   # -------------------------------
//   type User {
//     id: ID!
//     name: String!
//     email: String!
//     phoneNumber: String!
//     money: Int!
//   }

//    type WalletResponse {
//     email: String!
//     balance: Int!
//     deposited: Int
//     withdrawn: Int
//   }

//   # Auth payload for login
//   type AuthPayload {
//     token: String!
//     user: User!
//   }

//   # -------------------------------
//   # REST Match type
//   # -------------------------------
//   type Match {
//     id: String!
//     teamA: String!
//     teamB: String!
//     scoreA: Int
//     scoreB: Int
//     status: String
//     startTime: String
//   }

//   # -------------------------------
//   # Player type
//   # -------------------------------
//   type Player {
//     id: ID!
//     name: String!
//     role: String!
//     team: String!
//     odds: Float!
//   }

//   # -------------------------------
//   # Cricket Match type
//   # -------------------------------
//   type CricketMatch {
//     id: String!
//     dateTimeGMT: String!
//     matchType: String!
//     status: String!
//     ms: String!
//     t1: String!
//     t2: String!
//     t1s: String
//     t2s: String
//     t1img: String
//     t2img: String
//     series: String!
//   }

//   # Delete response type
//   type DeleteResponse {
//     message: String!
//   }
//   type UserMoney {
//     email: String!
//     money: Int!
//   }

//   # -------------------------------
//   # Queries
//   # -------------------------------
//   type Query {
//     # REST Matches
//     matches: [Match]
//     match(id: String!): Match

//     # Players
//     players: [Player]

//     # Cricket Matches
//     cricketMatches: [CricketMatch!]!
//     cricketMatch(id: String!): CricketMatch

//     # User Money Query
//     getUserMoney(email: String!): UserMoney!

//   }

//   # -------------------------------
//   # Input types
//   # -------------------------------
//   input UpdateCricketMatchInput {
//     dateTimeGMT: String
//     matchType: String
//     status: String
//     ms: String
//     t1: String
//     t2: String
//     t1s: String
//     t2s: String
//     t1img: String
//     t2img: String
//     series: String
//   }

//   # -------------------------------
//   # Mutations
//   # -------------------------------
//   type Mutation {
//     # User Mutations
//     createUser(
//       name: String!
//       email: String!
//       phoneNumber: String!
//       password: String!
//     ): User

//     loginUser(email: String!, password: String!): AuthPayload

//     # CricketMatch Mutations
//     createCricketMatch(
//       id: ID!
//       dateTimeGMT: String!
//       matchType: String!
//       status: String!
//       ms: String!
//       t1: String!
//       t2: String!
//       t1s: String
//       t2s: String
//       t1img: String
//       t2img: String
//       series: String!
//     ): CricketMatch!

//     updateCricketMatch(
//       id: ID!
//       updateData: UpdateCricketMatchInput!
//     ): CricketMatch!

//     deleteCricketMatch(id: ID!): DeleteResponse!

//      depositMoney(email: String!, amount: Int!): WalletResponse
//     withdrawMoney(email: String!, amount: Int!): WalletResponse
//   }
// `;

import { gql } from "apollo-server-express";

export const typeDefs = gql`
  # -------------------------------
  # User type
  # -------------------------------
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

  # Auth payload for login
  type AuthPayload {
    token: String!
    user: User!
  }

  # -------------------------------
  # REST Match type
  # -------------------------------
  type Match {
    id: String!
    teamA: String!
    teamB: String!
    scoreA: Int
    scoreB: Int
    status: String
    startTime: String
  }

  # -------------------------------
  # Player type
  # -------------------------------
  type Player {
    id: ID!
    name: String!
    role: String!
    team: String!
    odds: Float!
  }

  # -------------------------------
  # Cricket Match type
  # -------------------------------
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

  # Delete response type
  type DeleteResponse {
    message: String!
  }

  type UserMoney {
    email: String!
    money: Int!
  }

  # -------------------------------
  # NEW: Bet type
  # -------------------------------
  type Bet {
    id: ID!
    userEmail: String!
    matchId: String!
    team: String!
    amount: Int!
    createdAt: String!
  }

  # -------------------------------
  # Queries
  # -------------------------------
  type Query {
    # REST Matches
    matches: [Match]
    match(id: String!): Match

    # Players
    players: [Player]

    # Cricket Matches
    cricketMatches: [CricketMatch!]!
    cricketMatch(id: String!): CricketMatch

    # User Money Query
    getUserMoney(email: String!): UserMoney!
  }

  # -------------------------------
  # Input types
  # -------------------------------
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

  # -------------------------------
  # Mutations
  # -------------------------------
  type Mutation {
    # User Mutations
    createUser(
      name: String!
      email: String!
      phoneNumber: String!
      password: String!
    ): User

    loginUser(email: String!, password: String!): AuthPayload

    # CricketMatch Mutations
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
