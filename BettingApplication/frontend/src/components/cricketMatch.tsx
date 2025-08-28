// "use client";

// import React, { useState, useEffect } from "react";
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
// } from "@mui/material";
// import {
//   SportsCricket,
//   Refresh,
//   Info,
//   Stadium,
//   Schedule,
// } from "@mui/icons-material";

// // Skeleton loader for better loading state
// const MatchSkeleton = () => (

//   <Fade in={true} timeout={800}>
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
//           background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
//         },
//         mb: 2.5,
//       }}
//     >
//       <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
//         <Box sx={{ width: "40%", height: 12, bgcolor: "grey.700", borderRadius: 1 }} />
//         <Box sx={{ width: 80, height: 24, bgcolor: "grey.700", borderRadius: 16 }} />
//       </Box>

//       <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2.5 }}>
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

//       <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
//         <Box sx={{ width: "70%", height: 14, bgcolor: "grey.700", borderRadius: 1 }} />
//       </Box>
//     </Paper>
//   </Fade>
// );

// // Format match date with better presentation
// const formatMatchDate = (dateString: string) => {
//   const date = new Date(dateString);
//   return {
//     date: date.toLocaleDateString("en-US", { weekday: 'short', day: 'numeric', month: 'short' }),
//     time: date.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit', hour12: true }),
//     full: date.toLocaleString("en-US", {
//       weekday: 'long',
//       day: 'numeric',
//       month: 'long',
//       year: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//       hour12: true
//     })
//   };
// };

// const CricketMatches: React.FC = () => {
//   const theme = useTheme();
//   const [refreshing, setRefreshing] = useState(false);
//   const { loading, error, data, refetch } = useQuery(GET_CRICKET_MATCHES, {
//     fetchPolicy: "cache-and-network",
//   });
//   const router = useRouter();

//   const handleRefresh = async () => {
//     setRefreshing(true);
//     try {
//       await refetch();
//     } catch (err) {
//       console.error("Error refreshing matches:", err);
//     } finally {
//       setTimeout(() => setRefreshing(false), 800);
//     }
//   };

//   if (error) {
//     return (
//       <Box sx={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         minHeight: "50vh",
//         flexDirection: "column",
//         gap: 2
//       }}>
//         <Typography variant="h6" color="error" align="center">
//           Failed to load matches
//         </Typography>
//         <Typography variant="body2" color="text.secondary" align="center">
//           {error.message}
//         </Typography>
//         <IconButton
//           onClick={() => refetch()}
//           color="primary"
//           sx={{ mt: 1 }}
//         >
//           <Refresh />
//         </IconButton>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{
//       p: 3,
//       display: "flex",
//       flexDirection: "column",
//        width: "100vw",
//       margin: "0 auto",
//       background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
//       minHeight: "100vh"
//     }}>
//       {/* Header Section */}
//       <Box sx={{
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center",
//         mb: 3,
//         background: "rgba(255, 255, 255, 0.05)",
//         p: 2,
//         borderRadius: "12px",
//         border: "1px solid",
//         borderColor: alpha(theme.palette.primary.main, 0.2),
//         backdropFilter: "blur(10px)"
//       }}>
//         <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
//           <SportsCricket sx={{
//             fontSize: 32,
//             color: "primary.main",
//             filter: "drop-shadow(0 0 8px rgba(0, 245, 255, 0.6))"
//           }} />
//           <Typography
//             variant="h4"
//             sx={{
//               fontWeight: 800,
//               background: "linear-gradient(90deg, #00f5ff, #ff00d4, #00f5ff)",
//               backgroundSize: "200% auto",
//               backgroundClip: "text",
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//               animation: "shine 3s linear infinite",
//               "@keyframes shine": {
//                 "0%": { backgroundPosition: "0% center" },
//                 "100%": { backgroundPosition: "200% center" }
//               }
//             }}
//           >
//             Cricket Matches
//           </Typography>
//         </Box>

//         <Tooltip title="Refresh matches">
//           <IconButton
//             onClick={handleRefresh}
//             disabled={refreshing}
//             sx={{
//               color: "primary.main",
//               transition: "transform 0.3s ease",
//               "&:hover": {
//                 transform: "rotate(90deg)",
//                 background: alpha(theme.palette.primary.main, 0.1)
//               }
//             }}
//           >
//             <Refresh sx={{ fontSize: 28 }} />
//           </IconButton>
//         </Tooltip>
//       </Box>

//       {/* Subtitle */}
//       <Typography
//         variant="subtitle1"
//         align="center"
//         sx={{
//           mb: 4,
//           color: "rgba(255, 255, 255, 0.7)",
//           fontStyle: "italic",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           gap: 1
//         }}
//       >
//         <Info sx={{ fontSize: 18 }} />
//         Live scores and upcoming matches from around the world
//       </Typography>

//       {/* Matches List */}
//       {loading && !data ? (
//         // Show skeleton loaders while loading
//         Array.from({ length: 3 }).map((_, index) => (
//           <MatchSkeleton key={index} />
//         ))
//       ) : (
//         <Zoom in={!loading} timeout={500}>
//           <Box>
//             {data?.cricketMatches?.length === 0 ? (
//               <Box sx={{
//                 textAlign: "center",
//                 py: 8,
//                 background: "rgba(0, 0, 0, 0.2)",
//                 borderRadius: "16px",
//                 border: "1px dashed",
//                 borderColor: "divider"
//               }}>
//                 <Stadium sx={{ fontSize: 48, color: "text.secondary", mb: 2 }} />
//                 <Typography variant="h6" color="text.secondary">
//                   No matches scheduled at the moment
//                 </Typography>
//               </Box>
//             ) : (
//               data?.cricketMatches?.map((match: any, index: number) => {
//                 const formattedDate = formatMatchDate(match.dateTimeGMT);
//                 const isLive = match.status.toLowerCase().includes("live");

//                 return (
//                   <Fade in={true} timeout={800} key={match.id} style={{ transitionDelay: `${index * 100}ms` }}>
//                     <Paper

//                       elevation={8}

//      onClick={() => router.push("/betWhich")}
//                       sx={{
//                         p: 3,
//                         borderRadius: "16px",
//                         background: "linear-gradient(145deg, #1a1c29, #222636)",
//                         border: "1px solid",
//                         borderColor: isLive ? alpha(theme.palette.success.main, 0.3) : "divider",
//                         cursor: "pointer",
//                         transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
//                         position: "relative",
//                         overflow: "hidden",
//                         mb: 3,
//                         "&:before": {
//                           content: '""',
//                           position: "absolute",
//                           top: 0,
//                           left: 0,
//                           right: 0,
//                           height: "1px",
//                           background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
//                         },
//                         "&:hover": {
//                           transform: "translateY(-5px)",
//                           boxShadow: isLive
//                             ? "0 0 30px rgba(76, 175, 80, 0.4), 0 0 60px rgba(0, 245, 255, 0.2)"
//                             : "0 0 30px rgba(255, 0, 212, 0.3), 0 0 60px rgba(0, 245, 255, 0.2)",
//                           borderColor: isLive
//                             ? alpha(theme.palette.success.main, 0.6)
//                             : alpha(theme.palette.primary.main, 0.6),
//                         },
//                       }}
//                     >
//                       {/* Series and Status */}
//                       <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2.5 }}>
//                         <Typography
//                           variant="overline"
//                           sx={{
//                             color: "primary.main",
//                             fontWeight: 600,
//                             fontSize: "0.7rem",
//                             letterSpacing: 1
//                           }}
//                         >
//                           {match.series}
//                         </Typography>
//                         <Chip
//                           icon={isLive ? <SportsCricket /> : <Schedule />}
//                           label={match.status}
//                           size="small"
//                           sx={{
//                             background: isLive
//                               ? "linear-gradient(45deg, #4caf50, #00c853)"
//                               : "linear-gradient(45deg, #ff9800, #ff6d00)",
//                             color: "white",
//                             fontWeight: "bold",
//                             fontSize: "0.65rem",
//                             height: 24,
//                             "& .MuiChip-icon": {
//                               color: "white",
//                               fontSize: 16
//                             }
//                           }}
//                         />
//                       </Box>

//                       {/* Teams Section */}
//                       <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
//                         {/* Team 1 */}
//                         <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "40%" }}>
//                           <Avatar
//                             src={match.t1img}
//                             alt={match.t1}
//                             sx={{
//                               width: 70,
//                               height: 70,
//                               mb: 2,
//                               border: "2px solid",
//                               borderColor: alpha(theme.palette.primary.main, 0.3),
//                               boxShadow: "0 0 15px rgba(0, 245, 255, 0.3)",
//                               transition: "all 0.3s ease",
//                               "&:hover": {
//                                 transform: "scale(1.1)",
//                                 boxShadow: "0 0 20px rgba(0, 245, 255, 0.6)",
//                               }
//                             }}
//                           />
//                           <Typography
//                             variant="subtitle1"
//                             align="center"
//                             sx={{
//                               fontWeight: "bold",
//                               fontSize: "0.9rem",
//                               mb: 0.5
//                             }}
//                           >
//                             {match.t1}
//                           </Typography>
//                           {match.t1s && (
//                             <Typography
//                               variant="h5"
//                               sx={{
//                                 fontWeight: "bold",
//                                 mt: 0.5,
//                                 color: isLive ? "success.main" : "white",
//                                 textShadow: isLive ? "0 0 8px rgba(76, 175, 80, 0.6)" : "none"
//                               }}
//                             >
//                               {match.t1s}
//                             </Typography>
//                           )}
//                         </Box>

//                         {/* VS and Match Info */}
//                         <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "20%" }}>
//                           <Typography
//                             variant="overline"
//                             sx={{
//                               color: alpha(theme.palette.secondary.main, 0.8),
//                               fontWeight: "bold",
//                               fontSize: "0.75rem",
//                               letterSpacing: 1
//                             }}
//                           >
//                             VS
//                           </Typography>
//                           <Chip
//                             label={match.matchType.toUpperCase()}
//                             size="small"
//                             sx={{
//                               background: alpha(theme.palette.primary.main, 0.15),
//                               color: theme.palette.primary.main,
//                               fontWeight: "bold",
//                               fontSize: "0.6rem",
//                               mt: 1.5,
//                               height: 24
//                             }}
//                           />
//                         </Box>

//                         {/* Team 2 */}
//                         <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "40%" }}>
//                           <Avatar
//                             src={match.t2img}
//                             alt={match.t2}
//                             sx={{
//                               width: 70,
//                               height: 70,
//                               mb: 2,
//                               border: "2px solid",
//                               borderColor: alpha(theme.palette.secondary.main, 0.3),
//                               boxShadow: "0 0 15px rgba(255, 0, 212, 0.3)",
//                               transition: "all 0.3s ease",
//                               "&:hover": {
//                                 transform: "scale(1.1)",
//                                 boxShadow: "0 0 20px rgba(255, 0, 212, 0.6)",
//                               }
//                             }}
//                           />
//                           <Typography
//                             variant="subtitle1"
//                             align="center"
//                             sx={{
//                               fontWeight: "bold",
//                               fontSize: "0.9rem",
//                               mb: 0.5
//                             }}
//                           >
//                             {match.t2}
//                           </Typography>
//                           {match.t2s && (
//                             <Typography
//                               variant="h5"
//                               sx={{
//                                 fontWeight: "bold",
//                                 mt: 0.5,
//                                 color: isLive ? "success.main" : "white",
//                                 textShadow: isLive ? "0 0 8px rgba(76, 175, 80, 0.6)" : "none"
//                               }}
//                             >
//                               {match.t2s}
//                             </Typography>
//                           )}
//                         </Box>
//                       </Box>

//                       {/* Match Time */}
//                       <Box sx={{
//                         display: "flex",
//                         justifyContent: "center",
//                         alignItems: "center",
//                         background: "rgba(0, 0, 0, 0.3)",
//                         py: 1,
//                         borderRadius: "8px",
//                         border: "1px solid",
//                         borderColor: "divider"
//                       }}>
//                         <Schedule sx={{ fontSize: 16, mr: 1, color: "primary.main" }} />
//                         <Tooltip title={formattedDate.full}>
//                           <Typography variant="caption" sx={{ fontWeight: "500", fontSize: "0.75rem" }}>
//                             {isLive ? "LIVE" : `Starts: ${formattedDate.date} • ${formattedDate.time}`}
//                           </Typography>
//                         </Tooltip>
//                       </Box>
//                     </Paper>
//                   </Fade>
//                 );
//               })
//             )}
//           </Box>
//         </Zoom>
//       )}
//     </Box>
//   );
// };

// export default CricketMatches;

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
} from "@mui/material";
import {
  SportsCricket,
  Refresh,
  Info,
  Stadium,
  Schedule,
  LiveTv,
  Upcoming,
  DoneAll,
} from "@mui/icons-material";

// Skeleton loader for better loading state
const MatchSkeleton = () => (
  <Fade in={true} timeout={800}>
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        borderRadius: "16px",
        background: "linear-gradient(145deg, #1a1c29, #222636)",
        border: "1px solid",
        borderColor: "divider",
        cursor: "pointer",
        transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
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
            width: "40%",
            height: 12,
            bgcolor: "grey.700",
            borderRadius: 1,
          }}
        />
        <Box
          sx={{ width: 80, height: 24, bgcolor: "grey.700", borderRadius: 16 }}
        />
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
          <Box
            sx={{
              width: 60,
              height: 60,
              bgcolor: "grey.700",
              borderRadius: "50%",
              mb: 1.5,
            }}
          />
          <Box
            sx={{
              width: "80%",
              height: 14,
              bgcolor: "grey.700",
              borderRadius: 1,
              mb: 1,
            }}
          />
          <Box
            sx={{ width: 30, height: 20, bgcolor: "grey.800", borderRadius: 1 }}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "20%",
          }}
        >
          <Box
            sx={{ width: 30, height: 14, bgcolor: "grey.700", borderRadius: 1 }}
          />
          <Box
            sx={{
              width: 60,
              height: 24,
              bgcolor: "grey.800",
              borderRadius: 16,
              mt: 1.5,
            }}
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
          <Box
            sx={{
              width: 60,
              height: 60,
              bgcolor: "grey.700",
              borderRadius: "50%",
              mb: 1.5,
            }}
          />
          <Box
            sx={{
              width: "80%",
              height: 14,
              bgcolor: "grey.700",
              borderRadius: 1,
              mb: 1,
            }}
          />
          <Box
            sx={{ width: 30, height: 20, bgcolor: "grey.800", borderRadius: 1 }}
          />
        </Box>
      </Box>

      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Box
          sx={{
            width: "70%",
            height: 14,
            bgcolor: "grey.700",
            borderRadius: 1,
          }}
        />
      </Box>
    </Paper>
  </Fade>
);

// Format match date with better presentation
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

// Categorize matches into Live, Upcoming, and Completed
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

      if (isLive) {
        acc.live.push(match);
      } else if (isCompleted) {
        acc.completed.push(match);
      } else {
        acc.upcoming.push(match);
      }

      return acc;
    },
    { live: [], upcoming: [], completed: [] }
  );
};

// Match Card Component
const MatchCard = ({ match, onClick }: { match: any; onClick: () => void }) => {
  const theme = useTheme();
  const formattedDate = formatMatchDate(match.dateTimeGMT);
  const isLive = match.status.toLowerCase().includes("live");
  const isCompleted =
    match.status.toLowerCase().includes("complete") ||
    match.status.toLowerCase().includes("finished");

  return (
    <Fade in={true} timeout={800}>
      <Paper
        elevation={8}
        onClick={onClick}
        sx={{
          p: 3,
          borderRadius: "16px",
          background: "linear-gradient(145deg, #1a1c29, #222636)",
          border: "1px solid",
          borderColor: isLive
            ? alpha(theme.palette.success.main, 0.3)
            : isCompleted
            ? alpha(theme.palette.secondary.main, 0.3)
            : "divider",
          cursor: "pointer",
          transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
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
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: isLive
              ? "0 0 30px rgba(76, 175, 80, 0.4), 0 0 60px rgba(0, 245, 255, 0.2)"
              : isCompleted
              ? "0 0 30px rgba(156, 39, 176, 0.4), 0 0 60px rgba(0, 245, 255, 0.2)"
              : "0 0 30px rgba(255, 0, 212, 0.3), 0 0 60px rgba(0, 245, 255, 0.2)",
            borderColor: isLive
              ? alpha(theme.palette.success.main, 0.6)
              : isCompleted
              ? alpha(theme.palette.secondary.main, 0.6)
              : alpha(theme.palette.primary.main, 0.6),
          },
        }}
      >
        {/* Series and Status */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2.5,
          }}
        >
          <Typography
            variant="overline"
            sx={{
              color: "primary.main",
              fontWeight: 600,
              fontSize: "0.7rem",
              letterSpacing: 1,
            }}
          >
            {match.series}
          </Typography>
          <Chip
            icon={
              isLive ? <LiveTv /> : isCompleted ? <DoneAll /> : <Schedule />
            }
            label={match.status}
            size="small"
            sx={{
              background: isLive
                ? "linear-gradient(45deg, #4caf50, #00c853)"
                : isCompleted
                ? "linear-gradient(45deg, #9c27b0, #7b1fa2)"
                : "linear-gradient(45deg, #ff9800, #ff6d00)",
              color: "white",
              fontWeight: "bold",
              fontSize: "0.65rem",
              height: 24,
              "& .MuiChip-icon": {
                color: "white",
                fontSize: 16,
              },
            }}
          />
        </Box>

        {/* Teams Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          {/* Team 1 */}
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
                mb: 2,
                border: "2px solid",
                borderColor: alpha(theme.palette.primary.main, 0.3),
                boxShadow: "0 0 15px rgba(0, 245, 255, 0.3)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "scale(1.1)",
                  boxShadow: "0 0 20px rgba(0, 245, 255, 0.6)",
                },
              }}
            />
            <Typography
              variant="subtitle1"
              align="center"
              sx={{
                fontWeight: "bold",
                fontSize: "0.9rem",
                mb: 0.5,
              }}
            >
              {match.t1}
            </Typography>
            {match.t1s && (
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  mt: 0.5,
                  color: isLive ? "success.main" : "white",
                  textShadow: isLive
                    ? "0 0 8px rgba(76, 175, 80, 0.6)"
                    : "none",
                }}
              >
                {match.t1s}
              </Typography>
            )}
          </Box>

          {/* VS and Match Info */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "20%",
            }}
          >
            <Typography
              variant="overline"
              sx={{
                color: alpha(theme.palette.secondary.main, 0.8),
                fontWeight: "bold",
                fontSize: "0.75rem",
                letterSpacing: 1,
              }}
            >
              VS
            </Typography>
            <Chip
              label={match.matchType.toUpperCase()}
              size="small"
              sx={{
                background: alpha(theme.palette.primary.main, 0.15),
                color: theme.palette.primary.main,
                fontWeight: "bold",
                fontSize: "0.6rem",
                mt: 1.5,
                height: 24,
              }}
            />
          </Box>

          {/* Team 2 */}
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
                mb: 2,
                border: "2px solid",
                borderColor: alpha(theme.palette.secondary.main, 0.3),
                boxShadow: "0 0 15px rgba(255, 0, 212, 0.3)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "scale(1.1)",
                  boxShadow: "0 0 20px rgba(255, 0, 212, 0.6)",
                },
              }}
            />
            <Typography
              variant="subtitle1"
              align="center"
              sx={{
                fontWeight: "bold",
                fontSize: "0.9rem",
                mb: 0.5,
              }}
            >
              {match.t2}
            </Typography>
            {match.t2s && (
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  mt: 0.5,
                  color: isLive ? "success.main" : "white",
                  textShadow: isLive
                    ? "0 0 8px rgba(76, 175, 80, 0.6)"
                    : "none",
                }}
              >
                {match.t2s}
              </Typography>
            )}
          </Box>
        </Box>

        {/* Match Time */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "rgba(0, 0, 0, 0.3)",
            py: 1,
            borderRadius: "8px",
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <Schedule sx={{ fontSize: 16, mr: 1, color: "primary.main" }} />
          <Tooltip title={formattedDate.full}>
            <Typography
              variant="caption"
              sx={{ fontWeight: "500", fontSize: "0.75rem" }}
            >
              {isLive
                ? "LIVE"
                : isCompleted
                ? "COMPLETED"
                : `Starts: ${formattedDate.date} • ${formattedDate.time}`}
            </Typography>
          </Tooltip>
        </Box>
      </Paper>
    </Fade>
  );
};

const CricketMatches: React.FC = () => {
  const theme = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const { loading, error, data, refetch } = useQuery(GET_CRICKET_MATCHES, {
    fetchPolicy: "cache-and-network",
  });
  const router = useRouter();

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await refetch();
    } catch (err) {
      console.error("Error refreshing matches:", err);
    } finally {
      setTimeout(() => setRefreshing(false), 800);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  // Categorize matches
  const categorizedMatches = data?.cricketMatches
    ? categorizeMatches(data.cricketMatches)
    : { live: [], upcoming: [], completed: [] };

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "50vh",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography variant="h6" color="error" align="center">
          Failed to load matches
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          {error.message}
        </Typography>
        <IconButton onClick={() => refetch()} color="primary" sx={{ mt: 1 }}>
          <Refresh />
        </IconButton>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        p: 3,
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        margin: "0 auto",
        background:
          "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
        minHeight: "100vh",
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          background: "rgba(255, 255, 255, 0.05)",
          p: 2,
          borderRadius: "12px",
          border: "1px solid",
          borderColor: alpha(theme.palette.primary.main, 0.2),
          backdropFilter: "blur(10px)",
          width:"100%"
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <SportsCricket
            sx={{
              fontSize: 32,
              color: "primary.main",
              filter: "drop-shadow(0 0 8px rgba(0, 245, 255, 0.6))",
            }}
          />
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              background: "linear-gradient(90deg, #00f5ff, #ff00d4, #00f5ff)",
              backgroundSize: "200% auto",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "shine 3s linear infinite",
              "@keyframes shine": {
                "0%": { backgroundPosition: "0% center" },
                "100%": { backgroundPosition: "200% center" },
              },
            }}
          >
            Cricket Matches
          </Typography>
        </Box>

        <Tooltip title="Refresh matches">
          <IconButton
            onClick={handleRefresh}
            disabled={refreshing}
            sx={{
              color: "primary.main",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "rotate(90deg)",
                background: alpha(theme.palette.primary.main, 0.1),
              },
            }}
          >
            <Refresh sx={{ fontSize: 28 }} />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Subtitle */}
      <Typography
        variant="subtitle1"
        align="center"
        sx={{
          mb: 4,
          color: "rgba(255, 255, 255, 0.7)",
          fontStyle: "italic",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
        }}
      >
        <Info sx={{ fontSize: 18 }} />
        Live scores and upcoming matches from around the world
      </Typography>

      {/* Tabs for filtering */}
      <Paper
        sx={{
          mb: 4,
          background: "rgba(0, 0, 0, 0.2)",
          borderRadius: "12px",
          border: "1px solid",
          borderColor: alpha(theme.palette.primary.main, 0.1),
        }}
      >
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            "& .MuiTab-root": {
              color: "rgba(255, 255, 255, 0.7)",
              fontWeight: 600,
              fontSize: "0.9rem",
            },
            "& .Mui-selected": {
              color: "primary.main",
            },
            "& .MuiTabs-indicator": {
              background: "linear-gradient(90deg, #00f5ff, #ff00d4)",
              height: 3,
              borderRadius: 2,
            },
          }}
        >
          <Tab
            icon={<LiveTv />}
            iconPosition="start"
            label={`Live (${categorizedMatches.live.length})`}
          />
          <Tab
            icon={<Upcoming />}
            iconPosition="start"
            label={`Upcoming (${categorizedMatches.upcoming.length})`}
          />
          <Tab
            icon={<DoneAll />}
            iconPosition="start"
            label={`Completed (${categorizedMatches.completed.length})`}
          />
        </Tabs>
      </Paper>

      {/* Matches Grid */}
      {loading && !data ? (
        // Show skeleton loaders while loading
        <Grid container spacing={3}>
          {Array.from({ length: 6 }).map((_, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <MatchSkeleton />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Zoom in={!loading} timeout={500}>
          <Box>
            {/* Show all matches in a grid or filtered by tab */}
            <Grid container spacing={3}>
              {(activeTab === 0
                ? categorizedMatches.live
                : activeTab === 1
                ? categorizedMatches.upcoming
                : categorizedMatches.completed
              ).map((match: any, index: number) => (
                <Grid item xs={12} md={6} lg={4} key={match.id}>
                  <MatchCard
                    match={match}
                    //  onClick={() => router.push("/betWhich")}
                    onClick={() =>
          router.push(`/betWhich?matchId=${match.id}`)
        }
                  />
                </Grid>
              ))}
            </Grid>

            {/* Empty state for each category */}
            {activeTab === 0 && categorizedMatches.live.length === 0 && (
              <Box
                sx={{
                  textAlign: "center",
                  py: 8,
                  background: "rgba(0, 0, 0, 0.2)",
                  borderRadius: "16px",
                  border: "1px dashed",
                  borderColor: "divider",
                }}
              >
                <LiveTv sx={{ fontSize: 48, color: "text.secondary", mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                  No live matches at the moment
                </Typography>
              </Box>
            )}

            {activeTab === 1 && categorizedMatches.upcoming.length === 0 && (
              <Box
                sx={{
                  textAlign: "center",
                  py: 8,
                  background: "rgba(0, 0, 0, 0.2)",
                  borderRadius: "16px",
                  border: "1px dashed",
                  borderColor: "divider",
                }}
              >
                <Upcoming
                  sx={{ fontSize: 48, color: "text.secondary", mb: 2 }}
                />
                <Typography variant="h6" color="text.secondary">
                  No upcoming matches scheduled
                </Typography>
              </Box>
            )}

            {activeTab === 2 && categorizedMatches.completed.length === 0 && (
              <Box
                sx={{
                  textAlign: "center",
                  py: 8,
                  background: "rgba(0, 0, 0, 0.2)",
                  borderRadius: "16px",
                  border: "1px dashed",
                  borderColor: "divider",
                }}
              >
                <DoneAll
                  sx={{ fontSize: 48, color: "text.secondary", mb: 2 }}
                />
                <Typography variant="h6" color="text.secondary">
                  No completed matches
                </Typography>
              </Box>
            )}
          </Box>
        </Zoom>
      )}
    </Box>
  );
};

export default CricketMatches;
