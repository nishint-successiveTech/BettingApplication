"use client";

import React from "react";
import { ApolloProvider } from "@apollo/client/react";
import client from "../../apollo/client"; 
import { Container } from "@mui/material";
import Hello from "@/components/hello"; 

export default function Page() {
  const matchId = "dd22c69b-c4a0-451d-a9b4-273f9e25aae6"; 

  return (
    <ApolloProvider client={client}>
      <Container
        maxWidth="sm"
        sx={{
          mt: 5,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Hello matchId={matchId} />
      </Container>
    </ApolloProvider>
  );
}
