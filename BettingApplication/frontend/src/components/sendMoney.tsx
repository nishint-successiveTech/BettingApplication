// "use client";

// import { useState } from "react";
// import { gql } from "@apollo/client"
// import { useMutation,} from "@apollo/client/react";
// import {
//   Box,
//   Paper,
//   Typography,
//   TextField,
//   Button,
//   CircularProgress,
//   Alert,
// } from "@mui/material";

// // GraphQL mutation
// const DEPOSIT_MONEY = gql`
//   mutation DepositMoney($email: String!, $amount: Int!) {
//     depositMoney(email: $email, amount: $amount) {
//       balance
//       deposited
//       email
//     }
//   }
// `;

// export default function Deposit() {
//   const [amount, setAmount] = useState<number | "">("");
//   const [email, setEmail] = useState<string>("");
//   const [success, setSuccess] = useState<string | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   const [depositMoney, { loading }] = useMutation(DEPOSIT_MONEY);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);
//     setSuccess(null);

//     if (!email) {
//       setError("Please enter your email");
//       return;
//     }

//     const numericAmount = parseInt(amount.toString());
//     if (!amount || numericAmount <= 0 || isNaN(numericAmount)) {
//       setError("Please enter a valid amount");
//       return;
//     }

//     try {
//       const { data } = await depositMoney({
//         variables: { email, amount: numericAmount },
//       });

//       setSuccess(
//         `✅ Deposited ₹${numericAmount} successfully!}`
//       );
//       setAmount("");
//       setEmail("");
//     } catch (err: any) {
//       setError(err.message || "Deposit failed");
//     }
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         background: "radial-gradient(circle at top, #0f2027, #203a43, #2c5364)",
//         p: 2,
//       }}
//     >
//       <Paper
//         elevation={24}
//         sx={{
//           p: { xs: 4, md: 6 },
//           borderRadius: "28px",
//           maxWidth: 400,
//           width: "100%",
//           textAlign: "center",
//           color: "#fff",
//           backdropFilter: "blur(15px)",
//           background: "rgba(255,255,255,0.05)",
//           border: "1px solid rgba(255,255,255,0.15)",
//         }}
//       >
//         <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
//           Deposit Money
//         </Typography>

//         {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
//         {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

//         <form onSubmit={handleSubmit}>
//           {/* Email input */}
//           <TextField
//             label="Email"
//             type="text"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             fullWidth
//             required
//             sx={{
//               mb: 3,
//               input: { color: "#fff" },
//               label: { color: "rgba(255,255,255,0.7)" },
//               "& .MuiOutlinedInput-root": {
//                 "& fieldset": { borderColor: "rgba(255,255,255,0.4)" },
//                 "&:hover fieldset": { borderColor: "#00f5ff" },
//                 "&.Mui-focused fieldset": { borderColor: "#ff00d4" },
//               },
//             }}
//           />

//           {/* Amount input */}
//           <TextField
//             label="Amount"
//             type="number"
//             value={amount}
//             onChange={(e) => {
//               const value = parseInt(e.target.value);
//               setAmount(isNaN(value) ? "" : value);
//             }}
//             fullWidth
//             required
//             sx={{
//               mb: 3,
//               input: { color: "#fff" },
//               label: { color: "rgba(255,255,255,0.7)" },
//               "& .MuiOutlinedInput-root": {
//                 "& fieldset": { borderColor: "rgba(255,255,255,0.4)" },
//                 "&:hover fieldset": { borderColor: "#00f5ff" },
//                 "&.Mui-focused fieldset": { borderColor: "#ff00d4" },
//               },
//             }}
//           />

//           <Button
//             type="submit"
//             variant="contained"
//             disabled={loading}
//             fullWidth
//             sx={{
//               py: 1.5,
//               fontWeight: "bold",
//               borderRadius: "50px",
//               background: "linear-gradient(90deg, #00f5ff, #ff00d4)",
//               "&:hover": { background: "linear-gradient(90deg, #ff00d4, #00f5ff)" },
//             }}
//           >
//             {loading ? <CircularProgress size={24} color="inherit" /> : "Deposit"}
//           </Button>
//         </form>
//       </Paper>
//     </Box>
//   );
// }

// "use client";

// import { useState } from "react";
// import { gql,} from "@apollo/client";
// import { useMutation } from "@apollo/client/react"
// import {
//   Box,
//   Paper,
//   Typography,
//   TextField,
//   Button,
//   CircularProgress,
//   Alert,
// } from "@mui/material";

// // GraphQL mutations
// const DEPOSIT_MONEY = gql`
//   mutation DepositMoney($email: String!, $amount: Int!) {
//     depositMoney(email: $email, amount: $amount) {
//       balance
//       deposited
//       email
//     }
//   }
// `;

// const WITHDRAW_MONEY = gql`
//   mutation WithdrawMoney($email: String!, $amount: Int!) {
//     withdrawMoney(email: $email, amount: $amount) {
//       balance
//       withdrawn
//       email
//     }
//   }
// `;

// export default function SendMoney() {
//   const [amount, setAmount] = useState<number | "">("");
//   const [sender, setSender] = useState<string>("");
//   const [receiver, setReceiver] = useState<string>("");
//   const [success, setSuccess] = useState<string | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   const [depositMoney] = useMutation(DEPOSIT_MONEY);
//   const [withdrawMoney, { loading }] = useMutation(WITHDRAW_MONEY);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);
//     setSuccess(null);

//     if (!sender || !receiver) {
//       setError("Please enter both sender and receiver emails");
//       return;
//     }

//     const numericAmount = parseInt(amount.toString());
//     if (!amount || numericAmount <= 0 || isNaN(numericAmount)) {
//       setError("Please enter a valid amount");
//       return;
//     }

//     try {
//       // 1️⃣ Withdraw from sender
//       const { data: withdrawData } = await withdrawMoney({
//         variables: { email: sender, amount: numericAmount },
//       });

//       // 2️⃣ Deposit to receiver
//       const { data: depositData } = await depositMoney({
//         variables: { email: receiver, amount: numericAmount },
//       });

//       setSuccess(
//         `✅ Sent ₹${numericAmount} from ${sender} to ${receiver}.
//          Sender balance: ₹${withdrawData?.withdrawMoney?.balance},
//          Receiver balance: ₹${depositData?.depositMoney?.balance}`
//       );

//       setAmount("");
//       setSender("");
//       setReceiver("");
//     } catch (err: any) {
//       setError(err.message || "Transaction failed");
//     }
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         background: "radial-gradient(circle at top, #0f2027, #203a43, #2c5364)",
//         p: 2,
//       }}
//     >
//       <Paper
//         elevation={24}
//         sx={{
//           p: { xs: 4, md: 6 },
//           borderRadius: "28px",
//           maxWidth: 400,
//           width: "100%",
//           textAlign: "center",
//           color: "#fff",
//           backdropFilter: "blur(15px)",
//           background: "rgba(255,255,255,0.05)",
//           border: "1px solid rgba(255,255,255,0.15)",
//         }}
//       >
//         <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
//           Send Money
//         </Typography>

//         {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
//         {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

//         <form onSubmit={handleSubmit}>
//           {/* Sender Email */}
//           <TextField
//             label="Sender Email"
//             type="text"
//             value={sender}
//             onChange={(e) => setSender(e.target.value)}
//             fullWidth
//             required
//             sx={{ mb: 3, input: { color: "#fff" } }}
//           />

//           {/* Receiver Email */}
//           <TextField
//             label="Receiver Email"
//             type="text"
//             value={receiver}
//             onChange={(e) => setReceiver(e.target.value)}
//             fullWidth
//             required
//             sx={{ mb: 3, input: { color: "#fff" } }}
//           />

//           {/* Amount input */}
//           <TextField
//             label="Amount"
//             type="number"
//             value={amount}
//             onChange={(e) => {
//               const value = parseInt(e.target.value);
//               setAmount(isNaN(value) ? "" : value);
//             }}
//             fullWidth
//             required
//             sx={{ mb: 3, input: { color: "#fff" } }}
//           />

//           <Button
//             type="submit"
//             variant="contained"
//             disabled={loading}
//             fullWidth
//             sx={{
//               py: 1.5,
//               fontWeight: "bold",
//               borderRadius: "50px",
//               background: "linear-gradient(90deg, #00f5ff, #ff00d4)",
//             }}
//           >
//             {loading ? <CircularProgress size={24} color="inherit" /> : "Send"}
//           </Button>
//         </form>
//       </Paper>
//     </Box>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";

// GraphQL mutations
const DEPOSIT_MONEY = gql`
  mutation DepositMoney($email: String!, $amount: Int!) {
    depositMoney(email: $email, amount: $amount) {
      balance
      deposited
      email
    }
  }
`;

const WITHDRAW_MONEY = gql`
  mutation WithdrawMoney($email: String!, $amount: Int!) {
    withdrawMoney(email: $email, amount: $amount) {
      balance
      withdrawn
      email
    }
  }
`;

export default function SendMoney() {
  const [amount, setAmount] = useState<number | "">("");
  const [sender, setSender] = useState<string>("");
  const [receiver, setReceiver] = useState<string>("");
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [depositMoney] = useMutation(DEPOSIT_MONEY);
  const [withdrawMoney, { loading }] = useMutation(WITHDRAW_MONEY);

  // 🔑 sender email localStorage se lo
  useEffect(() => {
    const savedEmail = localStorage.getItem("userEmail"); // jaha tu email save karta hai
    if (savedEmail) {
      setSender(savedEmail);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!sender || !receiver) {
      setError("Missing sender or receiver email");
      return;
    }

    const numericAmount = parseInt(amount.toString());
    if (!amount || numericAmount <= 0 || isNaN(numericAmount)) {
      setError("Please enter a valid amount");
      return;
    }

    try {
      // 1️⃣ Withdraw from sender
      const { data: withdrawData } = await withdrawMoney({
        variables: { email: sender, amount: numericAmount },
      });

      // 2️⃣ Deposit to receiver
      const { data: depositData } = await depositMoney({
        variables: { email: receiver, amount: numericAmount },
      });

      setSuccess(
        `✅ Sent ₹${numericAmount} from ${sender} to ${receiver}.
         Remaining balance: ₹${withdrawData?.withdrawMoney?.balance}`
      );

      setAmount("");
      setReceiver("");
    } catch (err: any) {
      setError(err.message || "Transaction failed");
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
          Send Money
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
          {/* Receiver Email */}
          <TextField
            label="Receiver Email"
            type="text"
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
            fullWidth
            required
            sx={{ mb: 3, input: { color: "#fff" } }}
          />

          {/* Amount input */}
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
            sx={{ mb: 3, input: { color: "#fff" } }}
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
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Send"}
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
