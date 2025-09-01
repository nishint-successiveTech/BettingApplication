"use client";

import { useQuery } from "@apollo/client/react";
import { GET_MATCHES } from "../graphql/mutations";

import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Chip,
  alpha,
  keyframes,
} from "@mui/material";
import { useRouter } from "next/navigation";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import ScheduleIcon from "@mui/icons-material/Schedule";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

interface Match {
  id: string;
  teamA: string;
  teamB: string;
  scoreA?: number;
  scoreB?: number;
  status: string;
  startTime: string;
}

interface MatchesData {
  matches: Match[];
}

// Gradient animation
const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Card hover float animation
const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
  100% { transform: translateY(0px); }
`;

export default function MatchesComponent() {
  const { data, loading, error } = useQuery<MatchesData>(GET_MATCHES);
  const router = useRouter();

  if (loading)
    return (
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background:
            "linear-gradient(-45deg, #0f2027, #203a43, #2c5364, #0f2027)",
          backgroundSize: "400% 400%",
          animation: `${gradientAnimation} 15s ease infinite`,
        }}
      >
        <CircularProgress size={60} thickness={4} sx={{ color: "#00f5ff" }} />
      </Box>
    );

  if (error)
    return (
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background:
            "linear-gradient(-45deg, #0f2027, #203a43, #2c5364, #0f2027)",
          backgroundSize: "400% 400%",
          animation: `${gradientAnimation} 15s ease infinite`,
        }}
      >
        <Typography color="error" variant="h6">
          Error fetching matches: {error.message}
        </Typography>
      </Box>
    );

  const handleMatchClick = (_matchId: string) => {
    router.push("/players"); // Navigate to players page
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "live":
        return "#ff4757";
      case "upcoming":
        return "#2ed573";
      case "completed":
        return "#576574";
      default:
        return "#a4b0be";
    }
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        overflowY: "auto",
        background:
          "linear-gradient(-45deg, #0f2027, #203a43, #2c5364, #0f2027)",
        backgroundSize: "400% 400%",
        animation: `${gradientAnimation} 15s ease infinite`,
        p: 4,
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      <Box sx={{ textAlign: "center", mb: 2 }}>
        <EmojiEventsIcon sx={{ fontSize: 50, color: "#FFD700", mb: 1 }} />
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            background: "linear-gradient(90deg, #00f5ff, #ff00d4, #00f5ff)",
            backgroundSize: "300% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          LIVE MATCHES
        </Typography>
      </Box>

      {data?.matches?.map((match) => (
        <Card
          key={match.id}
          onClick={() => handleMatchClick(match.id)}
          sx={{
            background: "rgba(255,255,255,0.1)",
            backdropFilter: "blur(10px)",
            borderRadius: 3,
            color: "#fff",
            cursor: "pointer",
            transition: "0.3s",
            "&:hover": {
              animation: `${floatAnimation} 2s ease infinite`,
              transform: "translateY(-5px)",
            },
          }}
        >
          <CardContent>
            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
              <Chip
                label={match.status.toUpperCase()}
                size="small"
                sx={{
                  backgroundColor: getStatusColor(match.status),
                  color: "white",
                  fontWeight: "bold",
                }}
              />
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h6">
                {match.teamA} vs {match.teamB}
              </Typography>
              <Typography variant="h5" sx={{ mt: 1 }}>
                {match.scoreA ?? 0} : {match.scoreB ?? 0}
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
                <ScheduleIcon
                  sx={{ fontSize: 18, mr: 1, color: alpha("#fff", 0.7) }}
                />
                <Typography variant="body2">
                  {new Date(match.startTime).toLocaleString()}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      ))}

      {data?.matches?.length === 0 && (
        <Typography sx={{ color: "white", textAlign: "center", mt: 4 }}>
          No matches available
        </Typography>
      )}
    </Box>
  );
}
