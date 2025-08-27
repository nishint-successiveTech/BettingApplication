"use client";

import { ApolloProvider } from "@apollo/client/react";
import client from "../../apollo/client";
import { Container } from "@mui/material";
import PlayersList from "@/components/player";

export default function PlayersPage() {
  return (
    <ApolloProvider client={client}>
      <Container maxWidth="lg" sx={{ mt: 5 }}>
        <PlayersList />
      </Container>
    </ApolloProvider>
  );
}
