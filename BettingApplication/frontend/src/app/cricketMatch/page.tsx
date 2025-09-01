"use client";

import { ApolloProvider } from "@apollo/client/react";
import client from "../../apollo/client";
import { Container, CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CricketMatches from "@/components/cricketMatch";

const theme = createTheme(); 

export default function CricketMatchesPage() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* 👈 optional, global reset */}
        <Container maxWidth="lg" sx={{ mt: 5 }}>
          <CricketMatches />
        </Container>
      </ThemeProvider>
    </ApolloProvider>
  );
}
