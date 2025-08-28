"use client";

import { Box, Button, Container, Typography, Grid, useTheme, useMediaQuery } from "@mui/material";
import { useRouter } from "next/navigation";
import { keyframes } from "@emotion/react";
import CasinoIcon from '@mui/icons-material/Casino';
import GroupsIcon from '@mui/icons-material/Groups';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

import { useSearchParams } from "next/navigation";

// Animations
const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(0, 245, 255, 0.7); }
  70% { box-shadow: 0 0 0 20px rgba(0, 245, 255, 0); }
  100% { box-shadow: 0 0 0 0 rgba(0, 245, 255, 0); }
`;

export default function BettingPage() {
   const searchParams = useSearchParams();
  const matchId = searchParams.get("matchId");
  console.log("..........."+matchId);
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
        px: 2,
      }}
    >
      {/* Background circles */}
      <Box
        sx={{
          position: 'absolute',
          top: '5%',
          left: '5%',
          width: '30vw',
          height: '30vw',
          maxWidth: 400,
          maxHeight: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 0, 212, 0.2) 0%, rgba(0, 245, 255, 0) 70%)',
          animation: `${float} 15s ease-in-out infinite`,
          opacity: 0.5,
          zIndex: 0
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '10%',
          right: '5%',
          width: '25vw',
          height: '25vw',
          maxWidth: 300,
          maxHeight: 300,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 245, 255, 0.2) 0%, rgba(255, 0, 212, 0) 70%)',
          animation: `${float} 12s ease-in-out infinite reverse`,
          opacity: 0.4,
          zIndex: 0
        }}
      />

      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          zIndex: 1,
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 10 }}>
          <CasinoIcon sx={{ fontSize: 70, color: '#00f5ff', mb: 2, animation: `${pulse} 2s infinite` }} />
          <Typography
            variant={isMobile ? "h4" : "h2"}
            sx={{
              fontWeight: "bold",
              background: 'linear-gradient(90deg, #00f5ff, #ff00d4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2
            }}
          >
            Premium Betting Experience
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: 'rgba(255, 255, 255, 0.7)', maxWidth: 700, mx: 'auto' }}
          >
            Choose your betting style and immerse yourself in the ultimate gaming experience
          </Typography>
        </Box>

        {/* Betting Options */}
        <Grid container spacing={6} justifyContent="center">
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                background: 'rgba(19, 19, 54, 0.8)',
                backdropFilter: 'blur(12px)',
                borderRadius: 4,
                p: 5,
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 15px 40px rgba(0, 0, 0, 0.4)',
                transition: 'all 0.3s ease',
                '&:hover': { transform: 'translateY(-10px)', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }
              }}
            >
              <GroupsIcon sx={{ fontSize: 60, color: '#00f5ff', mb: 3 }} />
              <Typography variant="h4" sx={{ color: '#fff', fontWeight: 'bold', mb: 3 }}>
                Team Betting
              </Typography>
              <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', mb: 4 }}>
                Place your bets on your favorite teams across various leagues and tournaments with competitive odds and live updates.
              </Typography>
              <Button
                fullWidth
                variant="contained"
                sx={{
                  py: 2.5,
                  fontWeight: "bold",
                  borderRadius: "50px",
                  background: "linear-gradient(90deg, #00f5ff, #ff00d4)",
                  "&:hover": { background: "linear-gradient(90deg, #ff00d4, #00f5ff)", transform: 'scale(1.03)' }
                }}
                onClick={() => router.push(`/nishint?matchId=${matchId}`)}
                
              >
                Bet on Teams
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12} md={5}>
            <Box
              sx={{
                background: 'rgba(19, 19, 54, 0.8)',
                backdropFilter: 'blur(12px)',
                borderRadius: 4,
                p: 5,
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 15px 40px rgba(0, 0, 0, 0.4)',
                transition: 'all 0.3s ease',
                '&:hover': { transform: 'translateY(-10px)', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }
              }}
            >
              <TrendingUpIcon sx={{ fontSize: 60, color: '#ff00d4', mb: 3 }} />
              <Typography variant="h4" sx={{ color: '#fff', fontWeight: 'bold', mb: 3 }}>
                Odds Betting
              </Typography>
              <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', mb: 4 }}>
                Experience the thrill of dynamic odds betting with live updates and strategic opportunities to maximize your winnings.
              </Typography>
              <Button
                fullWidth
                variant="contained"
                sx={{
                  py: 2.5,
                  fontWeight: "bold",
                  borderRadius: "50px",
                  background: "linear-gradient(90deg, #ff00d4, #00f5ff)",
                  "&:hover": { background: "linear-gradient(90deg, #00f5ff, #ff00d4)", transform: 'scale(1.03)' }
                }}
                onClick={() => router.push("/bet/odds")}
              >
                Bet on Odds
              </Button>
            </Box>
          </Grid>
        </Grid>

        {/* Footer */}
        <Typography variant="caption" sx={{ display: 'block', textAlign: 'center', mt: 8, color: 'rgba(255,255,255,0.5)' }}>
          Please gamble responsibly. Must be 18+ to participate.
        </Typography>
      </Container>
    </Box>
  );
}
