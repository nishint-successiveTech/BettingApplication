"use client";

import { ApolloProvider } from "@apollo/client/react";
import client from "../../apollo/client"; // adjust path if needed
import { Container } from "@mui/material";
import TestPage from "@/components/test"; // the subscription component

export default function Page() {

  return (
    <ApolloProvider client={client}>
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <TestPage />
      </Container>
    </ApolloProvider>
  );
}
