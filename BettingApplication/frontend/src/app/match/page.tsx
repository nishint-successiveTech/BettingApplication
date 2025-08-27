"use client";

import { ApolloProvider } from "@apollo/client/react";
import client from "../../apollo/client";
import { Container } from "@mui/material";
import MatchesComponent from "@/components/match";

export default function MatchesPage() {
  return (
    <ApolloProvider client={client}>
      <Container maxWidth="lg" sx={{ mt: 5 }}>
        <MatchesComponent />
      </Container>
    </ApolloProvider>
  );
}
