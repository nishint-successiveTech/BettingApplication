"use client";

import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client/react";
import { gql } from "@apollo/client";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";

// GraphQL mutation
const WITHDRAW_MONEY = gql`
  mutation WithdrawMoney($email: String!, $amount: Int!) {
    withdrawMoney(email: $email, amount: $amount) {
      balance
      email
      withdrawn
    }
  }
`;

export default function Withdraw() {
  const [amount, setAmount] = useState<number | "">("");
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  const [withdrawMoney, { loading }] = useMutation(WITHDRAW_MONEY);

  // Client-side localStorage
  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    setEmail(storedEmail);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!email) {
      setError("User email not found. Please login again.");
      return;
    }

    const numericAmount = parseInt(amount.toString());
    if (!amount || numericAmount <= 0 || isNaN(numericAmount)) {
      setError("Please enter a valid amount");
      return;
    }

    try {
      const { data } = await withdrawMoney({
        variables: {
          email,
          amount: numericAmount,
        },
      });

      console.log("Withdraw response:", data);

      setSuccess(
        `✅ Withdrawn ₹${numericAmount} successfully! New balance: ₹${data?.withdrawMoney?.balance}`
      );
      setAmount("");
    } catch (err: any) {
      console.error("Withdraw error:", err);
      setError(err.message || "Withdrawal failed");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "radial-gradient(circle at top, #0f2027, #203a43, #2c5364)",
        p: 2,
      }}
    >
      <Paper
        elevation={24}
        sx={{
          p: { xs: 4, md: 6 },
          borderRadius: "28px",
          maxWidth: 400,
          width: "100%",
          textAlign: "center",
          color: "#fff",
          backdropFilter: "blur(15px)",
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.15)",
        }}
      >
        <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
          Withdraw Money
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Amount"
            type="number"
            value={amount}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              setAmount(isNaN(value) ? "" : value);
            }}
            fullWidth
            required
            sx={{
              mb: 3,
              input: { color: "#fff" },
              label: { color: "rgba(255,255,255,0.7)" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "rgba(255,255,255,0.4)" },
                "&:hover fieldset": { borderColor: "#00f5ff" },
                "&.Mui-focused fieldset": { borderColor: "#ff00d4" },
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            fullWidth
            sx={{
              py: 1.5,
              fontWeight: "bold",
              borderRadius: "50px",
              background: "linear-gradient(90deg, #00f5ff, #ff00d4)",
              "&:hover": { background: "linear-gradient(90deg, #ff00d4, #00f5ff)" },
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Withdraw"}
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
