"use client";

import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { LOGIN_USER } from "../graphql/mutations";
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

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const [loginUser, { loading }] = useMutation(LOGIN_USER);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const { data } = await loginUser({
        variables: { email, password },
      });

      if (data?.loginUser?.token) {
        // token save
        localStorage.setItem("token", data.loginUser.token);

        setEmail("");
        setPassword("");

        setSuccess("✅ Logged in successfully!");
        setTimeout(() => setSuccess(null), 3000);
        setTimeout(() => router.push("/match"), 1000);
      }
    } catch (err: any) {
      setError(err.message || "Login failed");
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
        background: "radial-gradient(circle at top, #0f2027, #203a43, #2c5364)",
        overflow: "auto",
        p: 2,
      }}
    >
      <Paper
        elevation={24}
        sx={{
          p: { xs: 4, md: 6 },
          borderRadius: "28px",
          backdropFilter: "blur(15px)",
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.15)",
          maxWidth: 500,
          width: "100%",
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
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            fontWeight: "bold",
            background:
              "linear-gradient(90deg, #00f5ff, #ff00d4, #00f5ff, #ff00d4)",
            backgroundSize: "300% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 0 20px rgba(0,255,200,0.6)",
          }}
        >
          Login
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2, borderRadius: "12px" }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 2, borderRadius: "12px" }}>
            {success}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 3 }}
        >
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
