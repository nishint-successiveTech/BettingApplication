"use client";

import { ApolloProvider } from "@apollo/client/react";

import client from "../../apollo/client";
import { Container } from "@mui/material";
import Nishine from "@/components/nishint";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CricketMatchPage() {
  const searchParams = useSearchParams();
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    setUserEmail(storedEmail);
  }, []);

  const cricketMatchId =
    searchParams.get("matchId") || "dd22c69b-c4a0-451d-a9b4-273f9e25aae6";

  if (!userEmail) return <p>Loading user info...</p>;

  return (
    <ApolloProvider client={client}>
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Nishine
          cricketMatchId={cricketMatchId}
          userEmail={userEmail} 
        />
      </Container>
    </ApolloProvider>
  );
}
