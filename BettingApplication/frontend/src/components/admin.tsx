"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import { motion } from "framer-motion";
import { EmojiEvents } from "@mui/icons-material";

export default function AdminPage() {
  const [matchId, setMatchId] = useState("");
  const [teamId, setTeamId] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error" | "info">(
    "info"
  );
  const router = useRouter();

  const handleDeclareWinner = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!matchId || !teamId) {
      setMessage("Please enter both Match ID and Team ID");
      setMessageType("error");
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("http://localhost:8787/api/confirmBet/winner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ matchId, teamId }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to declare winner");

      setMessage("🎉 Winner declared successfully!");
      setMessageType("success");
      setMatchId("");
      setTeamId("");
    } catch (err: any) {
      setMessage(`❌ Error: ${err.message}`);
      setMessageType("error");
    } finally {
      setLoading(false);
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
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(circle at top, #141e30, #243b55)",
        overflow: "auto",
        p: 2,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ width: "100%", maxWidth: 550 }}
      >
        <Paper
          elevation={24}
          sx={{
            p: { xs: 4, md: 6 },
            borderRadius: "28px",
            backdropFilter: "blur(15px)",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.2)",
            color: "#fff",
            boxShadow:
              "0 0 25px rgba(0, 255, 200, 0.3), 0 0 60px rgba(255,0,150,0.25)",
            animation: "fadeIn 1.5s ease",
            "@keyframes fadeIn": {
              from: { opacity: 0, transform: "translateY(30px)" },
              to: { opacity: 1, transform: "translateY(0)" },
            },
          }}
        >
          <Box textAlign="center" mb={4}>
            <EmojiEvents sx={{ fontSize: 60, color: "#FFD700" }} />
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                mt: 2,
                background:
                  "linear-gradient(90deg, #00f5ff, #ff00d4, #00f5ff, #ff00d4)",
                backgroundSize: "300% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 0 20px rgba(0,255,200,0.6)",
              }}
            >
              Admin Dashboard
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ color: "rgba(255,255,255,0.7)", mt: 1 }}
            >
              Declare the winner for a cricket match
            </Typography>
          </Box>

          {message && (
            <Alert
              severity={messageType}
              sx={{
                mb: 3,
                borderRadius: "12px",
                fontWeight: "bold",
                fontSize: "1rem",
              }}
            >
              {message}
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={handleDeclareWinner}
            noValidate
            sx={{ display: "flex", flexDirection: "column", gap: 3 }}
          >
            <TextField
              label="Match ID"
              value={matchId}
              onChange={(e) => setMatchId(e.target.value)}
              required
              fullWidth
              sx={{
                input: { color: "#fff" },
                label: { color: "rgba(255,255,255,0.7)" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "rgba(255,255,255,0.4)" },
                  "&:hover fieldset": { borderColor: "#00f5ff" },
                  "&.Mui-focused fieldset": {
                    borderColor: "#ff00d4",
                    boxShadow: "0 0 12px rgba(255,0,212,0.6)",
                  },
                },
              }}
            />

            <TextField
              label="Team ID"
              value={teamId}
              onChange={(e) => setTeamId(e.target.value)}
              required
              fullWidth
              sx={{
                input: { color: "#fff" },
                label: { color: "rgba(255,255,255,0.7)" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "rgba(255,255,255,0.4)" },
                  "&:hover fieldset": { borderColor: "#00f5ff" },
                  "&.Mui-focused fieldset": {
                    borderColor: "#ff00d4",
                    boxShadow: "0 0 12px rgba(255,0,212,0.6)",
                  },
                },
              }}
            />

            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                py: 1.5,
                borderRadius: "50px",
                fontSize: "1.1rem",
                fontWeight: "bold",
                background: "linear-gradient(90deg, #00f5ff, #ff00d4)",
                backgroundSize: "200% auto",
                boxShadow: "0px 0px 20px rgba(255,0,212,0.5)",
                transition: "all 0.3s ease",
                "&:hover": {
                  background: "linear-gradient(90deg, #ff00d4, #00f5ff)",
                  transform: "scale(1.05)",
                  boxShadow: "0px 0px 35px rgba(0,255,255,0.8)",
                },
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Declare Winner"
              )}
            </Button>
          </Box>
        </Paper>
      </motion.div>
    </Box>
  );
}
