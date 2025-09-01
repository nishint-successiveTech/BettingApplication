// "use client";

// import { gql } from "@apollo/client";
// import { useQuery } from "@apollo/client/react";
// import { Box, Typography, Card, CardContent, CircularProgress, Chip } from "@mui/material";

// const GET_PLAYERS = gql`
//   query {
//     players {
//       id
//       name
//       role
//       team
//       odds
//     }
//   }
// `;

// export default function PlayersList() {
//   const { data, loading, error } = useQuery(GET_PLAYERS);

//   if (loading)
//     return (
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           height: "100vh",
//           width: "100vw",
//           background: "linear-gradient(to bottom, #0f2027, #203a43, #2c5364)",
//         }}
//       >
//         <CircularProgress />
//       </Box>
//     );

//   if (error)
//     return (
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           height: "100vh",
//           width: "100vw",
//           background: "linear-gradient(to bottom, #0f2027, #203a43, #2c5364)",
//         }}
//       >
//         <Typography color="error" variant="h6">
//           Error fetching players: {error.message}
//         </Typography>
//       </Box>
//     );

//   return (
//     <Box
//       sx={{
//         position: "fixed",
//         top: 0,
//         left: 0,
//         width: "100vw",
//         height: "100vh",
//         overflowY: "auto",
//         p: 4,
//         display: "flex",
//         flexDirection: "column",
//         gap: 3,
//         background: "linear-gradient(to bottom, #0f2027, #203a43, #2c5364)",
//       }}
//     >
//       {data.players.map((player: any) => (
//         <Card
//           key={player.id}
//           sx={{
//             minHeight: 100,
//             background: "rgba(255,255,255,0.1)",
//             backdropFilter: "blur(10px)",
//             color: "#fff",
//             cursor: "pointer",
//             "&:hover": { transform: "scale(1.02)", transition: "0.3s" },
//           }}
//         >
//           <CardContent>
//             <Typography variant="h6" sx={{ fontWeight: "bold" }}>
//               {player.name}
//             </Typography>
//             <Typography variant="body2">{player.role}</Typography>
//             <Chip
//               label={player.team}
//               size="small"
//               sx={{
//                 mt: 1,
//                 backgroundColor: player.team === "India" ? "#1e88e5" : "#f50057",
//                 color: "#fff",
//               }}
//             />
//             <Typography variant="subtitle2" sx={{ mt: 1 }}>
//               Odds: {player.odds.toFixed(1)}
//             </Typography>
//           </CardContent>
//         </Card>
//       ))}
//     </Box>
//   );
// }
"use client";

import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Chip,
} from "@mui/material";

const GET_PLAYERS = gql`
  query {
    players {
      id
      name
      role
      team
      odds
    }
  }
`;

export default function PlayersList() {
  const { data, loading, error } = useQuery(GET_PLAYERS);

  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
          background: "linear-gradient(to bottom, #0f2027, #203a43, #2c5364)",
        }}
      >
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
          background: "linear-gradient(to bottom, #0f2027, #203a43, #2c5364)",
        }}
      >
        <Typography color="error" variant="h6">
          Error fetching players: {error.message}
        </Typography>
      </Box>
    );

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        overflowY: "auto",
        p: 4,
        display: "flex",
        flexDirection: "column",
        gap: 3,
        background: "linear-gradient(to bottom, #0f2027, #203a43, #2c5364)",
      }}
    >
      {data.players.map((player: any) => (
        <Card
          key={player.id}
          sx={{
            minHeight: 120,
            background: "rgba(255,255,255,0.1)",
            backdropFilter: "blur(10px)",
            color: "#fff",
            cursor: "pointer",
            "&:hover": { transform: "scale(1.02)", transition: "0.3s" },
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {player.name}
            </Typography>

            <Typography variant="body2">{player.role}</Typography>

            <Chip
              label={player.team}
              size="small"
              sx={{
                mt: 1,
                backgroundColor:
                  player.team === "India" ? "#1e88e5" : "#f50057",
                color: "#fff",
              }}
            />

            <Typography
              variant="subtitle1"
              sx={{
                mt: 1,
                fontWeight: "bold",
                color: "#ffeb3b", // yellow highlight for odds
              }}
            >
              Odds: {player.odds.toFixed(1)}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
