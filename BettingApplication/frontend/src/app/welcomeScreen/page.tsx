
"use client";

import { ApolloProvider } from "@apollo/client/react";
import client from "../../apollo/client";
import { Container } from "@mui/material";
import WelcomePage from "@/components/welcomeScreen";

export default function Welcome() {
  return (
    <ApolloProvider client={client}>
      <Container maxWidth="lg" sx={{ mt: 3 }}>
        <WelcomePage />
      </Container>
    </ApolloProvider>
  );
}
