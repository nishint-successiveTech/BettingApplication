"use client";

import { ApolloProvider } from "@apollo/client/react";
import client from "../../apollo/client";
import { Container } from "@mui/material";
import AdminDeclareWinner from "@/components/admin";

export default function AdminPage() {
  return (
    <ApolloProvider client={client}>
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <AdminDeclareWinner />
      </Container>
    </ApolloProvider>
  );
}
