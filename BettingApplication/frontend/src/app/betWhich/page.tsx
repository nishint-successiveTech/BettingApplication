"use client";

import { ApolloProvider } from "@apollo/client/react";
import client from "../../apollo/client";
import { Container } from "@mui/material";
import Checker from "@/components/betWhich" // make sure this path is correct

export default function CheckerPage() {
  return (
    <ApolloProvider client={client}>
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Checker />
      </Container>
    </ApolloProvider>
  );
}
