"use client";

import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { Box, Paper, Typography, CircularProgress, Alert } from "@mui/material";

interface HelloProps {
  matchId: string;
}

const GET_CRICKET_MATCH = gql`
  query CricketMatch($id: ID!) {
    cricketMatch(id: $id) {
      id
      dateTimeGMT
      matchType
      status
      ms
      t1
      t2
      t1s
      t2s
      t1img
      t2img
      series
    }
  }
`;

export default function Hello({ matchId }: HelloProps) {
  const { data, loading, error } = useQuery(GET_CRICKET_MATCH, {
    variables: { id: matchId },
  });

  const match = data?.cricketMatch;

  return (
    <Box
      sx={{
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={12}
        sx={{
          p: { xs: 4, md: 6 },
          borderRadius: "24px",
          maxWidth: 450,
          width: "100%",
          textAlign: "center",
          backdropFilter: "blur(15px)",
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.15)",
        }}
      >
        {loading && <CircularProgress />}
        {error && <Alert severity="error">{error.message}</Alert>}
        {match && (
          <>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
              {match.series}
            </Typography>
            <Typography variant="h6">
              {match.t1} vs {match.t2}
            </Typography>
            <Typography sx={{ mb: 1 }}>{match.matchType}</Typography>
            <Typography sx={{ mb: 1 }}>Status: {match.status}</Typography>
            <Typography sx={{ mb: 2 }}>
              Date: {new Date(match.dateTimeGMT).toLocaleString()}
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "center", gap: 3 }}>
              <Box>
                <img src={match.t1img} alt={match.t1} width={80} />
                <Typography>{match.t1s}</Typography>
              </Box>
              <Box>
                <img src={match.t2img} alt={match.t2} width={80} />
                <Typography>{match.t2s}</Typography>
              </Box>
            </Box>
          </>
        )}
      </Paper>
    </Box>
  );
}
