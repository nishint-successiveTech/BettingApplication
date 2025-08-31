import { gql } from "@apollo/client";

export const WITHDRAWAL_SUBSCRIPTION = gql`
  subscription WithdrawalOccurred {
    withdrawalOccurred {
      email
      balance
      withdrawn
    }
  }
`;
