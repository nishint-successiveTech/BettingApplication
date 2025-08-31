
// "use client";

// import { useState } from "react";

// const AdminPage = () => {
//   const [matchId, setMatchId] = useState("");
//   const [teamId, setTeamId] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [messageType, setMessageType] = useState<"success" | "error" | "info">("info");

//   const handleDeclareWinner = async () => {
//     if (!matchId || !teamId) {
//       setMessage("Please enter both Match ID and Team ID");
//       setMessageType("error");
//       return;
//     }

//     setLoading(true);
//     setMessage("");
//     setMessageType("info");

//     try {
//       const res = await fetch("http://localhost:8787/api/confirmBet/winner", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ matchId, teamId }),
//       });

//       const data = await res.json();

//       if (!res.ok) throw new Error(data.message || "Failed to declare winner");

//       setMessage("🎉 Winner declared successfully!");
//       setMessageType("success");
//       console.log("API response:", data);
//     } catch (err: any) {
//       console.error(err);
//       setMessage(`❌ Error: ${err.message}`);
//       setMessageType("error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-6">
//       <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full">
//         <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
//           Admin Dashboard
//         </h1>
//         <p className="text-gray-500 text-center mb-6">
//           Declare the winner for a cricket match
//         </p>

//         <div className="space-y-4">
//           <div>
//             <label className="block text-gray-700 font-medium mb-1">Match ID</label>
//             <input
//               type="text"
//               value={matchId}
//               onChange={(e) => setMatchId(e.target.value)}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter Match ID"
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 font-medium mb-1">Team ID</label>
//             <input
//               type="text"
//               value={teamId}
//               onChange={(e) => setTeamId(e.target.value)}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//               placeholder="Enter Team ID"
//             />
//           </div>

//           <button
//             onClick={handleDeclareWinner}
//             disabled={loading}
//             className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-xl font-semibold shadow-lg hover:scale-105 transform transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {loading ? "Declaring..." : "Declare Winner"}
//           </button>
//         </div>

//         {message && (
//           <div
//             className={`mt-6 p-4 rounded-lg text-center font-medium ${
//               messageType === "success"
//                 ? "bg-green-100 text-green-700"
//                 : messageType === "error"
//                 ? "bg-red-100 text-red-700"
//                 : "bg-blue-100 text-blue-700"
//             }`}
//           >
//             {message}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminPage;

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
  const [messageType, setMessageType] = useState<"success" | "error" | "info">("info");
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
              {loading ? <CircularProgress size={24} color="inherit" /> : "Declare Winner"}
            </Button>
          </Box>
        </Paper>
      </motion.div>
    </Box>
  );
}
