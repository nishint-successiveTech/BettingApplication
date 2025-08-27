"use client";

import { ApolloProvider } from "@apollo/client/react";
import client from "../../apollo/client";
import { Container } from "@mui/material";
import Withdraw from "@/components/withdraw"
export default function WithdrawPage() {
  return (
    <ApolloProvider client={client}>
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Withdraw />
      </Container>
    </ApolloProvider>
  );
}
