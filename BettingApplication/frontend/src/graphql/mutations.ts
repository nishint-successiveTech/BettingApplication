import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation createUser(
    $name: String!
    $email: String!
    $phoneNumber: String!
    $password: String!
  ) {
    createUser(
      name: $name
      email: $email
      phoneNumber: $phoneNumber
      password: $password
    ) {
      id
      name
      email
      phoneNumber
    }
  }
`;

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        id
        name
        email
        phoneNumber
      }
    }
  }
`;

export const GET_MATCHES = gql`
  query GetMatches {
    matches {
      id
      teamA
      teamB
      scoreA
      scoreB
      status
      startTime
    }
  }
`;

export const GET_MATCH = gql`
  query GetMatch($id: ID!) {
    match(id: $id) {
      id
      teamA
      teamB
      scoreA
      scoreB
      status
      startTime
    }
  }
`;

export const GET_CRICKET_MATCHES = gql`
  query GetCricketMatches {
    cricketMatches {
      id
      dateTimeGMT
      matchType
      status
      ms
      t1
      t2
      t1s
      t2s
      t1img
      t2img
      series
    }
  }
`;

export const GET_CRICKET_MATCH = gql`
  query CricketMatches($cricketMatchId: String!) {
    cricketMatch(id: $cricketMatchId) {
      matchType
      id
      dateTimeGMT
      ms
      series
      status
      t1
      t1img
      t1s
      t2
      t2img
      t2s
    }
  }
`;

export const GET_USER_MONEY = gql`
  query GetUserMoney($email: String!) {
    getUserMoney(email: $email) {
      email
      money
    }
  }
`;

export const CREATE_CRICKET_MATCH = gql`
  mutation CreateCricketMatch(
    $id: ID!
    $dateTimeGMT: String!
    $matchType: String!
    $status: String!
    $ms: String!
    $t1: String!
    $t2: String!
    $t1s: String
    $t2s: String
    $t1img: String
    $t2img: String
    $series: String!
  ) {
    createCricketMatch(
      id: $id
      dateTimeGMT: $dateTimeGMT
      matchType: $matchType
      status: $status
      ms: $ms
      t1: $t1
      t2: $t2
      t1s: $t1s
      t2s: $t2s
      t1img: $t1img
      t2img: $t2img
      series: $series
    ) {
      id
      series
    }
  }
`;

export const UPDATE_CRICKET_MATCH = gql`
  mutation UpdateCricketMatch($id: ID!, $updateData: UpdateCricketMatchInput!) {
    updateCricketMatch(id: $id, updateData: $updateData) {
      id
      series
      t1
      t2
      status
      t1s
      t2s
    }
  }
`;

export const DELETE_CRICKET_MATCH = gql`
  mutation DeleteCricketMatch($id: ID!) {
    deleteCricketMatch(id: $id) {
      message
    }
  }
`;

export const DEPOSIT_MONEY = gql`
  mutation DepositMoney($email: String!, $amount: Float!) {
    depositMoney(email: $email, amount: $amount) {
      email
      balance
      deposited
    }
  }
`;

export const WITHDRAW_MONEY = gql`
  mutation WithdrawMoney($email: String!, $amount: Float!) {
    withdrawMoney(email: $email, amount: $amount) {
      email
      balance
      withdrawn
    }
  }
`;
