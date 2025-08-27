"use client";

import { ApolloProvider } from "@apollo/client/react";
import client from "../../apollo/client";
import { Container } from "@mui/material";
import Wallet from "@/components/wallet";

export default function WalletPage() {
  return (
    <ApolloProvider client={client}>
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Wallet />
      </Container>
    </ApolloProvider>
  );
}
