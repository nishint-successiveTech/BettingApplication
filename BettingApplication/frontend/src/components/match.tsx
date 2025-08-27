// "use client";

// import { useQuery } from "@apollo/client/react";
// import { GET_MATCHES } from "../graphql/mutations";

// import {
//   Box,
//   Typography,
//   Card,
//   CardContent,
//   CircularProgress,
//   Chip,
//   alpha,
//   keyframes,
//   Container,
// } from "@mui/material";
// import { useRouter } from "next/navigation";
// import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
// import ScheduleIcon from "@mui/icons-material/Schedule";
// import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

// interface Match {
//   id: string;
//   teamA: string;
//   teamB: string;
//   scoreA?: number;
//   scoreB?: number;
//   status: string;
//   startTime: string;
// }

// interface MatchesData {
//   matches: Match[];
// }

// // Gradient animation
// const gradientAnimation = keyframes`
//   0% { background-position: 0% 50%; }
//   50% { background-position: 100% 50%; }
//   100% { background-position: 0% 50%; }
// `;

// // Card hover float animation
// const floatAnimation = keyframes`
//   0% { transform: translateY(0px); }
//   50% { transform: translateY(-8px); }
//   100% { transform: translateY(0px); }
// `;

// export default function MatchesComponent() {
//   const { data, loading, error } = useQuery<MatchesData>(GET_MATCHES);
//   const router = useRouter();

//   if (loading)
//     return (
//       <Box
//         sx={{
//           width: "100vw",
//           height: "100vh",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           background: "linear-gradient(-45deg, #0f2027, #203a43, #2c5364, #0f2027)",
//           backgroundSize: "400% 400%",
//           animation: `${gradientAnimation} 15s ease infinite`,
//         }}
//       >
//         <Box sx={{ textAlign: 'center' }}>
//           <CircularProgress 
//             size={60} 
//             thickness={4}
//             sx={{ 
//               color: "#00f5ff",
//               mb: 2
//             }} 
//           />
//           <Typography variant="h6" sx={{ color: 'white', fontWeight: 300 }}>
//             Loading matches...
//           </Typography>
//         </Box>
//       </Box>
//     );

//   if (error)
//     return (
//       <Box
//         sx={{
//           width: "100vw",
//           height: "100vh",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           background: "linear-gradient(-45deg, #0f2027, #203a43, #2c5364, #0f2027)",
//           backgroundSize: "400% 400%",
//           animation: `${gradientAnimation} 15s ease infinite`,
//         }}
//       >
//         <Typography 
//           variant="h6" 
//           align="center" 
//           sx={{ 
//             color: "white", 
//             maxWidth: '500px',
//             p: 3,
//             background: 'rgba(255,0,0,0.1)',
//             borderRadius: '16px',
//             border: '1px solid rgba(255,0,0,0.2)'
//           }}
//         >
//           Error fetching matches: {error.message}
//         </Typography>
//       </Box>
//     );

//   const handleMatchClick = (matchId: string) => router.push(`/betting/${matchId}`);

//   const getStatusColor = (status: string) => {
//     switch (status.toLowerCase()) {
//       case "live":
//         return "#ff4757";
//       case "upcoming":
//         return "#2ed573";
//       case "completed":
//         return "#576574";
//       default:
//         return "#a4b0be";
//     }
//   };

//   const getStatusChip = (status: string) => (
//     <Chip
//       label={status.toUpperCase()}
//       size="small"
//       sx={{
//         backgroundColor: getStatusColor(status),
//         color: "white",
//         fontWeight: "bold",
//         fontSize: "0.7rem",
//         px: 0.5,
//       }}
//     />
//   );

//   return (
//     <Box
//       sx={{
//         width: "100vw",
//         minHeight: "100vh",
//         background: "linear-gradient(-45deg, #0f2027, #203a43, #2c5364, #0f2027)",
//         backgroundSize: "400% 400%",
//         animation: `${gradientAnimation} 15s ease infinite`,
//         position: "relative",
//         overflow: "hidden",
//         py: 2,
//         '&::before': {
//           content: '""',
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           background: 'radial-gradient(circle at 20% 30%, rgba(0, 245, 255, 0.1) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(255, 0, 212, 0.1) 0%, transparent 40%)',
//           pointerEvents: 'none'
//         }
//       }}
//     >
//       <Container maxWidth="lg" sx={{ 
//         height: "100%", 
//         display: "flex", 
//         flexDirection: "column",
//         position: "relative",
//         zIndex: 1,
//         py: 4 
//       }}>
//         <Box sx={{ textAlign: "center", mb: 4 }}>
//           <EmojiEventsIcon sx={{ 
//             fontSize: 50, 
//             color: "#FFD700", 
//             mb: 2,
//             filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.5))'
//           }} />
//           <Typography
//             variant="h3"
//             gutterBottom
//             sx={{
//               fontWeight: 800,
//               background: "linear-gradient(90deg, #00f5ff, #ff00d4, #00f5ff)",
//               backgroundSize: "300% auto",
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//               textShadow: "0 0 20px rgba(0,255,200,0.6)",
//             }}
//           >
//             LIVE MATCHES
//           </Typography>
//           <Typography variant="h6" sx={{ 
//             color: alpha('#fff', 0.7), 
//             fontWeight: 300,
//             mt: 1
//           }}>
//             Select a match to place your bets
//           </Typography>
//         </Box>

//         <Box sx={{ 
//           flex: 1, 
//           display: "flex", 
//           flexDirection: "column", 
//           gap: 3,
//           overflowY: "auto",
//           pb: 2,
//           '&::-webkit-scrollbar': {
//             width: '8px',
//           },
//           '&::-webkit-scrollbar-track': {
//             background: 'rgba(255,255,255,0.05)',
//             borderRadius: '4px',
//           },
//           '&::-webkit-scrollbar-thumb': {
//             background: 'rgba(255,255,255,0.2)',
//             borderRadius: '4px',
//           },
//           '&::-webkit-scrollbar-thumb:hover': {
//             background: 'rgba(255,255,255,0.3)',
//           }
//         }}>
//           {data?.matches?.map((match) => (
//             <Card
//               key={match.id}
//               onClick={() => handleMatchClick(match.id)}
//               sx={{
//                 background: "linear-gradient(145deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
//                 color: "#fff",
//                 borderRadius: 3,
//                 backdropFilter: "blur(12px)",
//                 border: "1px solid rgba(255,255,255,0.15)",
//                 boxShadow: "0 8px 32px rgba(0,0,0,0.2), 0 0 25px rgba(0,255,200,0.1), 0 0 50px rgba(255,0,212,0.1)",
//                 cursor: "pointer",
//                 overflow: "hidden",
//                 position: "relative",
//                 transition: "all 0.3s ease",
//                 "&:hover": {
//                   animation: `${floatAnimation} 2s ease infinite`,
//                   boxShadow: "0 12px 40px rgba(0,0,0,0.3), 0 0 35px rgba(0,255,200,0.3), 0 0 60px rgba(255,0,212,0.2)",
//                   transform: "translateY(-5px)",
//                 },
//                 '&::before': {
//                   content: '""',
//                   position: 'absolute',
//                   top: 0,
//                   left: 0,
//                   right: 0,
//                   height: '4px',
//                   background: 'linear-gradient(90deg, #00f5ff, #ff00d4)',
//                 }
//               }}
//             >
//               <CardContent sx={{ p: 4 }}>
//                 <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
//                   {getStatusChip(match.status)}
//                 </Box>

//                 <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
//                   <Box sx={{ textAlign: "center", width: "40%" }}>
//                     <SportsSoccerIcon sx={{ fontSize: 40, color: "#00f5ff", mb: 1 }} />
//                     <Typography variant="h6" sx={{ fontWeight: 600 }}>{match.teamA}</Typography>
//                   </Box>

//                   <Box sx={{ textAlign: "center", width: "20%" }}>
//                     <Box sx={{
//                       display: "flex",
//                       justifyContent: "center",
//                       alignItems: "center",
//                       width: 50,
//                       height: 50,
//                       borderRadius: "50%",
//                       background: "rgba(255,255,255,0.1)",
//                       mx: "auto",
//                       mb: 1
//                     }}>
//                       <Typography variant="h5" sx={{ fontWeight: 800 }}>VS</Typography>
//                     </Box>
//                   </Box>

//                   <Box sx={{ textAlign: "center", width: "40%" }}>
//                     <SportsSoccerIcon sx={{ fontSize: 40, color: "#ff00d4", mb: 1 }} />
//                     <Typography variant="h6" sx={{ fontWeight: 600 }}>{match.teamB}</Typography>
//                   </Box>
//                 </Box>

//                 <Box sx={{
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   background: "rgba(0,0,0,0.2)",
//                   py: 2,
//                   borderRadius: 2,
//                   mb: 3
//                 }}>
//                   <Typography variant="h3" sx={{ fontWeight: 800, letterSpacing: 2 }}>
//                     {match.scoreA ?? 0} : {match.scoreB ?? 0}
//                   </Typography>
//                 </Box>

//                 <Box sx={{
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   background: "rgba(255,255,255,0.05)",
//                   py: 1.5,
//                   borderRadius: 2
//                 }}>
//                   <ScheduleIcon sx={{ fontSize: 20, mr: 1, color: alpha("#fff", 0.7) }} />
//                   <Typography variant="body2" sx={{ color: alpha("#fff", 0.9) }}>
//                     {new Date(match.startTime).toLocaleString()}
//                   </Typography>
//                 </Box>
//               </CardContent>
//             </Card>
//           ))}
//         </Box>

//         {data?.matches?.length === 0 && (
//           <Box sx={{ textAlign: 'center', py: 6 }}>
//             <SportsSoccerIcon sx={{ fontSize: 60, color: alpha('#fff', 0.3), mb: 2 }} />
//             <Typography variant="h6" sx={{ color: alpha('#fff', 0.5) }}>
//               No matches available at the moment
//             </Typography>
//           </Box>
//         )}
//       </Container>
//     </Box>
//   );
// }

// "use client";

// import { useQuery } from "@apollo/client/react";
// import { GET_MATCHES } from "../graphql/mutations";

// import {
//   Box,
//   Typography,
//   Card,
//   CardContent,
//   CircularProgress,
//   Chip,
//   alpha,
//   keyframes,
//   Container,
// } from "@mui/material";
// import { useRouter } from "next/navigation";
// import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
// import ScheduleIcon from "@mui/icons-material/Schedule";
// import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

// interface Match {
//   id: string;
//   teamA: string;
//   teamB: string;
//   scoreA?: number;
//   scoreB?: number;
//   status: string;
//   startTime: string;
// }

// interface MatchesData {
//   matches: Match[];
// }

// // Gradient animation
// const gradientAnimation = keyframes`
//   0% { background-position: 0% 50%; }
//   50% { background-position: 100% 50%; }
//   100% { background-position: 0% 50%; }
// `;

// // Card hover float animation
// const floatAnimation = keyframes`
//   0% { transform: translateY(0px); }
//   50% { transform: translateY(-8px); }
//   100% { transform: translateY(0px); }
// `;

// export default function MatchesComponent() {
//   const { data, loading, error } = useQuery<MatchesData>(GET_MATCHES);
//   const router = useRouter();

//   if (loading)
//     return (
//       <Box
//         sx={{
//           width: "100vw",
//           height: "100vh",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           background: "linear-gradient(-45deg, #0f2027, #203a43, #2c5364, #0f2027)",
//           backgroundSize: "400% 400%",
//           animation: `${gradientAnimation} 15s ease infinite`,
//         }}
//       >
//         <Box sx={{ textAlign: 'center' }}>
//           <CircularProgress 
//             size={60} 
//             thickness={4}
//             sx={{ color: "#00f5ff", mb: 2 }} 
//           />
//           <Typography variant="h6" sx={{ color: 'white', fontWeight: 300 }}>
//             Loading matches...
//           </Typography>
//         </Box>
//       </Box>
//     );

//   if (error)
//     return (
//       <Box
//         sx={{
//           width: "100vw",
//           height: "100vh",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           background: "linear-gradient(-45deg, #0f2027, #203a43, #2c5364, #0f2027)",
//           backgroundSize: "400% 400%",
//           animation: `${gradientAnimation} 15s ease infinite`,
//         }}
//       >
//         <Typography 
//           variant="h6" 
//           align="center" 
//           sx={{ 
//             color: "white", 
//             maxWidth: '500px',
//             p: 3,
//             background: 'rgba(255,0,0,0.1)',
//             borderRadius: '16px',
//             border: '1px solid rgba(255,0,0,0.2)'
//           }}
//         >
//           Error fetching matches: {error.message}
//         </Typography>
//       </Box>
//     );

//   const handleMatchClick = (_matchId: string) => {
//     router.push("/players"); // Navigate directly to players page
//   };

//   const getStatusColor = (status: string) => {
//     switch (status.toLowerCase()) {
//       case "live":
//         return "#ff4757";
//       case "upcoming":
//         return "#2ed573";
//       case "completed":
//         return "#576574";
//       default:
//         return "#a4b0be";
//     }
//   };

//   const getStatusChip = (status: string) => (
//     <Chip
//       label={status.toUpperCase()}
//       size="small"
//       sx={{
//         backgroundColor: getStatusColor(status),
//         color: "white",
//         fontWeight: "bold",
//         fontSize: "0.7rem",
//         px: 0.5,
//       }}
//     />
//   );

//   return (
//     <Box
//       sx={{
//         width: "100vw",
//         minHeight: "100vh",
//         background: "linear-gradient(-45deg, #0f2027, #203a43, #2c5364, #0f2027)",
//         backgroundSize: "400% 400%",
//         animation: `${gradientAnimation} 15s ease infinite`,
//         position: "relative",
//         overflow: "hidden",
//         py: 2,
//         '&::before': {
//           content: '""',
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           background: 'radial-gradient(circle at 20% 30%, rgba(0, 245, 255, 0.1) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(255, 0, 212, 0.1) 0%, transparent 40%)',
//           pointerEvents: 'none'
//         }
//       }}
//     >
//       <Container maxWidth="lg" sx={{ 
//         height: "100%", 
//         display: "flex", 
//         flexDirection: "column",
//         position: "relative",
//         zIndex: 1,
//         py: 4 
//       }}>
//         <Box sx={{ textAlign: "center", mb: 4 }}>
//           <EmojiEventsIcon sx={{ fontSize: 50, color: "#FFD700", mb: 2, filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.5))' }} />
//           <Typography
//             variant="h3"
//             gutterBottom
//             sx={{
//               fontWeight: 800,
//               background: "linear-gradient(90deg, #00f5ff, #ff00d4, #00f5ff)",
//               backgroundSize: "300% auto",
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//               textShadow: "0 0 20px rgba(0,255,200,0.6)",
//             }}
//           >
//             LIVE MATCHES
//           </Typography>
//           <Typography variant="h6" sx={{ color: alpha('#fff', 0.7), fontWeight: 300, mt: 1 }}>
//             Select a match to see players
//           </Typography>
//         </Box>

//         <Box sx={{ 
//           flex: 1, 
//           display: "flex", 
//           flexDirection: "column", 
//           gap: 3,
//           overflowY: "auto",
//           pb: 2,
//           '&::-webkit-scrollbar': { width: '8px' },
//           '&::-webkit-scrollbar-track': { background: 'rgba(255,255,255,0.05)', borderRadius: '4px' },
//           '&::-webkit-scrollbar-thumb': { background: 'rgba(255,255,255,0.2)', borderRadius: '4px' },
//           '&::-webkit-scrollbar-thumb:hover': { background: 'rgba(255,255,255,0.3)' }
//         }}>
//           {data?.matches?.map((match) => (
//             <Card
//               key={match.id}
//               onClick={() => handleMatchClick(match.id)}
//               sx={{
//                 background: "linear-gradient(145deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
//                 color: "#fff",
//                 borderRadius: 3,
//                 backdropFilter: "blur(12px)",
//                 border: "1px solid rgba(255,255,255,0.15)",
//                 boxShadow: "0 8px 32px rgba(0,0,0,0.2), 0 0 25px rgba(0,255,200,0.1), 0 0 50px rgba(255,0,212,0.1)",
//                 cursor: "pointer",
//                 overflow: "hidden",
//                 position: "relative",
//                 transition: "all 0.3s ease",
//                 "&:hover": {
//                   animation: `${floatAnimation} 2s ease infinite`,
//                   boxShadow: "0 12px 40px rgba(0,0,0,0.3), 0 0 35px rgba(0,255,200,0.3), 0 0 60px rgba(255,0,212,0.2)",
//                   transform: "translateY(-5px)",
//                 },
//                 '&::before': {
//                   content: '""',
//                   position: 'absolute',
//                   top: 0,
//                   left: 0,
//                   right: 0,
//                   height: '4px',
//                   background: 'linear-gradient(90deg, #00f5ff, #ff00d4)',
//                 }
//               }}
//             >
//               <CardContent sx={{ p: 4 }}>
//                 <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
//                   {getStatusChip(match.status)}
//                 </Box>

//                 <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
//                   <Box sx={{ textAlign: "center", width: "40%" }}>
//                     <SportsSoccerIcon sx={{ fontSize: 40, color: "#00f5ff", mb: 1 }} />
//                     <Typography variant="h6" sx={{ fontWeight: 600 }}>{match.teamA}</Typography>
//                   </Box>

//                   <Box sx={{ textAlign: "center", width: "20%" }}>
//                     <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: 50, height: 50, borderRadius: "50%", background: "rgba(255,255,255,0.1)", mx: "auto", mb: 1 }}>
//                       <Typography variant="h5" sx={{ fontWeight: 800 }}>VS</Typography>
//                     </Box>
//                   </Box>

//                   <Box sx={{ textAlign: "center", width: "40%" }}>
//                     <SportsSoccerIcon sx={{ fontSize: 40, color: "#ff00d4", mb: 1 }} />
//                     <Typography variant="h6" sx={{ fontWeight: 600 }}>{match.teamB}</Typography>
//                   </Box>
//                 </Box>

//                 <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", background: "rgba(0,0,0,0.2)", py: 2, borderRadius: 2, mb: 3 }}>
//                   <Typography variant="h3" sx={{ fontWeight: 800, letterSpacing: 2 }}>
//                     {match.scoreA ?? 0} : {match.scoreB ?? 0}
//                   </Typography>
//                 </Box>

//                 <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", background: "rgba(255,255,255,0.05)", py: 1.5, borderRadius: 2 }}>
//                   <ScheduleIcon sx={{ fontSize: 20, mr: 1, color: alpha("#fff", 0.7) }} />
//                   <Typography variant="body2" sx={{ color: alpha("#fff", 0.9) }}>
//                     {new Date(match.startTime).toLocaleString()}
//                   </Typography>
//                 </Box>
//               </CardContent>
//             </Card>
//           ))}
//         </Box>

//         {data?.matches?.length === 0 && (
//           <Box sx={{ textAlign: 'center', py: 6 }}>
//             <SportsSoccerIcon sx={{ fontSize: 60, color: alpha('#fff', 0.3), mb: 2 }} />
//             <Typography variant="h6" sx={{ color: alpha('#fff', 0.5) }}>
//               No matches available at the moment
//             </Typography>
//           </Box>
//         )}
//       </Container>
//     </Box>
//   );
// }

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
          background: "linear-gradient(-45deg, #0f2027, #203a43, #2c5364, #0f2027)",
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
          background: "linear-gradient(-45deg, #0f2027, #203a43, #2c5364, #0f2027)",
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
        background: "linear-gradient(-45deg, #0f2027, #203a43, #2c5364, #0f2027)",
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
              <Typography variant="h6">{match.teamA} vs {match.teamB}</Typography>
              <Typography variant="h5" sx={{ mt: 1 }}>
                {match.scoreA ?? 0} : {match.scoreB ?? 0}
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
                <ScheduleIcon sx={{ fontSize: 18, mr: 1, color: alpha("#fff", 0.7) }} />
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
