"use client";

import { ApolloProvider } from "@apollo/client/react";
import client from "../../apollo/client";
import { Container } from "@mui/material";
import CricketMatches from "@/components/cricketMatch";

export default function CricketMatchesPage() {
  return (
    <ApolloProvider client={client}>
      <Container maxWidth="lg" sx={{ mt: 5 }}>
        <CricketMatches />
      </Container>
    </ApolloProvider>
  );
}
