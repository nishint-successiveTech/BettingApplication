// "use client";

// import React, { useState } from "react";
// import { useQuery } from "@apollo/client/react";
// import { GET_CRICKET_MATCHES } from "@/graphql/mutations";
// import { useRouter } from "next/navigation";
// import {
//   Box,
//   Paper,
//   Typography,
//   CircularProgress,
//   Chip,
//   Avatar,
//   IconButton,
//   Tooltip,
//   Fade,
//   Zoom,
//   alpha,
//   useTheme,
//   Grid,
//   Tabs,
//   Tab,
// } from "@mui/material";
// import {
//   SportsCricket,
//   Refresh,
//   Info,
//   LiveTv,
//   Upcoming,
//   DoneAll,
//   Schedule,
// } from "@mui/icons-material";

// // Skeleton loader
// const MatchSkeleton = () => (
//   <Fade in timeout={800}>
//     <Paper
//       elevation={0}
//       sx={{
//         p: 2.5,
//         borderRadius: "16px",
//         background: "linear-gradient(145deg, #1a1c29, #222636)",
//         border: "1px solid",
//         borderColor: "divider",
//         cursor: "pointer",
//         transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
//         opacity: 0.8,
//         position: "relative",
//         overflow: "hidden",
//         "&:before": {
//           content: '""',
//           position: "absolute",
//           top: 0,
//           left: 0,
//           right: 0,
//           height: "1px",
//           background:
//             "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
//         },
//         mb: 2.5,
//       }}
//     >
//       <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
//         <Box sx={{ width: "40%", height: 12, bgcolor: "grey.700", borderRadius: 1 }} />
//         <Box sx={{ width: 80, height: 24, bgcolor: "grey.700", borderRadius: 16 }} />
//       </Box>
//       <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2.5 }}>
//         <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "40%" }}>
//           <Box sx={{ width: 60, height: 60, bgcolor: "grey.700", borderRadius: "50%", mb: 1.5 }} />
//           <Box sx={{ width: "80%", height: 14, bgcolor: "grey.700", borderRadius: 1, mb: 1 }} />
//           <Box sx={{ width: 30, height: 20, bgcolor: "grey.800", borderRadius: 1 }} />
//         </Box>
//         <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "20%" }}>
//           <Box sx={{ width: 30, height: 14, bgcolor: "grey.700", borderRadius: 1 }} />
//           <Box sx={{ width: 60, height: 24, bgcolor: "grey.800", borderRadius: 16, mt: 1.5 }} />
//         </Box>
//         <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "40%" }}>
//           <Box sx={{ width: 60, height: 60, bgcolor: "grey.700", borderRadius: "50%", mb: 1.5 }} />
//           <Box sx={{ width: "80%", height: 14, bgcolor: "grey.700", borderRadius: 1, mb: 1 }} />
//           <Box sx={{ width: 30, height: 20, bgcolor: "grey.800", borderRadius: 1 }} />
//         </Box>
//       </Box>
//       <Box sx={{ display: "flex", justifyContent: "center" }}>
//         <Box sx={{ width: "70%", height: 14, bgcolor: "grey.700", borderRadius: 1 }} />
//       </Box>
//     </Paper>
//   </Fade>
// );

// // Format match date
// const formatMatchDate = (dateString: string) => {
//   const date = new Date(dateString);
//   return {
//     date: date.toLocaleDateString("en-US", { weekday: "short", day: "numeric", month: "short" }),
//     time: date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true }),
//     full: date.toLocaleString("en-US", { weekday: "long", day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: true }),
//   };
// };

// // Categorize matches
// const categorizeMatches = (matches: any[]) => {
//   const now = new Date();
//   return matches.reduce(
//     (acc, match) => {
//       const matchDate = new Date(match.dateTimeGMT);
//       const isLive = match.status.toLowerCase().includes("live");
//       const isCompleted =
//         match.status.toLowerCase().includes("complete") ||
//         match.status.toLowerCase().includes("finished") ||
//         (matchDate < now && !isLive);

//       if (isLive) acc.live.push(match);
//       else if (isCompleted) acc.completed.push(match);
//       else acc.upcoming.push(match);

//       return acc;
//     },
//     { live: [], upcoming: [], completed: [] }
//   );
// };

// // Match Card
// const MatchCard = ({ match, onClick }: { match: any; onClick: () => void }) => {
//   const theme = useTheme();
//   const formattedDate = formatMatchDate(match.dateTimeGMT);
//   const isLive = match.status.toLowerCase().includes("live");
//   const isCompleted = match.status.toLowerCase().includes("complete") || match.status.toLowerCase().includes("finished");

//   return (
//     <Fade in timeout={800}>
//       <Paper
//         elevation={8}
//         onClick={onClick}
//         sx={{
//           p: 3,
//           borderRadius: "16px",
//           background: "linear-gradient(145deg, #1a1c29, #222636)",
//           border: "1px solid",
//           borderColor: isLive ? alpha(theme.palette.success.main, 0.3) : isCompleted ? alpha(theme.palette.secondary.main, 0.3) : "divider",
//           cursor: "pointer",
//           transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
//           position: "relative",
//           overflow: "hidden",
//           mb: 3,
//           "&:before": {
//             content: '""',
//             position: "absolute",
//             top: 0,
//             left: 0,
//             right: 0,
//             height: "1px",
//             background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
//           },
//         }}
//       >
//         {/* Teams Section */}
//         <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
//           <Avatar src={match.t1img} alt={match.t1} sx={{ width: 70, height: 70, border: "2px solid", borderColor: alpha(theme.palette.primary.main, 0.3) }} />
//           <Avatar src={match.t2img} alt={match.t2} sx={{ width: 70, height: 70, border: "2px solid", borderColor: alpha(theme.palette.secondary.main, 0.3) }} />
//         </Box>

//         {/* Match Time */}
//         <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", background: "rgba(0,0,0,0.3)", py: 1, borderRadius: "8px", border: "1px solid", borderColor: "divider" }}>
//           <Schedule sx={{ fontSize: 16, mr: 1, color: "primary.main" }} />
//           <Tooltip title={formattedDate.full}>
//             <Typography variant="caption">{isLive ? "LIVE" : isCompleted ? "COMPLETED" : `Starts: ${formattedDate.date} • ${formattedDate.time}`}</Typography>
//           </Tooltip>
//         </Box>
//       </Paper>
//     </Fade>
//   );
// };

// // Main Component
// const CricketMatches: React.FC = () => {
//   const theme = useTheme();
//   const router = useRouter();
//   const [refreshing, setRefreshing] = useState(false);
//   const [activeTab, setActiveTab] = useState(0);
//   const { loading, error, data, refetch } = useQuery(GET_CRICKET_MATCHES, { fetchPolicy: "cache-and-network" });

//   const handleRefresh = async () => {
//     setRefreshing(true);
//     try { await refetch(); } catch {}
//     finally { setTimeout(() => setRefreshing(false), 800); }
//   };

//   const categorizedMatches = data?.cricketMatches ? categorizeMatches(data.cricketMatches) : { live: [], upcoming: [], completed: [] };

//   return (
//     <>
//       {/* Full-screen background */}
//       <Box sx={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "radial-gradient(circle at top, #0f2027, #203a43, #2c5364)", zIndex: -1 }} />

//       {/* Page content */}
//       <Box sx={{ position: "relative", zIndex: 1, p: 3, width: "100%", minHeight: "100vh" }}>
//         {/* Header */}
//         <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
//           <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
//             <SportsCricket sx={{ fontSize: 32, color: "primary.main" }} />
//             <Typography variant="h4" sx={{ fontWeight: 800, color: "white" }}>Cricket Matches</Typography>
//           </Box>
//           <Tooltip title="Refresh matches">
//             <IconButton onClick={handleRefresh} disabled={refreshing} sx={{ color: "primary.main" }}>
//               <Refresh sx={{ fontSize: 28 }} />
//             </IconButton>
//           </Tooltip>
//         </Box>

//         {/* Tabs */}
//         <Paper sx={{ mb: 4, background: "rgba(0,0,0,0.2)" }}>
//           <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)} variant="fullWidth">
//             <Tab icon={<LiveTv />} iconPosition="start" label={`Live (${categorizedMatches.live.length})`} />
//             <Tab icon={<Upcoming />} iconPosition="start" label={`Upcoming (${categorizedMatches.upcoming.length})`} />
//             <Tab icon={<DoneAll />} iconPosition="start" label={`Completed (${categorizedMatches.completed.length})`} />
//           </Tabs>
//         </Paper>

//         {/* Matches Grid */}
//         {loading ? (
//           <Grid container spacing={3}>
//             {Array.from({ length: 6 }).map((_, idx) => (
//               <Grid item xs={12} md={6} lg={4} key={idx}><MatchSkeleton /></Grid>
//             ))}
//           </Grid>
//         ) : (
//           <Zoom in timeout={500}>
//             <Grid container spacing={3}>
//               {(activeTab === 0 ? categorizedMatches.live : activeTab === 1 ? categorizedMatches.upcoming : categorizedMatches.completed).map((match: any) => (
//                 <Grid item xs={12} md={6} lg={4} key={match.id}>
//                   <MatchCard match={match} onClick={() => router.push(`/betWhich?matchId=${match.id}`)} />
//                 </Grid>
//               ))}
//             </Grid>
//           </Zoom>
//         )}
//       </Box>
//     </>
//   );
// };

// export default CricketMatches;

// // "use client";

// // import React, { useState, useMemo } from "react";
// // import { useQuery } from "@apollo/client/react";
// // import { GET_CRICKET_MATCHES } from "@/graphql/mutations";
// // import { useRouter } from "next/navigation";
// // import {
// //   Box,
// //   Paper,
// //   Typography,
// //   IconButton,
// //   Tooltip,
// //   Fade,
// //   Zoom,
// //   alpha,
// //   useTheme,
// //   Grid,
// //   Tabs,
// //   Tab,
// //   CircularProgress,
// // } from "@mui/material";
// // import {
// //   SportsCricket,
// //   Refresh,
// //   LiveTv,
// //   Upcoming,
// //   DoneAll,
// //   Schedule,
// //   ErrorOutline,
// // } from "@mui/icons-material";
// // import { motion } from "framer-motion";

// // // ---------------- Types ----------------
// // type Match = {
// //   id: string;
// //   t1: string;
// //   t1img: string;
// //   t2: string;
// //   t2img: string;
// //   status: string;
// //   dateTimeGMT: string;
// // };

// // // ---------------- Utils ----------------
// // const formatMatchDate = (dateString: string) => {
// //   const date = new Date(dateString);
// //   return {
// //     date: date.toLocaleDateString("en-US", {
// //       weekday: "short",
// //       day: "numeric",
// //       month: "short",
// //     }),
// //     time: date.toLocaleTimeString("en-US", {
// //       hour: "2-digit",
// //       minute: "2-digit",
// //       hour12: true,
// //     }),
// //     full: date.toLocaleString("en-US", {
// //       weekday: "long",
// //       day: "numeric",
// //       month: "long",
// //       year: "numeric",
// //       hour: "2-digit",
// //       minute: "2-digit",
// //       hour12: true,
// //     }),
// //   };
// // };

// // const categorizeMatches = (matches: Match[]) => {
// //   const now = new Date();
// //   return matches.reduce(
// //     (acc, match) => {
// //       const matchDate = new Date(match.dateTimeGMT);
// //       const isLive = match.status.toLowerCase().includes("live");
// //       const isCompleted =
// //         match.status.toLowerCase().includes("complete") ||
// //         match.status.toLowerCase().includes("finished") ||
// //         (matchDate < now && !isLive);

// //       if (isLive) acc.live.push(match);
// //       else if (isCompleted) acc.completed.push(match);
// //       else acc.upcoming.push(match);

// //       return acc;
// //     },
// //     { live: [] as Match[], upcoming: [] as Match[], completed: [] as Match[] }
// //   );
// // };

// // // ---------------- Components ----------------
// // const MatchSkeleton = React.memo(() => (
// //   <Fade in timeout={600}>
// //     <Paper
// //       sx={{
// //         p: 3,
// //         borderRadius: "16px",
// //         background: "linear-gradient(145deg, #1a1c29, #222636)",
// //         border: "1px solid",
// //         borderColor: "divider",
// //         opacity: 0.8,
// //         mb: 2.5,
// //       }}
// //     >
// //       <Box sx={{ height: 160, bgcolor: "grey.800", borderRadius: 2 }} />
// //     </Paper>
// //   </Fade>
// // ));

// // const MatchCard = React.memo(
// //   ({ match, onClick }: { match: Match; onClick: () => void }) => {
// //     const theme = useTheme();
// //     const formattedDate = formatMatchDate(match.dateTimeGMT);
// //     const isLive = match.status.toLowerCase().includes("live");
// //     const isCompleted =
// //       match.status.toLowerCase().includes("complete") ||
// //       match.status.toLowerCase().includes("finished");

// //     return (
// //       <Zoom in timeout={500}>
// //         <motion.div whileHover={{ scale: 1.03 }} transition={{ type: "spring" }}>
// //           <Paper
// //             elevation={6}
// //             onClick={onClick}
// //             sx={{
// //               p: 3,
// //               borderRadius: "16px",
// //               background: "linear-gradient(145deg, #1a1c29, #222636)",
// //               border: "1px solid",
// //               borderColor: isLive
// //                 ? alpha(theme.palette.success.main, 0.6)
// //                 : isCompleted
// //                 ? alpha(theme.palette.secondary.main, 0.4)
// //                 : "divider",
// //               cursor: "pointer",
// //               position: "relative",
// //               overflow: "hidden",
// //               mb: 3,
// //             }}
// //           >
// //             {/* Teams */}
// //             <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
// //               <img
// //                 src={match.t1img}
// //                 alt={match.t1}
// //                 width={64}
// //                 height={64}
// //                 style={{ borderRadius: "50%", border: "2px solid #444" }}
// //               />
// //               <img
// //                 src={match.t2img}
// //                 alt={match.t2}
// //                 width={64}
// //                 height={64}
// //                 style={{ borderRadius: "50%", border: "2px solid #444" }}
// //               />
// //             </Box>

// //             {/* Status & Time */}
// //             <Box
// //               sx={{
// //                 display: "flex",
// //                 justifyContent: "center",
// //                 alignItems: "center",
// //                 background: "rgba(0,0,0,0.3)",
// //                 py: 1,
// //                 borderRadius: "8px",
// //                 border: "1px solid",
// //                 borderColor: "divider",
// //               }}
// //             >
// //               <Schedule sx={{ fontSize: 16, mr: 1, color: "primary.main" }} />
// //               <Tooltip title={formattedDate.full}>
// //                 <Typography variant="caption" color="white">
// //                   {isLive
// //                     ? "LIVE"
// //                     : isCompleted
// //                     ? "COMPLETED"
// //                     : `Starts: ${formattedDate.date} • ${formattedDate.time}`}
// //                 </Typography>
// //               </Tooltip>
// //             </Box>
// //           </Paper>
// //         </motion.div>
// //       </Zoom>
// //     );
// //   }
// // );

// // // ---------------- Main ----------------
// // const CricketMatches: React.FC = () => {
// //   const theme = useTheme();
// //   const router = useRouter();
// //   const [activeTab, setActiveTab] = useState(0);
// //   const { loading, error, data, refetch } = useQuery(GET_CRICKET_MATCHES, {
// //     fetchPolicy: "cache-and-network",
// //   });

// //   const categorizedMatches = useMemo(
// //     () =>
// //       data?.cricketMatches
// //         ? categorizeMatches(data.cricketMatches as Match[])
// //         : { live: [], upcoming: [], completed: [] },
// //     [data]
// //   );

// //   return (
// //     <main>
// //       {/* Background */}
// //       <Box
// //         sx={{
// //           position: "fixed",
// //           inset: 0,
// //           background:
// //             "radial-gradient(circle at top, #0f2027, #203a43, #2c5364)",
// //           zIndex: -1,
// //         }}
// //       />

// //       {/* Content */}
// //       <Box sx={{ p: 3, width: "100%", minHeight: "100vh", color: "white" }}>
// //         {/* Header */}
// //         <Box
// //           sx={{
// //             display: "flex",
// //             justifyContent: "space-between",
// //             alignItems: "center",
// //             mb: 3,
// //           }}
// //         >
// //           <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
// //             <SportsCricket sx={{ fontSize: 32, color: "primary.main" }} />
// //             <Typography variant="h4" fontWeight={800}>
// //               Cricket Matches
// //             </Typography>
// //           </Box>
// //           <Tooltip title="Refresh matches">
// //             <IconButton
// //               onClick={() => refetch()}
// //               sx={{ color: "primary.main" }}
// //             >
// //               <Refresh sx={{ fontSize: 28 }} />
// //             </IconButton>
// //           </Tooltip>
// //         </Box>

// //         {/* Tabs */}
// //         <Paper sx={{ mb: 4, background: "rgba(0,0,0,0.2)" }}>
// //           <Tabs
// //             value={activeTab}
// //             onChange={(_, v) => setActiveTab(v)}
// //             variant="fullWidth"
// //           >
// //             <Tab
// //               icon={<LiveTv />}
// //               iconPosition="start"
// //               label={`Live (${categorizedMatches.live.length})`}
// //             />
// //             <Tab
// //               icon={<Upcoming />}
// //               iconPosition="start"
// //               label={`Upcoming (${categorizedMatches.upcoming.length})`}
// //             />
// //             <Tab
// //               icon={<DoneAll />}
// //               iconPosition="start"
// //               label={`Completed (${categorizedMatches.completed.length})`}
// //             />
// //           </Tabs>
// //         </Paper>

// //         {/* Error State */}
// //         {error && (
// //           <Box textAlign="center" mt={4}>
// //             <ErrorOutline sx={{ fontSize: 60, color: "error.main" }} />
// //             <Typography mt={2}>
// //               Failed to load matches. Try refreshing.
// //             </Typography>
// //           </Box>
// //         )}

// //         {/* Matches */}
// //         {loading ? (
// //           <Grid container spacing={3}>
// //             {Array.from({ length: 6 }).map((_, idx) => (
// //               <Grid item xs={12} md={6} lg={4} key={idx}>
// //                 <MatchSkeleton />
// //               </Grid>
// //             ))}
// //           </Grid>
// //         ) : (
// //           <Grid container spacing={3}>
// //             {(activeTab === 0
// //               ? categorizedMatches.live
// //               : activeTab === 1
// //               ? categorizedMatches.upcoming
// //               : categorizedMatches.completed
// //             ).map((match) => (
// //               <Grid item xs={12} md={6} lg={4} key={match.id}>
// //                 <MatchCard
// //                   match={match}
// //                   onClick={() => router.push(`/betWhich?matchId=${match.id}`)}
// //                 />
// //               </Grid>
// //             ))}
// //           </Grid>
// //         )}
// //       </Box>
// //     </main>
// //   );
// // };

// // export default CricketMatches;

"use client";

import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client/react";
import { GET_CRICKET_MATCHES } from "@/graphql/mutations";
import { useRouter } from "next/navigation";
import {
  Box,
  Paper,
  Typography,
  CircularProgress,
  Chip,
  Avatar,
  IconButton,
  Tooltip,
  Fade,
  Zoom,
  alpha,
  useTheme,
  Grid,
  Tabs,
  Tab,
  Button,
  Alert,
  Snackbar,
  Slide,
  Card,
  CardContent,
  Container,
  InputAdornment,
  TextField,
  Badge,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  SportsCricket,
  Refresh,
  Info,
  LiveTv,
  Upcoming,
  DoneAll,
  Schedule,
  Search,
  FilterList,
  TrendingUp,
  EmojiEvents,
  LocationOn,
  StarBorder,
  Star,
  NotificationsNone,
  NotificationsActive,
  Sort,
  CalendarMonth,
} from "@mui/icons-material";
import { styled, keyframes } from "@mui/system";

// Animations
const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
`;

const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0px); }
`;

// Styled Components
const AnimatedCard = styled(Paper)(({ theme }) => ({
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: theme.shadows[8],
  },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 10,
    top: 10,

    border: `2px solid ${theme.palette.background.default}`,

    padding: "0 4px",
    animation: `${pulse} 2s infinite`,
  },
}));

const ShimmerBox = styled(Box)(({ theme }) => ({
  background: `linear-gradient(90deg, ${theme.palette.grey[800]} 0%, ${theme.palette.grey[700]} 50%, ${theme.palette.grey[800]} 100%)`,
  backgroundSize: "200px 100%",
  animation: `${shimmer} 1.5s infinite`,
  borderRadius: "4px",
}));

// Skeleton loader
const MatchSkeleton = () => (
  <Fade in timeout={800}>
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: "16px",
        background: "linear-gradient(145deg, #1a1c29, #222636)",
        border: "1px solid",
        borderColor: "divider",
        opacity: 0.8,
        position: "relative",
        overflow: "hidden",
        "&:before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
        },
        mb: 2.5,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <ShimmerBox sx={{ width: "40%", height: 16, borderRadius: 1 }} />
        <ShimmerBox sx={{ width: 80, height: 24, borderRadius: 16 }} />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2.5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "40%",
          }}
        >
          <ShimmerBox
            sx={{ width: 60, height: 60, borderRadius: "50%", mb: 1.5 }}
          />
          <ShimmerBox
            sx={{ width: "80%", height: 14, borderRadius: 1, mb: 1 }}
          />
          <ShimmerBox sx={{ width: 30, height: 20, borderRadius: 1 }} />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "20%",
          }}
        >
          <ShimmerBox sx={{ width: 30, height: 14, borderRadius: 1 }} />
          <ShimmerBox
            sx={{ width: 60, height: 24, borderRadius: 16, mt: 1.5 }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "40%",
          }}
        >
          <ShimmerBox
            sx={{ width: 60, height: 60, borderRadius: "50%", mb: 1.5 }}
          />
          <ShimmerBox
            sx={{ width: "80%", height: 14, borderRadius: 1, mb: 1 }}
          />
          <ShimmerBox sx={{ width: 30, height: 20, borderRadius: 1 }} />
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <ShimmerBox sx={{ width: "70%", height: 14, borderRadius: 1 }} />
      </Box>
    </Paper>
  </Fade>
);

// Format match date
const formatMatchDate = (dateString: string) => {
  const date = new Date(dateString);
  return {
    date: date.toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
    }),
    time: date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }),
    full: date.toLocaleString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }),
  };
};

// Categorize matches
const categorizeMatches = (matches: any[]) => {
  const now = new Date();
  return matches.reduce(
    (acc, match) => {
      const matchDate = new Date(match.dateTimeGMT);
      const isLive = match.status.toLowerCase().includes("live");
      const isCompleted =
        match.status.toLowerCase().includes("complete") ||
        match.status.toLowerCase().includes("finished") ||
        (matchDate < now && !isLive);

      if (isLive) acc.live.push(match);
      else if (isCompleted) acc.completed.push(match);
      else acc.upcoming.push(match);

      return acc;
    },
    { live: [], upcoming: [], completed: [] }
  );
};

// Match Card
const MatchCard = ({
  match,
  onClick,
  isFavorite,
  onToggleFavorite,
}: {
  match: any;
  onClick: () => void;
  isFavorite: boolean;
  onToggleFavorite: (matchId: string) => void;
}) => {
  const theme = useTheme();
  const formattedDate = formatMatchDate(match.dateTimeGMT);
  const isLive = match.status.toLowerCase().includes("live");
  const isCompleted =
    match.status.toLowerCase().includes("complete") ||
    match.status.toLowerCase().includes("finished");

  return (
    <Zoom in timeout={600}>
      <AnimatedCard
        elevation={8}
        sx={{
          p: 3,
          borderRadius: "16px",
          background: "linear-gradient(145deg, #1a1c29, #222636)",
          border: "1px solid",
          borderColor: isLive
            ? alpha(theme.palette.success.main, 0.3)
            : isCompleted
            ? alpha(theme.palette.secondary.main, 0.3)
            : alpha(theme.palette.primary.main, 0.2),
          cursor: "pointer",
          position: "relative",
          overflow: "hidden",
          mb: 3,
          "&:before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
          },
          "&:after": isLive
            ? {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `linear-gradient(45deg, ${alpha(
                  theme.palette.success.main,
                  0.05
                )} 0%, transparent 70%)`,
                pointerEvents: "none",
              }
            : {},
        }}
      >
        {/* Favorite Button */}
        <IconButton
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            zIndex: 10,
            color: isFavorite
              ? theme.palette.warning.main
              : "rgba(255,255,255,0.5)",
            animation: isFavorite ? `${float} 3s ease-in-out infinite` : "none",
            "&:hover": {
              color: theme.palette.warning.main,
              background: alpha(theme.palette.warning.main, 0.1),
            },
          }}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(match.id);
          }}
        >
          {isFavorite ? <Star /> : <StarBorder />}
        </IconButton>

        {/* Match Series Info */}
        {match.matchType && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 2,
              background: alpha(theme.palette.primary.main, 0.1),
              py: 0.5,
              borderRadius: "12px",
              border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
            }}
          >
            <EmojiEvents sx={{ fontSize: 16, mr: 1, color: "primary.main" }} />
            <Typography
              variant="caption"
              sx={{ color: "primary.main", fontWeight: 600 }}
            >
              {match.matchType}
            </Typography>
          </Box>
        )}

        {/* Teams Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "40%",
            }}
          >
            <Avatar
              src={match.t1img}
              alt={match.t1}
              sx={{
                width: 70,
                height: 70,
                border: "2px solid",
                borderColor: alpha(theme.palette.primary.main, 0.3),
                mb: 1,
              }}
            />
            <Typography
              variant="body1"
              sx={{ fontWeight: 600, textAlign: "center" }}
            >
              {match.t1}
            </Typography>
            {match.t1s && (
              <Typography variant="h6" sx={{ fontWeight: 800, mt: 1 }}>
                {match.t1s}
              </Typography>
            )}
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "20%",
            }}
          >
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              VS
            </Typography>
            {isLive ? (
              <Chip
                icon={<LiveTv />}
                label="LIVE"
                color="error"
                size="small"
                sx={{
                  mt: 1,
                  fontWeight: 700,
                  animation: `${pulse} 2s infinite`,
                }}
              />
            ) : (
              <Chip
                label={isCompleted ? "COMPLETED" : "UPCOMING"}
                color={isCompleted ? "secondary" : "primary"}
                size="small"
                sx={{ mt: 1, fontWeight: 700 }}
              />
            )}
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "40%",
            }}
          >
            <Avatar
              src={match.t2img}
              alt={match.t2}
              sx={{
                width: 70,
                height: 70,
                border: "2px solid",
                borderColor: alpha(theme.palette.secondary.main, 0.3),
                mb: 1,
              }}
            />
            <Typography
              variant="body1"
              sx={{ fontWeight: 600, textAlign: "center" }}
            >
              {match.t2}
            </Typography>
            {match.t2s && (
              <Typography variant="h6" sx={{ fontWeight: 800, mt: 1 }}>
                {match.t2s}
              </Typography>
            )}
          </Box>
        </Box>

        {/* Match Status/Time */}
        <Box
          onClick={onClick}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: alpha(theme.palette.primary.main, 0.1),
            py: 1,
            borderRadius: "8px",
            border: "1px solid",
            borderColor: alpha(theme.palette.primary.main, 0.2),
            transition: "all 0.2s ease",
            "&:hover": {
              background: alpha(theme.palette.primary.main, 0.2),
            },
          }}
        >
          <Schedule sx={{ fontSize: 16, mr: 1, color: "primary.main" }} />
          <Tooltip title={formattedDate.full}>
            <Typography
              variant="caption"
              sx={{ color: "primary.main", fontWeight: 500 }}
            >
              {isLive
                ? "LIVE NOW"
                : isCompleted
                ? "COMPLETED"
                : `Starts: ${formattedDate.date} • ${formattedDate.time}`}
            </Typography>
          </Tooltip>
        </Box>

        {/* Match Venue */}
        {match.venue && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: 1,
            }}
          >
            <LocationOn
              sx={{ fontSize: 14, mr: 0.5, color: "text.secondary" }}
            />
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              {match.venue}
            </Typography>
          </Box>
        )}

        {/* Additional Info */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button
            variant="outlined"
            size="small"
            onClick={onClick}
            sx={{
              borderRadius: "20px",
              textTransform: "none",
              fontSize: "0.75rem",
            }}
          >
            BET NOW
          </Button>

          <Tooltip title="Set notification">
            <IconButton size="small">
              <NotificationsNone sx={{ fontSize: 20 }} />
            </IconButton>
          </Tooltip>
        </Box>
      </AnimatedCard>
    </Zoom>
  );
};

// Main Component
const CricketMatches: React.FC = () => {
  const theme = useTheme();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [sortAnchorEl, setSortAnchorEl] = useState<null | HTMLElement>(null);
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const [sortBy, setSortBy] = useState("date");
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    type: "success",
  });
  const { loading, error, data, refetch } = useQuery(GET_CRICKET_MATCHES, {
    fetchPolicy: "cache-and-network",
    pollInterval: 30000, // Auto-refresh every 30 seconds
  });

  // Load favorites from localStorage
  useEffect(() => {
    const storedFavorites = localStorage.getItem("cricketFavorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem("cricketFavorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await refetch();
      setNotification({
        open: true,
        message: "Matches refreshed successfully",
        type: "success",
      });
    } catch (err) {
      setNotification({
        open: true,
        message: "Error refreshing matches",
        type: "error",
      });
    } finally {
      setTimeout(() => setRefreshing(false), 800);
    }
  };

  const handleToggleFavorite = (matchId: string) => {
    if (favorites.includes(matchId)) {
      setFavorites(favorites.filter((id) => id !== matchId));
      setNotification({
        open: true,
        message: "Removed from favorites",
        type: "info",
      });
    } else {
      setFavorites([...favorites, matchId]);
      setNotification({
        open: true,
        message: "Added to favorites",
        type: "success",
      });
    }
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  const handleSortOpen = (event: React.MouseEvent<HTMLElement>) => {
    setSortAnchorEl(event.currentTarget);
  };

  const handleSortClose = () => {
    setSortAnchorEl(null);
  };

  const handleFilterOpen = (event: React.MouseEvent<HTMLElement>) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleSortSelect = (sortType: string) => {
    setSortBy(sortType);
    handleSortClose();
  };

  const processMatches = (matches: any[]) => {
    // Filter by search query
    let filteredMatches = matches;
    if (searchQuery) {
      filteredMatches = matches.filter(
        (match) =>
          match.t1.toLowerCase().includes(searchQuery.toLowerCase()) ||
          match.t2.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (match.matchType &&
            match.matchType
              .toLowerCase()
              .includes(searchQuery.toLowerCase())) ||
          (match.venue &&
            match.venue.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Sort matches
    filteredMatches = [...filteredMatches].sort((a, b) => {
      if (sortBy === "date") {
        return (
          new Date(a.dateTimeGMT).getTime() - new Date(b.dateTimeGMT).getTime()
        );
      } else if (sortBy === "popularity") {
        // This would require actual popularity data, using favorites as a proxy
        const aIsFavorite = favorites.includes(a.id);
        const bIsFavorite = favorites.includes(b.id);
        return aIsFavorite === bIsFavorite ? 0 : aIsFavorite ? -1 : 1;
      }
      return 0;
    });

    return filteredMatches;
  };

  const categorizedMatches = data?.cricketMatches
    ? categorizeMatches(processMatches(data.cricketMatches))
    : { live: [], upcoming: [], completed: [] };

  return (
    <>
      {/* Full-screen background */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "radial-gradient(circle at top, #0f2027, #203a43, #2c5364)",
          zIndex: -1,
        }}
      />

      {/* Animated background elements */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "url('/cricket-pattern.png')",
          opacity: 0.03,
          zIndex: -1,
          pointerEvents: "none",
        }}
      />

      {/* Page content */}
      <Container
        maxWidth="xl"
        sx={{ position: "relative", zIndex: 1, p: 3, minHeight: "100vh" }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <SportsCricket
              sx={{
                fontSize: 32,
                color: "primary.main",
                animation: `${float} 3s ease-in-out infinite`,
              }}
            />
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                color: "white",
                background: "linear-gradient(45deg, #fff, #42a5f5)",
                backgroundClip: "text",
                textFillColor: "transparent",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Cricket Hub
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <TextField
              placeholder="Search matches..."
              variant="outlined"
              size="small"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{
                width: 250,
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  borderRadius: "20px",
                  background: alpha(theme.palette.background.paper, 0.1),
                  "& fieldset": {
                    borderColor: alpha(theme.palette.primary.main, 0.3),
                  },
                  "&:hover fieldset": {
                    borderColor: alpha(theme.palette.primary.main, 0.5),
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: theme.palette.primary.main,
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search
                      sx={{ color: alpha(theme.palette.common.white, 0.7) }}
                    />
                  </InputAdornment>
                ),
              }}
            />

            <Tooltip title="Sort matches">
              <IconButton
                onClick={handleSortOpen}
                sx={{ color: "primary.main" }}
              >
                <Sort />
              </IconButton>
            </Tooltip>

            <Tooltip title="Filter matches">
              <IconButton
                onClick={handleFilterOpen}
                sx={{ color: "primary.main" }}
              >
                <FilterList />
              </IconButton>
            </Tooltip>

            <Tooltip title="Refresh matches">
              <IconButton
                onClick={handleRefresh}
                disabled={refreshing}
                sx={{ color: "primary.main" }}
              >
                <Refresh
                  sx={{
                    fontSize: 28,
                    transition: "transform 0.5s",
                    transform: refreshing ? "rotate(360deg)" : "rotate(0deg)",
                  }}
                />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* Stats Overview */}
        <Slide direction="down" in timeout={800}>
          <Box sx={{ display: "flex", gap: 2, mb: 4, flexWrap: "wrap" }}>
            <Card
              sx={{
                background: "linear-gradient(45deg, #2196f3, #1976d2)",
                color: "white",
                flex: 1,
                minWidth: 200,
                borderRadius: "12px",
              }}
            >
              <CardContent sx={{ display: "flex", alignItems: "center" }}>
                <LiveTv sx={{ fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography variant="h4" fontWeight="bold">
                    {categorizedMatches.live.length}
                  </Typography>
                  <Typography variant="body2">Live Matches</Typography>
                </Box>
              </CardContent>
            </Card>

            <Card
              sx={{
                background: "linear-gradient(45deg, #4caf50, #2e7d32)",
                color: "white",
                flex: 1,
                minWidth: 200,
                borderRadius: "12px",
              }}
            >
              <CardContent sx={{ display: "flex", alignItems: "center" }}>
                <Upcoming sx={{ fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography variant="h4" fontWeight="bold">
                    {categorizedMatches.upcoming.length}
                  </Typography>
                  <Typography variant="body2">Upcoming Matches</Typography>
                </Box>
              </CardContent>
            </Card>

            <Card
              sx={{
                background: "linear-gradient(45deg, #9e9e9e, #616161)",
                color: "white",
                flex: 1,
                minWidth: 200,
                borderRadius: "12px",
              }}
            >
              <CardContent sx={{ display: "flex", alignItems: "center" }}>
                <DoneAll sx={{ fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography variant="h4" fontWeight="bold">
                    {categorizedMatches.completed.length}
                  </Typography>
                  <Typography variant="body2">Completed Matches</Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Slide>

        {/* Tabs */}
        <Paper
          sx={{
            mb: 4,
            background: alpha(theme.palette.background.paper, 0.1),
            backdropFilter: "blur(10px)",
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          <Tabs
            value={activeTab}
            onChange={(e, v) => setActiveTab(v)}
            variant="fullWidth"
            textColor="primary"
            indicatorColor="primary"
            sx={{
              "& .MuiTab-root": {
                fontSize: "0.9rem",
                fontWeight: 600,
                py: 2,
                color: "rgba(255,255,255,0.7)",
                "&.Mui-selected": {
                  color: theme.palette.primary.main,
                },
              },
            }}
          >
            <Tab
              icon={
                <StyledBadge
                  badgeContent={categorizedMatches.live.length}
                  color="error"
                >
                  <LiveTv />
                </StyledBadge>
              }
              iconPosition="start"
              label="Live Matches"
            />
            <Tab
              icon={
                <StyledBadge
                  badgeContent={categorizedMatches.upcoming.length}
                  color="primary"
                >
                  <Upcoming />
                </StyledBadge>
              }
              iconPosition="start"
              label="Upcoming Matches"
            />
            <Tab
              icon={
                <StyledBadge
                  badgeContent={categorizedMatches.completed.length}
                  color="secondary"
                >
                  <DoneAll />
                </StyledBadge>
              }
              iconPosition="start"
              label="Completed Matches"
            />
          </Tabs>
        </Paper>

        {/* Matches Grid */}
        {loading ? (
          <Grid container spacing={3}>
            {Array.from({ length: 6 }).map((_, idx) => (
              <Grid item xs={12} md={6} lg={4} key={idx}>
                <MatchSkeleton />
              </Grid>
            ))}
          </Grid>
        ) : error ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              py: 10,
              textAlign: "center",
            }}
          >
            <Typography variant="h6" color="error" gutterBottom>
              Failed to load matches
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
              {error.message}
            </Typography>
            <Button
              variant="contained"
              onClick={handleRefresh}
              startIcon={<Refresh />}
            >
              Try Again
            </Button>
          </Box>
        ) : (
          <Box>
            {activeTab === 0 && categorizedMatches.live.length === 0 && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  py: 10,
                  textAlign: "center",
                }}
              >
                <LiveTv sx={{ fontSize: 60, color: "text.secondary", mb: 2 }} />
                <Typography
                  variant="h6"
                  sx={{ color: "text.secondary" }}
                  gutterBottom
                >
                  No live matches right now
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", mb: 3 }}
                >
                  Check back later for live cricket action
                </Typography>
              </Box>
            )}

            {activeTab === 1 && categorizedMatches.upcoming.length === 0 && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  py: 10,
                  textAlign: "center",
                }}
              >
                <Upcoming
                  sx={{ fontSize: 60, color: "text.secondary", mb: 2 }}
                />
                <Typography
                  variant="h6"
                  sx={{ color: "text.secondary" }}
                  gutterBottom
                >
                  No upcoming matches scheduled
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", mb: 3 }}
                >
                  New matches will appear here when scheduled
                </Typography>
              </Box>
            )}

            {activeTab === 2 && categorizedMatches.completed.length === 0 && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  py: 10,
                  textAlign: "center",
                }}
              >
                <DoneAll
                  sx={{ fontSize: 60, color: "text.secondary", mb: 2 }}
                />
                <Typography
                  variant="h6"
                  sx={{ color: "text.secondary" }}
                  gutterBottom
                >
                  No completed matches
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", mb: 3 }}
                >
                  Completed matches will appear here
                </Typography>
              </Box>
            )}

            <Grid container spacing={3}>
              {(activeTab === 0
                ? categorizedMatches.live
                : activeTab === 1
                ? categorizedMatches.upcoming
                : categorizedMatches.completed
              ).map((match: any) => (
                <Grid item xs={12} md={6} lg={4} key={match.id}>
                  <MatchCard
                    match={match}
                    onClick={() => router.push(`/betWhich?matchId=${match.id}`)}
                    isFavorite={favorites.includes(match.id)}
                    onToggleFavorite={handleToggleFavorite}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Sort Menu */}
        <Menu
          anchorEl={sortAnchorEl}
          open={Boolean(sortAnchorEl)}
          onClose={handleSortClose}
          PaperProps={{
            sx: {
              background: theme.palette.background.default,
              mt: 1,
              borderRadius: "12px",
              minWidth: 200,
            },
          }}
        >
          <MenuItem
            onClick={() => handleSortSelect("date")}
            selected={sortBy === "date"}
          >
            <ListItemIcon>
              <CalendarMonth fontSize="small" />
            </ListItemIcon>
            <ListItemText>Sort by Date</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={() => handleSortSelect("popularity")}
            selected={sortBy === "popularity"}
          >
            <ListItemIcon>
              <TrendingUp fontSize="small" />
            </ListItemIcon>
            <ListItemText>Sort by Popularity</ListItemText>
          </MenuItem>
        </Menu>

        {/* Filter Menu */}
        <Menu
          anchorEl={filterAnchorEl}
          open={Boolean(filterAnchorEl)}
          onClose={handleFilterClose}
          PaperProps={{
            sx: {
              background: theme.palette.background.default,
              mt: 1,
              borderRadius: "12px",
              minWidth: 200,
            },
          }}
        >
          <MenuItem onClick={handleFilterClose}>
            <ListItemText>International</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleFilterClose}>
            <ListItemText>Domestic</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleFilterClose}>
            <ListItemText>T20</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleFilterClose}>
            <ListItemText>ODI</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleFilterClose}>
            <ListItemText>Test</ListItemText>
          </MenuItem>
        </Menu>

        {/* Notification Snackbar */}
        <Snackbar
          open={notification.open}
          autoHideDuration={3000}
          onClose={handleCloseNotification}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert
            onClose={handleCloseNotification}
            severity={notification.type as any}
            sx={{ width: "100%" }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
};

export default CricketMatches;
