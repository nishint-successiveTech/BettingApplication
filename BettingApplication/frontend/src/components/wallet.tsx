// "use client";

// import { useEffect, useState } from "react";
// import { useQuery } from "@apollo/client/react";
// import { GET_USER_MONEY } from "../graphql/mutations";
// import { useRouter } from "next/navigation";
// import {
//   Paper,
//   Typography,
//   CircularProgress,
//   Box,
//   Alert,
//   IconButton,
//   Grid,
//   Card,
//   CardContent,
//   Button,
//   Chip,
//   Divider,
//   Fade,
//   Zoom,
//   Slide,
//   alpha,
//   useTheme,
// } from "@mui/material";
// import {
//   AccountBalanceWallet,
//   Refresh,
//   ArrowUpward,
//   ArrowDownward,
//   History,
//   Security,
//   Payments,
//   TrendingUp,
//   AccountBalance,
// } from "@mui/icons-material";

// interface UserMoney {
//   email: string;
//   money: number;
// }

// // Mock transaction data (in a real app, this would come from your API)
// const mockTransactions = [
//   { id: 1, type: "deposit", amount: 1000, date: "2023-10-15", status: "completed" },
//   { id: 2, type: "bet", amount: -250, date: "2023-10-14", status: "completed" },
//   { id: 3, type: "win", amount: 500, date: "2023-10-14", status: "completed" },
//   { id: 4, type: "withdrawal", amount: -300, date: "2023-10-13", status: "pending" },
// ];

// export default function Wallet() {
//    const router = useRouter();
//   const theme = useTheme();
//   const email = localStorage.getItem("userEmail");
//   const [userEmail, setUserEmail] = useState<string | null>(email);
//   const [refreshing, setRefreshing] = useState(false);
//   const [activeTab, setActiveTab] = useState("balance");

//   const { data, loading, error, refetch } = useQuery(GET_USER_MONEY, {
//     variables: { email: userEmail },
//     skip: !userEmail,
//   });

//   const handleRefresh = async () => {
//     setRefreshing(true);
//     await refetch();
//     setTimeout(() => setRefreshing(false), 1000);
//   };

//   useEffect(() => {
//     if (userEmail) refetch();
//   }, [userEmail, refetch]);

//   if (!userEmail) {
//     return (
//       <Box
//         sx={{
//           minHeight: "1000vh",
//           width: "100vw", // ensure full width
//           padding: { xs: 2, md: 6 }, // responsive padding
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           background: "radial-gradient(circle at top, #0f2027, #203a43, #2c5364)",
//         }}
//       >
//         <Alert severity="warning" sx={{ maxWidth: 400, mx: 2 }}>
//           Please login first to view your wallet.
//         </Alert>
//       </Box>
//     );
//   }

//   if (loading) {
//     return (
//       <Box
//         sx={{
//           minHeight: "100vh",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           background: "radial-gradient(circle at top, #0f2027, #203a43, #2c5364)",
//         }}
//       >
//         <Box sx={{ textAlign: "center" }}>
//           <CircularProgress size={60} thickness={4} sx={{ color: "#00f5ff", mb: 2 }} />
//           <Typography variant="h6" sx={{ color: "white" }}>
//             Loading your wallet...
//           </Typography>
//         </Box>
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Box
//         sx={{
//           minHeight: "100vh",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           background: "radial-gradient(circle at top, #0f2027, #203a43, #2c5364)",
//         }}
//       >
//         <Alert severity="error" sx={{ maxWidth: 500, mx: 2 }}>
//           Failed to fetch wallet: {error.message}
//         </Alert>
//       </Box>
//     );
//   }

//   const user: UserMoney = data.getUserMoney;

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background: "radial-gradient(circle at top, #0f2027, #203a43, #2c5364)",
//         padding: 4,
//         position: "relative",
//         overflow: "hidden",
//       }}
//     >
//       {/* Animated background elements */}
//       <Box
//         sx={{
//           position: "absolute",
//           top: "-10%",
//           right: "-5%",
//           width: "300px",
//           height: "300px",
//           borderRadius: "50%",
//           background: "radial-gradient(circle, rgba(0,245,255,0.2) 0%, transparent 70%)",
//           animation: "float 8s ease-in-out infinite",
//         }}
//       />
//       <Box
//         sx={{
//           position: "absolute",
//           bottom: "-10%",
//           left: "-5%",
//           width: "400px",
//           height: "400px",
//           borderRadius: "50%",
//           background: "radial-gradient(circle, rgba(255,0,212,0.2) 0%, transparent 70%)",
//           animation: "float 10s ease-in-out infinite",
//           animationDelay: "1s",
//         }}
//       />

//       <Box sx={{ position: "relative", zIndex: 2, maxWidth: 1200, margin: "0 auto" }}>
//         {/* Header */}
//         <Fade in timeout={800}>
//           <Box sx={{ textAlign: "center", mb: 4 }}>
//             <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
//               <AccountBalanceWallet sx={{ fontSize: 40, mr: 2, color: "#00f5ff" }} />
//               <Typography
//                 variant="h3"
//                 sx={{
//                   fontWeight: "bold",
//                   background: "linear-gradient(90deg, #00f5ff, #ff00d4)",
//                   WebkitBackgroundClip: "text",
//                   WebkitTextFillColor: "transparent",
//                 }}
//               >
//                 My Wallet
//               </Typography>
//             </Box>
//             <Typography variant="h6" sx={{ color: "rgba(255,255,255,0.7)" }}>
//               Manage your funds and transaction history
//             </Typography>
//           </Box>
//         </Fade>

//         {/* Balance Card */}
//         <Zoom in timeout={1000}>
//           <Paper
//             elevation={24}
//             sx={{
//               p: 4,
//               mb: 4,
//               borderRadius: "20px",
//               background: "linear-gradient(145deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
//               backdropFilter: "blur(10px)",
//               border: "1px solid",
//               borderColor: "rgba(255,255,255,0.15)",
//               color: "#fff",
//               position: "relative",
//               overflow: "hidden",
//               "&::before": {
//                 content: '""',
//                 position: "absolute",
//                 top: 0,
//                 left: 0,
//                 right: 0,
//                 height: "6px",
//                 background: "linear-gradient(90deg, #00f5ff, #ff00d4)",
//               },
//             }}
//           >
//             <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={3}>
//               <Box>
//                 <Typography variant="h6" sx={{ opacity: 0.8, mb: 1 }}>
//                   Total Balance
//                 </Typography>
//                 <Typography
//                   variant="h3"
//                   sx={{
//                     fontWeight: "bold",
//                     background: "linear-gradient(90deg, #00f5ff, #ff00d4)",
//                     WebkitBackgroundClip: "text",
//                     WebkitTextFillColor: "transparent",
//                   }}
//                 >
//                   ₹{user.money.toLocaleString()}
//                 </Typography>
//                 <Chip
//                   icon={<Security />}
//                   label="Secure & Encrypted"
//                   size="small"
//                   sx={{ mt: 2, background: "rgba(0,245,255,0.2)", color: "white" }}
//                 />
//               </Box>
//               <IconButton
//                 onClick={handleRefresh}
//                 sx={{
//                   background: "rgba(255,255,255,0.1)",
//                   "&:hover": { background: "rgba(255,255,255,0.2)" },
//                   transform: refreshing ? "rotate(360deg)" : "rotate(0deg)",
//                   transition: "transform 0.5s ease",
//                 }}
//               >
//                 <Refresh sx={{ color: "#00f5ff" }} />
//               </IconButton>
//             </Box>

//             <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", my: 3 }} />

//             <Grid container spacing={3}>
//               <Grid item xs={12} sm={6} md={3}>
//                 <Button
//                   fullWidth
//                   variant="contained"
//                   startIcon={<ArrowDownward />}
//                   sx={{
//                     py: 1.5,
//                     background: "linear-gradient(90deg, #4caf50, #2e7d32)",
//                     borderRadius: "12px",
//                     fontWeight: "bold",
//                     "&:hover": {
//                       background: "linear-gradient(90deg, #2e7d32, #4caf50)",
//                     },
//                   }}
//                   onClick={() => router.push("/deposit")}
//                 >
//                   Deposit
//                 </Button>
//               </Grid>
//               <Grid item xs={12} sm={6} md={3}>
//                 <Button
//                   fullWidth
//                   variant="contained"
//                   startIcon={<ArrowUpward />}
//                   sx={{
//                     py: 1.5,
//                     background: "linear-gradient(90deg, #f44336, #c62828)",
//                     borderRadius: "12px",
//                     fontWeight: "bold",
//                     "&:hover": {
//                       background: "linear-gradient(90deg, #c62828, #f44336)",
//                     },
//                   }}
//                    onClick={() => router.push("/withdraw")}
//                 >
//                   Withdraw
//                 </Button>
//               </Grid>
//               <Grid item xs={12} sm={6} md={3}>
//                 <Button
//                   fullWidth
//                   variant="outlined"
//                   startIcon={<Payments />}
//                   sx={{
//                     py: 1.5,
//                     borderColor: "rgba(255,255,255,0.3)",
//                     color: "white",
//                     borderRadius: "12px",
//                     fontWeight: "bold",
//                     "&:hover": {
//                       borderColor: "#00f5ff",
//                       background: "rgba(0,245,255,0.1)",
//                     },
//                   }}
//                 >
//                   Send Money
//                 </Button>
//               </Grid>
//               <Grid item xs={12} sm={6} md={3}>
//                 <Button
//                   fullWidth
//                   variant="outlined"
//                   startIcon={<History />}
//                   sx={{
//                     py: 1.5,
//                     borderColor: "rgba(255,255,255,0.3)",
//                     color: "white",
//                     borderRadius: "12px",
//                     fontWeight: "bold",
//                     "&:hover": {
//                       borderColor: "#ff00d4",
//                       background: "rgba(255,0,212,0.1)",
//                     },
//                   }}
//                   onClick={() => setActiveTab("transactions")}
//                 >
//                   Transactions
//                 </Button>
//               </Grid>
//             </Grid>
//           </Paper>
//         </Zoom>

//         {/* Tabs */}
//         <Box sx={{ borderBottom: 1, borderColor: "rgba(255,255,255,0.1)", mb: 3 }}>
//           <Button
//             variant={activeTab === "balance" ? "contained" : "text"}
//             onClick={() => setActiveTab("balance")}
//             sx={{
//               mr: 2,
//               mb: -0.5,
//               borderRadius: "20px 20px 0 0",
//               background: activeTab === "balance" ? "rgba(255,255,255,0.15)" : "transparent",
//               color: "white",
//               "&:hover": {
//                 background: "rgba(255,255,255,0.1)",
//               },
//             }}
//             startIcon={<AccountBalance />}
//           >
//             Account Overview
//           </Button>
//           <Button
//             variant={activeTab === "transactions" ? "contained" : "text"}
//             onClick={() => setActiveTab("transactions")}
//             sx={{
//               borderRadius: "20px 20px 0 0",
//               background: activeTab === "transactions" ? "rgba(255,255,255,0.15)" : "transparent",
//               color: "white",
//               "&:hover": {
//                 background: "rgba(255,255,255,0.1)",
//               },
//             }}
//             startIcon={<History />}
//           >
//             Transaction History
//           </Button>
//         </Box>

//         {/* Content based on active tab */}
//         {activeTab === "balance" ? (
//           <Fade in timeout={500}>
//             <Grid container spacing={3}>
//               <Grid item xs={12} md={6}>
//                 <Paper
//                   sx={{
//                     p: 3,
//                     borderRadius: "16px",
//                     background: "rgba(255,255,255,0.05)",
//                     backdropFilter: "blur(10px)",
//                     border: "1px solid rgba(255,255,255,0.1)",
//                     color: "white",
//                     height: "100%",
//                   }}
//                 >
//                   <Typography variant="h6" sx={{ mb: 2, display: "flex", alignItems: "center" }}>
//                     <TrendingUp sx={{ mr: 1, color: "#00f5ff" }} /> Statistics
//                   </Typography>
//                   <Box sx={{ mb: 2 }}>
//                     <Typography variant="body2" sx={{ opacity: 0.7 }}>
//                       This Week
//                     </Typography>
//                     <Typography variant="h6" sx={{ fontWeight: "bold" }}>
//                       ₹2,450
//                     </Typography>
//                   </Box>
//                   <Box sx={{ mb: 2 }}>
//                     <Typography variant="body2" sx={{ opacity: 0.7 }}>
//                       This Month
//                     </Typography>
//                     <Typography variant="h6" sx={{ fontWeight: "bold" }}>
//                       ₹12,800
//                     </Typography>
//                   </Box>
//                   <Box>
//                     <Typography variant="body2" sx={{ opacity: 0.7 }}>
//                       Total Winnings
//                     </Typography>
//                     <Typography variant="h6" sx={{ fontWeight: "bold" }}>
//                       ₹87,500
//                     </Typography>
//                   </Box>
//                 </Paper>
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <Paper
//                   sx={{
//                     p: 3,
//                     borderRadius: "16px",
//                     background: "rgba(255,255,255,0.05)",
//                     backdropFilter: "blur(10px)",
//                     border: "1px solid rgba(255,255,255,0.1)",
//                     color: "white",
//                     height: "100%",
//                   }}
//                 >
//                   <Typography variant="h6" sx={{ mb: 2, display: "flex", alignItems: "center" }}>
//                     <Security sx={{ mr: 1, color: "#00f5ff" }} /> Security
//                   </Typography>
//                   <Typography variant="body2" sx={{ mb: 2, opacity: 0.8 }}>
//                     Your wallet is protected with bank-level encryption and 2FA authentication.
//                   </Typography>
//                   <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
//                     <Chip label="Email Verified" size="small" color="success" sx={{ mr: 1 }} />
//                     <Typography variant="body2">Verified</Typography>
//                   </Box>
//                   <Box display="flex" alignItems="center">
//                     <Chip label="KYC" size="small" color="success" sx={{ mr: 1 }} />
//                     <Typography variant="body2">Completed</Typography>
//                   </Box>
//                 </Paper>
//               </Grid>
//             </Grid>
//           </Fade>
//         ) : (
//           <Fade in timeout={500}>
//             <Paper
//               sx={{
//                 p: 3,
//                 borderRadius: "16px",
//                 background: "rgba(255,255,255,0.05)",
//                 backdropFilter: "blur(10px)",
//                 border: "1px solid rgba(255,255,255,0.1)",
//                 color: "white",
//               }}
//             >
//               <Typography variant="h6" sx={{ mb: 3 }}>
//                 Recent Transactions
//               </Typography>
//               {mockTransactions.map((transaction, index) => (
//                 <Slide
//                   key={transaction.id}
//                   direction="up"
//                   in
//                   timeout={(index + 1) * 200}
//                   mountOnEnter
//                   unmountOnExit
//                 >
//                   <Box
//                     sx={{
//                       p: 2,
//                       mb: 2,
//                       borderRadius: "12px",
//                       background: "rgba(255,255,255,0.03)",
//                       border: "1px solid rgba(255,255,255,0.05)",
//                       "&:hover": {
//                         background: "rgba(255,255,255,0.07)",
//                       },
//                     }}
//                   >
//                     <Box display="flex" justifyContent="space-between" alignItems="center">
//                       <Box>
//                         <Typography variant="subtitle1" sx={{ textTransform: "capitalize" }}>
//                           {transaction.type}
//                         </Typography>
//                         <Typography variant="body2" sx={{ opacity: 0.7 }}>
//                           {transaction.date}
//                         </Typography>
//                       </Box>
//                       <Box sx={{ textAlign: "right" }}>
//                         <Typography
//                           variant="h6"
//                           sx={{
//                             color: transaction.amount > 0 ? "#4caf50" : "#f44336",
//                             fontWeight: "bold",
//                           }}
//                         >
//                           {transaction.amount > 0 ? "+" : ""}₹
//                           {Math.abs(transaction.amount).toLocaleString()}
//                         </Typography>
//                         <Chip
//                           label={transaction.status}
//                           size="small"
//                           color={
//                             transaction.status === "completed"
//                               ? "success"
//                               : transaction.status === "pending"
//                               ? "warning"
//                               : "error"
//                           }
//                         />
//                       </Box>
//                     </Box>
//                   </Box>
//                 </Slide>
//               ))}
//             </Paper>
//           </Fade>
//         )}
//       </Box>

//       {/* Global styles for animations */}
//       <style jsx global>{`
//         @keyframes float {
//           0% { transform: translateY(0) rotate(0deg); }
//           50% { transform: translateY(-20px) rotate(5deg); }
//           100% { transform: translateY(0) rotate(0deg); }
//         }
//       `}</style>
//     </Box>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client/react";
import { GET_USER_MONEY } from "../graphql/mutations";
import { useRouter } from "next/navigation";
import {
  Paper,
  Typography,
  CircularProgress,
  Box,
  Alert,
  IconButton,
  Grid,
  Button,
  Chip,
  Divider,
  Fade,
  Zoom,
  Slide,
  useTheme,
} from "@mui/material";
import {
  AccountBalanceWallet,
  Refresh,
  ArrowUpward,
  ArrowDownward,
  History,
  Security,
  Payments,
  TrendingUp,
  AccountBalance,
} from "@mui/icons-material";

interface UserMoney {
  email: string;
  money: number;
}

const mockTransactions = [
  { id: 1, type: "deposit", amount: 1000, date: "2023-10-15", status: "completed" },
  { id: 2, type: "bet", amount: -250, date: "2023-10-14", status: "completed" },
  { id: 3, type: "win", amount: 500, date: "2023-10-14", status: "completed" },
  { id: 4, type: "withdrawal", amount: -300, date: "2023-10-13", status: "pending" },
];

export default function Wallet() {
  const router = useRouter();
  const theme = useTheme();
  const email = localStorage.getItem("userEmail");
  const [userEmail, setUserEmail] = useState<string | null>(email);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState("balance");

  const { data, loading, error, refetch } = useQuery(GET_USER_MONEY, {
    variables: { email: userEmail },
    skip: !userEmail,
  });

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setTimeout(() => setRefreshing(false), 1000);
  };

  useEffect(() => {
    if (userEmail) refetch();
  }, [userEmail, refetch]);

  // Root container with full-screen background
  return (
    <Box
      sx={{
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "radial-gradient(circle at top, #0f2027, #203a43, #2c5364)",
    zIndex: -1, // send background behind content
  }}
    >
      {/* Animated background circles */}
      <Box
        sx={{
          position: "absolute",
          top: "-10%",
          right: "-5%",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,245,255,0.2) 0%, transparent 70%)",
          animation: "float 8s ease-in-out infinite",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "-10%",
          left: "-5%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,0,212,0.2) 0%, transparent 70%)",
          animation: "float 10s ease-in-out infinite",
          animationDelay: "1s",
        }}
      />

      {/* Conditional content */}
      {!userEmail ? (
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            px: { xs: 2, md: 6 },
          }}
        >
          <Alert severity="warning" sx={{ maxWidth: 400, mx: 2 }}>
            Please login first to view your wallet.
          </Alert>
        </Box>
      ) : loading ? (
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <CircularProgress size={60} thickness={4} sx={{ color: "#00f5ff", mb: 2 }} />
            <Typography variant="h6" sx={{ color: "white" }}>
              Loading your wallet...
            </Typography>
          </Box>
        </Box>
      ) : error ? (
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Alert severity="error" sx={{ maxWidth: 500, mx: 2 }}>
            Failed to fetch wallet: {error.message}
          </Alert>
        </Box>
      ) : (
        <Box sx={{ position: "relative", zIndex: 2, maxWidth: 1200, margin: "0 auto", p: 4 }}>
          {/* Header */}
          <Fade in timeout={800}>
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
                <AccountBalanceWallet sx={{ fontSize: 40, mr: 2, color: "#00f5ff" }} />
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: "bold",
                    background: "linear-gradient(90deg, #00f5ff, #ff00d4)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  My Wallet
                </Typography>
              </Box>
              <Typography variant="h6" sx={{ color: "rgba(255,255,255,0.7)" }}>
                Manage your funds and transaction history
              </Typography>
            </Box>
          </Fade>

          {/* Balance Card */}
          <Zoom in timeout={1000}>
            <Paper
              elevation={24}
              sx={{
                p: 4,
                mb: 4,
                borderRadius: "20px",
                background: "linear-gradient(145deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#fff",
                position: "relative",
                overflow: "hidden",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "6px",
                  background: "linear-gradient(90deg, #00f5ff, #ff00d4)",
                },
              }}
            >
              <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={3}>
                <Box>
                  <Typography variant="h6" sx={{ opacity: 0.8, mb: 1 }}>
                    Total Balance
                  </Typography>
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: "bold",
                      background: "linear-gradient(90deg, #00f5ff, #ff00d4)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    ₹{data.getUserMoney.money.toLocaleString()}
                  </Typography>
                  <Chip
                    icon={<Security />}
                    label="Secure & Encrypted"
                    size="small"
                    sx={{ mt: 2, background: "rgba(0,245,255,0.2)", color: "white" }}
                  />
                </Box>
                <IconButton
                  onClick={handleRefresh}
                  sx={{
                    background: "rgba(255,255,255,0.1)",
                    "&:hover": { background: "rgba(255,255,255,0.2)" },
                    transform: refreshing ? "rotate(360deg)" : "rotate(0deg)",
                    transition: "transform 0.5s ease",
                  }}
                >
                  <Refresh sx={{ color: "#00f5ff" }} />
                </IconButton>
              </Box>

              <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", my: 3 }} />

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<ArrowDownward />}
                    sx={{
                      py: 1.5,
                      background: "linear-gradient(90deg, #4caf50, #2e7d32)",
                      borderRadius: "12px",
                      fontWeight: "bold",
                      "&:hover": { background: "linear-gradient(90deg, #2e7d32, #4caf50)" },
                    }}
                    onClick={() => router.push("/deposit")}
                  >
                    Deposit
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<ArrowUpward />}
                    sx={{
                      py: 1.5,
                      background: "linear-gradient(90deg, #f44336, #c62828)",
                      borderRadius: "12px",
                      fontWeight: "bold",
                      "&:hover": { background: "linear-gradient(90deg, #c62828, #f44336)" },
                    }}
                    onClick={() => router.push("/withdraw")}
                  >
                    Withdraw
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<Payments />}
                    sx={{
                      py: 1.5,
                      borderColor: "rgba(255,255,255,0.3)",
                      color: "white",
                      borderRadius: "12px",
                      fontWeight: "bold",
                      "&:hover": {
                        borderColor: "#00f5ff",
                        background: "rgba(0,245,255,0.1)",
                      },
                    }}
                  >
                    Send Money
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<History />}
                    sx={{
                      py: 1.5,
                      borderColor: "rgba(255,255,255,0.3)",
                      color: "white",
                      borderRadius: "12px",
                      fontWeight: "bold",
                      "&:hover": {
                        borderColor: "#ff00d4",
                        background: "rgba(255,0,212,0.1)",
                      },
                    }}
                    onClick={() => setActiveTab("transactions")}
                  >
                    Transactions
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Zoom>

          {/* Tabs and content */}
          <Box sx={{ borderBottom: 1, borderColor: "rgba(255,255,255,0.1)", mb: 3 }}>
            <Button
              variant={activeTab === "balance" ? "contained" : "text"}
              onClick={() => setActiveTab("balance")}
              sx={{
                mr: 2,
                mb: -0.5,
                borderRadius: "20px 20px 0 0",
                background: activeTab === "balance" ? "rgba(255,255,255,0.15)" : "transparent",
                color: "white",
                "&:hover": { background: "rgba(255,255,255,0.1)" },
              }}
              startIcon={<AccountBalance />}
            >
              Account Overview
            </Button>
            <Button
              variant={activeTab === "transactions" ? "contained" : "text"}
              onClick={() => setActiveTab("transactions")}
              sx={{
                borderRadius: "20px 20px 0 0",
                background: activeTab === "transactions" ? "rgba(255,255,255,0.15)" : "transparent",
                color: "white",
                "&:hover": { background: "rgba(255,255,255,0.1)" },
              }}
              startIcon={<History />}
            >
              Transaction History
            </Button>
          </Box>

          {/* Tab content */}
          {activeTab === "balance" ? (
            <Fade in timeout={500}>
              <Grid container spacing={3}>
                {/* Statistics */}
                <Grid item xs={12} md={6}>
                  <Paper
                    sx={{
                      p: 3,
                      borderRadius: "16px",
                      background: "rgba(255,255,255,0.05)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "white",
                      height: "100%",
                    }}
                  >
                    <Typography variant="h6" sx={{ mb: 2, display: "flex", alignItems: "center" }}>
                      <TrendingUp sx={{ mr: 1, color: "#00f5ff" }} /> Statistics
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" sx={{ opacity: 0.7 }}>This Week</Typography>
                      <Typography variant="h6" sx={{ fontWeight: "bold" }}>₹2,450</Typography>
                    </Box>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" sx={{ opacity: 0.7 }}>This Month</Typography>
                      <Typography variant="h6" sx={{ fontWeight: "bold" }}>₹12,800</Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" sx={{ opacity: 0.7 }}>Total Winnings</Typography>
                      <Typography variant="h6" sx={{ fontWeight: "bold" }}>₹87,500</Typography>
                    </Box>
                  </Paper>
                </Grid>

                {/* Security */}
                <Grid item xs={12} md={6}>
                  <Paper
                    sx={{
                      p: 3,
                      borderRadius: "16px",
                      background: "rgba(255,255,255,0.05)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "white",
                      height: "100%",
                    }}
                  >
                    <Typography variant="h6" sx={{ mb: 2, display: "flex", alignItems: "center" }}>
                      <Security sx={{ mr: 1, color: "#00f5ff" }} /> Security
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2, opacity: 0.8 }}>
                      Your wallet is protected with bank-level encryption and 2FA authentication.
                    </Typography>
                    <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
                      <Chip label="Email Verified" size="small" color="success" sx={{ mr: 1 }} />
                      <Typography variant="body2">Verified</Typography>
                    </Box>
                    <Box display="flex" alignItems="center">
                      <Chip label="KYC" size="small" color="success" sx={{ mr: 1 }} />
                      <Typography variant="body2">Completed</Typography>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </Fade>
          ) : (
            <Fade in timeout={500}>
              <Paper
                sx={{
                  p: 3,
                  borderRadius: "16px",
                  background: "rgba(255,255,255,0.05)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "white",
                }}
              >
                <Typography variant="h6" sx={{ mb: 3 }}>Recent Transactions</Typography>
                {mockTransactions.map((transaction, index) => (
                  <Slide key={transaction.id} direction="up" in timeout={(index + 1) * 200}>
                    <Box
                      sx={{
                        p: 2,
                        mb: 2,
                        borderRadius: "12px",
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.05)",
                        "&:hover": { background: "rgba(255,255,255,0.07)" },
                      }}
                    >
                      <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Box>
                          <Typography variant="subtitle1" sx={{ textTransform: "capitalize" }}>
                            {transaction.type}
                          </Typography>
                          <Typography variant="body2" sx={{ opacity: 0.7 }}>
                            {transaction.date}
                          </Typography>
                        </Box>
                        <Box sx={{ textAlign: "right" }}>
                          <Typography
                            variant="h6"
                            sx={{
                              color: transaction.amount > 0 ? "#4caf50" : "#f44336",
                              fontWeight: "bold",
                            }}
                          >
                            {transaction.amount > 0 ? "+" : ""}₹{Math.abs(transaction.amount).toLocaleString()}
                          </Typography>
                          <Chip
                            label={transaction.status}
                            size="small"
                            color={
                              transaction.status === "completed"
                                ? "success"
                                : transaction.status === "pending"
                                ? "warning"
                                : "error"
                            }
                          />
                        </Box>
                      </Box>
                    </Box>
                  </Slide>
                ))}
              </Paper>
            </Fade>
          )}
        </Box>
      )}

      {/* Global animation styles */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
      `}</style>
    </Box>
    
  );
}
