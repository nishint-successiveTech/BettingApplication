// import { gql } from "@apollo/client";

// export const CREATE_USER = gql`
//   mutation createUser(
//     $name: String!
//     $email: String!
//     $phoneNumber: String!
//     $password: String!
//   ) {
//     createUser(
//       name: $name
//       email: $email
//       phoneNumber: $phoneNumber
//       password: $password
//     ) {
//       id
//       name
//       email
//       phoneNumber
//     }
//   }
// `;

// export const LOGIN_USER = gql`
//   mutation loginUser($email: String!, $password: String!) {
//     loginUser(email: $email, password: $password) {
//       token
//       user {
//         id
//         name
//         email
//         phoneNumber
//       }
//     }
//   }
// `;

import { gql } from "@apollo/client";

// --- User Mutations ---
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

// --- Matches Queries ---
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

