"use client";

import { ApolloProvider } from "@apollo/client/react";
import client from "../../apollo/client";
import { Container } from "@mui/material";
import Deposit from "@/components/sendMoney"; // make sure this component exists

export default function DepositPage() {
  return (
    <ApolloProvider client={client}>
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Deposit />
      </Container>
    </ApolloProvider>
  );
}
