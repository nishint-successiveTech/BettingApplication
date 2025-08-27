"use client";

import { ApolloProvider } from "@apollo/client/react";
import client from "../../apollo/client";
import { Container } from "@mui/material";
import UserForm from "@/components/userRegister";

export default function RegisterPage() {
  return (
    <ApolloProvider client={client}>
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <UserForm />
      </Container>
    </ApolloProvider>
  );
}
