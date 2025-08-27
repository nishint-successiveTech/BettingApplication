"use client";

import { ApolloProvider } from "@apollo/client/react";
import client from "../../apollo/client";
import { Container } from "@mui/material";
import LoginForm from "@/components/userLogin";

export default function LoginPage() {
  return (
    <ApolloProvider client={client}>
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <LoginForm />
      </Container>
    </ApolloProvider>
  );
}
