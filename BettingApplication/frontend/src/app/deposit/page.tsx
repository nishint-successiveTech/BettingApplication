"use client";

import { ApolloProvider } from "@apollo/client/react";
import client from "../../apollo/client";
import { Container } from "@mui/material";
import DepositForm from "@/components/deposit"; // make sure this component exists

export default function DepositPage() {
  return (
    <ApolloProvider client={client}>
      <Container maxWidth="sm" sx={{ mt: 5 }}>
      <DepositForm />
      </Container>
    </ApolloProvider>
  );
}
