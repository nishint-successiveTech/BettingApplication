"use client";

import { gql } from "@apollo/client";
import { useSubscription } from "@apollo/client/react";

// Subscription to listen for withdrawals
const WITHDRAWAL_SUBSCRIPTION = gql`
  subscription OnWithdrawalOccurred {
    withdrawalOccurred {
      email
      withdrawn
      balance
    }
  }
`;

export default function Withdrawals() {
  // Listen for subscription updates
  const { data, loading, error } = useSubscription(WITHDRAWAL_SUBSCRIPTION);

  return (
    <div style={{ padding: 20 }}>
      <h2>Latest Bet Placed</h2>

      {loading && <p>Waiting for bet placed events...</p>}
      {error && <p>Error: {error.message}</p>}

      {data?.withdrawalOccurred ? (
        <div
          style={{
            marginTop: 10,
            padding: 10,
            border: "1px solid #ccc",
            borderRadius: 5,
          }}
        >
          <p>
            <strong>Username:</strong> {data.withdrawalOccurred.email}
          </p>
          <p>
            <strong>Has Placed :</strong> {data.withdrawalOccurred.withdrawn}{" "}
            Bet Right Now on a cricket match
          </p>
        </div>
      ) : (
        <p>No Bet Placed yet.</p>
      )}
    </div>
  );
}
