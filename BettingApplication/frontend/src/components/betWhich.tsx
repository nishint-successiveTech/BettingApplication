"use client";

import { Box, Button, Container, Typography, Grid } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { memo, useMemo } from "react";

// Static icons to avoid dynamic imports
const CasinoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="70"
    viewBox="0 0 24 24"
    width="70"
    fill="#00f5ff"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM7.5 18c-.83 0-1.5-.67-1.5-1.5S6.67 15 7.5 15s1.5.67 1.5 1.5S8.33 18 7.5 18zm0-9C6.67 9 6 8.33 6 7.5S6.67 6 7.5 6 9 6.67 9 7.5 8.33 9 7.5 9zm4.5 4.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4.5 4.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm0-9c-.83 0-1.5-.67-1.5-1.5S15.67 6 16.5 6s1.5.67 1.5 1.5S17.33 9 16.5 9z" />
  </svg>
);

const GroupsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="60"
    viewBox="0 0 24 24"
    width="60"
    fill="#00f5ff"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
  </svg>
);

const TrendingUpIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="60"
    viewBox="0 0 24 24"
    width="60"
    fill="#ff00d4"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
  </svg>
);

// CSS-in-JS styles defined outside component
const styles = {
  pageContainer: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "radial-gradient(circle at top, #0f2027, #203a43, #2c5364)",
    zIndex: -1,
  },
  mainContainer: {
    minHeight: "100vh",
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
    background:
      "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
    px: 2,
  },
  topCircle: {
    position: "absolute",
    top: "5%",
    left: "5%",
    width: "30vw",
    height: "30vw",
    maxWidth: 400,
    maxHeight: 400,
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(255, 0, 212, 0.2) 0%, rgba(0, 245, 255, 0) 70%)",
    opacity: 0.5,
    zIndex: 0,
    animation: "float 15s ease-in-out infinite",
  },
  bottomCircle: {
    position: "absolute",
    bottom: "10%",
    right: "5%",
    width: "25vw",
    height: "25vw",
    maxWidth: 300,
    maxHeight: 300,
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(0, 245, 255, 0.2) 0%, rgba(255, 0, 212, 0) 70%)",
    opacity: 0.4,
    zIndex: 0,
    animation: "float 12s ease-in-out infinite reverse",
  },
  contentContainer: {
    position: "relative",
    zIndex: 1,
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  headerText: {
    fontWeight: "bold",
    background: "linear-gradient(90deg, #00f5ff, #ff00d4)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    mb: 2,
  },
  bettingCard: {
    background: "rgba(19, 19, 54, 0.8)",
    backdropFilter: "blur(12px)",
    borderRadius: 4,
    p: 5,
    border: "1px solid rgba(255, 255, 255, 0.1)",
    boxShadow: "0 15px 40px rgba(0, 0, 0, 0.4)",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "translateY(-10px)",
      boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
    },
  },
  teamButton: {
    py: 2.5,
    fontWeight: "bold",
    borderRadius: "50px",
    background: "linear-gradient(90deg, #00f5ff, #ff00d4)",
    "&:hover": {
      background: "linear-gradient(90deg, #ff00d4, #00f5ff)",
      transform: "scale(1.03)",
    },
  },
  oddsButton: {
    py: 2.5,
    fontWeight: "bold",
    borderRadius: "50px",
    background: "linear-gradient(90deg, #ff00d4, #00f5ff)",
    "&:hover": {
      background: "linear-gradient(90deg, #00f5ff, #ff00d4)",
      transform: "scale(1.03)",
    },
  },
};

// Keyframes as a style tag to be injected once
const AnimationStyles = () => (
  <style jsx global>{`
    @keyframes float {
      0% {
        transform: translateY(0px) rotate(0deg);
      }
      50% {
        transform: translateY(-20px) rotate(5deg);
      }
      100% {
        transform: translateY(0px) rotate(0deg);
      }
    }
    @keyframes pulse {
      0% {
        box-shadow: 0 0 0 0 rgba(0, 245, 255, 0.7);
      }
      70% {
        box-shadow: 0 0 0 20px rgba(0, 245, 255, 0);
      }
      100% {
        box-shadow: 0 0 0 0 rgba(0, 245, 255, 0);
      }
    }
    .pulse-animation {
      animation: pulse 2s infinite;
    }
  `}</style>
);

// Memoized BettingCard component to prevent unnecessary re-renders
const BettingCard = memo(
  ({ icon, title, description, buttonText, onClick, buttonStyle }) => (
    <Box sx={styles.bettingCard}>
      {icon}
      <Typography
        variant="h4"
        sx={{ color: "#fff", fontWeight: "bold", mb: 3 }}
      >
        {title}
      </Typography>
      <Typography
        variant="body1"
        sx={{ color: "rgba(255,255,255,0.8)", mb: 4 }}
      >
        {description}
      </Typography>
      <Button fullWidth variant="contained" sx={buttonStyle} onClick={onClick}>
        {buttonText}
      </Button>
    </Box>
  )
);

BettingCard.displayName = "BettingCard";

const BettingPage = () => {
  const searchParams = useSearchParams();
  const matchId = searchParams.get("matchId");
  const router = useRouter();

  // Memoize route URLs to prevent recreation on each render
  const teamBettingUrl = useMemo(
    () => `/nishint?matchId=${matchId}`,
    [matchId]
  );
  const oddsBettingUrl = useMemo(() => "/players", []);

  // Check if mobile using simple window check (avoids useMediaQuery hook)
  const isMobile =
    typeof window !== "undefined" ? window.innerWidth < 600 : false;

  return (
    <>
      <AnimationStyles />
      <Box sx={styles.pageContainer}>
        <Box sx={styles.mainContainer}>
          {/* Background circles */}
          <Box sx={styles.topCircle} />
          <Box sx={styles.bottomCircle} />

          <Container maxWidth="lg" sx={styles.contentContainer}>
            {/* Header */}
            <Box sx={{ textAlign: "center", mb: 10 }}>
              <Box
                sx={{
                  animation: "pulse 2s infinite",
                  display: "inline-block",
                  mb: 2,
                }}
              >
                <CasinoIcon />
              </Box>
              <Typography
                variant={isMobile ? "h4" : "h2"}
                sx={styles.headerText}
              >
                Premium Betting Experience
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: "rgba(255, 255, 255, 0.7)",
                  maxWidth: 700,
                  mx: "auto",
                }}
              >
                Choose your betting style and immerse yourself in the ultimate
                gaming experience
              </Typography>
            </Box>

            {/* Betting Options */}
            <Grid container spacing={6} justifyContent="center">
              <Grid item xs={12} md={5}>
                <BettingCard
                  icon={<GroupsIcon />}
                  title="Team Betting"
                  description="Place your bets on your favorite teams across various leagues and tournaments with competitive odds and live updates."
                  buttonText="Bet on Teams"
                  onClick={() => router.push(teamBettingUrl)}
                  buttonStyle={styles.teamButton}
                />
              </Grid>

              <Grid item xs={12} md={5}>
                <BettingCard
                  icon={<TrendingUpIcon />}
                  title="Odds Betting"
                  description="Experience the thrill of dynamic odds betting with live updates and strategic opportunities to maximize your winnings."
                  buttonText="Bet on Odds"
                  onClick={() => router.push(oddsBettingUrl)}
                  buttonStyle={styles.oddsButton}
                  disabled={true}
                />
              </Grid>
            </Grid>

            {/* Footer */}
            <Typography
              variant="caption"
              sx={{
                display: "block",
                textAlign: "center",
                mt: 8,
                color: "rgba(255,255,255,0.5)",
              }}
            >
              Please gamble responsibly. Must be 18+ to participate.
            </Typography>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default BettingPage;













