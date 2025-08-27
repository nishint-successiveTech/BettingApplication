"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  Divider,
  Fade,
  Zoom,
  Slide,
  Chip,
  IconButton,
  useTheme,
  useMediaQuery,
  alpha,
} from "@mui/material";
import SportsCricketIcon from "@mui/icons-material/SportsCricket";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import SportsHockeyIcon from "@mui/icons-material/SportsHockey";
import CasinoIcon from "@mui/icons-material/Casino";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import CloseIcon from "@mui/icons-material/Close";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';


// Particle background component
const ParticlesBackground = () => {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const animationFrameId = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width = window.innerWidth;
    const height = canvas.height = window.innerHeight;

    // Create particles
    const createParticles = () => {
      particles.current = Array.from({ length: 50 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 3 + 1,
        speedX: Math.random() * 1 - 0.5,
        speedY: Math.random() * 1 - 0.5,
        color: `hsl(${Math.random() * 360}, 70%, 60%)`,
      }));
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Update and draw particles
      particles.current.forEach(particle => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Wrap around edges
        if (particle.x > width) particle.x = 0;
        if (particle.x < 0) particle.x = width;
        if (particle.y > height) particle.y = 0;
        if (particle.y < 0) particle.y = height;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
      });
      
      // Draw connections between particles
      ctx.strokeStyle = alpha('#ffffff', 0.1);
      ctx.lineWidth = 0.5;
      
      for (let i = 0; i < particles.current.length; i++) {
        for (let j = i + 1; j < particles.current.length; j++) {
          const dx = particles.current[i].x - particles.current[j].x;
          const dy = particles.current[i].y - particles.current[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particles.current[i].x, particles.current[i].y);
            ctx.lineTo(particles.current[j].x, particles.current[j].y);
            ctx.stroke();
          }
        }
      }
      
      animationFrameId.current = requestAnimationFrame(animate);
    };

    createParticles();
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createParticles();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    />
  );
};

// Floating odds ticker component
const FloatingOddsTicker = () => {
  const [odds, setOdds] = useState([
    { match: "IND vs AUS", odds: "1.85", trending: "up" },
    { match: "ENG vs NZ", odds: "2.10", trending: "down" },
    { match: "SA vs WI", odds: "1.95", trending: "up" },
    { match: "PAK vs BAN", odds: "1.75", trending: "down" },
  ]);
  
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % odds.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [odds.length]);

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 16,
        right: 16,
        background: alpha('#000', 0.7),
        borderRadius: 2,
        p: 1.5,
        backdropFilter: 'blur(10px)',
        border: '1px solid',
        borderColor: alpha('#fff', 0.2),
        maxWidth: 250,
        zIndex: 10,
      }}
    >
      <Box display="flex" alignItems="center" mb={1}>
        <TrendingUpIcon sx={{ fontSize: 20, mr: 1, color: '#00f5ff' }} />
        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#fff' }}>
          Live Odds
        </Typography>
      </Box>
      
      <Slide direction="left" in key={currentIndex} mountOnEnter unmountOnExit>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="body2" sx={{ color: '#fff', mr: 2 }}>
            {odds[currentIndex].match}
          </Typography>
          <Box display="flex" alignItems="center">
            <Typography 
              variant="body2" 
              sx={{ 
                fontWeight: 'bold',
                color: odds[currentIndex].trending === 'up' ? '#4caf50' : '#f44336',
                mr: 0.5
              }}
            >
              {odds[currentIndex].odds}
            </Typography>
            {odds[currentIndex].trending === 'up' ? (
              <TrendingUpIcon sx={{ fontSize: 16, color: '#4caf50' }} />
            ) : (
              <TrendingUpIcon sx={{ fontSize: 16, color: '#f44336', transform: 'rotate(45deg)' }} />
            )}
          </Box>
        </Box>
      </Slide>
    </Box>
  );
};

// Notification component
const NotificationBar = () => {
  const [showNotification, setShowNotification] = useState(true);
  
  if (!showNotification) return null;
  
  return (
    <Fade in={showNotification}>
      <Box
        sx={{
          background: 'linear-gradient(90deg, #ff0080, #ff8c00)',
          color: 'white',
          py: 1,
          px: 2,
          borderRadius: 1,
          mb: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 4px 15px rgba(255, 0, 128, 0.3)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
            animation: 'shimmer 3s infinite',
          }
        }}
      >
        <Box display="flex" alignItems="center">
          <EmojiEventsIcon sx={{ mr: 1, fontSize: 20 }} />
          <Typography variant="body2">
            Welcome bonus: Get 100% bonus on your first deposit!
          </Typography>
        </Box>
        <IconButton 
          size="small" 
          sx={{ color: 'white' }}
          onClick={() => setShowNotification(false)}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>
    </Fade>
  );
};

export default function WelcomePage() {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [activeSport, setActiveSport] = useState(null);

  const sports = [
    {
      name: "Cricket",
      icon: <SportsCricketIcon sx={{ fontSize: 60, color: "#00f5ff" }} />,
      route: "/cricketMatch",
      description: "Experience the thrill of cricket betting with live matches and competitive odds",
      active: true,
      features: ["Live Betting", "Player Stats", "Match Predictions"]
    },
    {
      name: "Football",
      icon: <SportsSoccerIcon sx={{ fontSize: 60, color: "#ff6b6b" }} />,
      route: null,
      description: "The world's most popular sport with matches from top leagues",
      active: false,
      features: ["Goal Markets", "Half-Time Bets", "Card Betting"]
    },
    {
      name: "Hockey",
      icon: <SportsHockeyIcon sx={{ fontSize: 60, color: "#ffcc00" }} />,
      route: null,
      description: "Fast-paced action on ice with dynamic betting opportunities",
      active: false,
      features: ["Period Betting", "Power Play Odds", "Shootout Specials"]
    },
  ];

  const handleSportHover = (index) => {
    setActiveSport(index);
  };

  const handleSportLeave = () => {
    setActiveSport(null);
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
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        background: "radial-gradient(circle at top, #0f2027, #203a43, #2c5364)",
        overflow: "auto",
        p: 2,
      }}
    >
      <ParticlesBackground />
      <FloatingOddsTicker />
      
      {/* Animated background elements */}
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

      {/* Header */}
      <Fade in timeout={1000}>
        <Box sx={{ position: "relative", zIndex: 2, mt: 4, mb: 2, textAlign: "center" }}>
          <Box display="flex" alignItems="center" justifyContent="center" mb={1}>
            <CasinoIcon sx={{ fontSize: 40, mr: 2, color: "#00f5ff" }} />
            <Typography
              variant="h3"
              sx={{
                fontWeight: "bold",
                background: "linear-gradient(90deg, #00f5ff, #ff00d4, #00f5ff, #ff00d4)",
                backgroundSize: "300% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 0 25px rgba(0,255,200,0.6)",
                animation: "gradientText 8s linear infinite",
              }}
            >
              BettingBaazi.com
            </Typography>
              {/* Wallet Icon Button */}
    
          </Box><Box
  sx={{
    position: "fixed",
    top: 16,
    left: 16,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    zIndex: 20,
    cursor: "pointer",
  }}
  onClick={() => router.push("/wallet")}
>
  <AccountBalanceWalletIcon
    sx={{
      color: "#00f5ff",
      fontSize: "3rem", // pehle 2rem tha, ab 3rem
      "&:hover": {
        color: "#ff00d4",
        transform: "scale(1.3)", // slightly bigger scale
        transition: "all 0.3s ease",
      },
    }}
    fontSize="inherit"
  />
  <Typography
    variant="subtitle1" // pehle caption tha, ab subtitle1
    sx={{
      color: "#00f5ff",
      mt: 1,
      fontWeight: "bold",
      fontSize: "1.2rem", // text aur bada
      "&:hover": { color: "#ff00d4" },
    }}
  >
    My Wallet
  </Typography>
</Box>
          

          <NotificationBar />

          {/* Subtext */}
          <Typography
            variant="h6"
            sx={{
              color: "rgba(255,255,255,0.8)",
              mb: 5,
              textAlign: "center",
              maxWidth: 700,
            }}
          >
            Experience next-level sports excitement. Choose your favorite sport and
            start your journey. Only Cricket is active right now!
          </Typography>
        </Box>
      </Fade>

      <Divider
        sx={{
          width: "80%",
          mb: 5,
          borderColor: "rgba(255,255,255,0.2)",
          position: "relative",
          zIndex: 2,
        }}
      />

      {/* Sports Grid */}
      <Grid
        container
        spacing={4}
        justifyContent="center"
        sx={{ maxWidth: 1200, position: "relative", zIndex: 2 }}
      >
        {sports.map((sport, index) => (
          <Grid item xs={12} sm={6} md={4} key={sport.name}>
            <Zoom in timeout={800 + index * 200}>
              <Paper
                elevation={12}
                onMouseEnter={() => handleSportHover(index)}
                onMouseLeave={handleSportLeave}
                sx={{
                  p: 4,
                  borderRadius: "20px",
                  backdropFilter: "blur(10px)",
                  background: activeSport === index 
                    ? "linear-gradient(145deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))"
                    : "rgba(255,255,255,0.05)",
                  border: "1px solid",
                  borderColor: activeSport === index ? "rgba(0,245,255,0.5)" : "rgba(255,255,255,0.2)",
                  textAlign: "center",
                  color: "#fff",
                  cursor: sport.route ? "pointer" : "not-allowed",
                  transition: "all 0.4s ease",
                  transform: activeSport === index ? "translateY(-8px) scale(1.03)" : "translateY(0) scale(1)",
                  boxShadow: activeSport === index 
                    ? "0px 0px 30px rgba(0,255,255,0.6)" 
                    : "0px 10px 30px rgba(0,0,0,0.2)",
                  position: "relative",
                  overflow: "hidden",
                  "&::before": activeSport === index ? {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "4px",
                    background: "linear-gradient(90deg, #00f5ff, #ff00d4)",
                    animation: "progress 2s linear infinite",
                  } : {},
                }}
                onClick={() => sport.route && router.push(sport.route)}
              >
                {sport.active && (
                  <Chip 
                    icon={<FiberManualRecordIcon />} 
                    label="LIVE" 
                    size="small"
                    color="error"
                    sx={{ 
                      position: "absolute", 
                      top: 16, 
                      right: 16,
                      animation: "pulse 2s infinite",
                    }}
                  />
                )}
                
                <Box
                  sx={{
                    transform: activeSport === index ? "scale(1.1)" : "scale(1)",
                    transition: "transform 0.4s ease",
                    mb: 2,
                  }}
                >
                  {sport.icon}
                </Box>
                
                <Typography
                  variant="h5"
                  sx={{ 
                    mt: 2, 
                    fontWeight: "bold", 
                    letterSpacing: 1,
                    background: activeSport === index 
                      ? "linear-gradient(90deg, #00f5ff, #ff00d4)"
                      : "none",
                    WebkitBackgroundClip: activeSport === index ? "text" : "none",
                    WebkitTextFillColor: activeSport === index ? "transparent" : "#fff",
                  }}
                >
                  {sport.name}
                </Typography>
                
                <Typography variant="body2" sx={{ mt: 2, color: "rgba(255,255,255,0.7)" }}>
                  {sport.description}
                </Typography>
                
                <Box sx={{ mt: 2, mb: 3 }}>
                  {sport.features.map((feature, i) => (
                    <Chip
                      key={i}
                      label={feature}
                      size="small"
                      sx={{
                        m: 0.5,
                        background: "rgba(255,255,255,0.1)",
                        color: "white",
                        fontSize: "0.7rem",
                      }}
                    />
                  ))}
                </Box>
                
                <Button
                  variant="contained"
                  sx={{
                    mt: 3,
                    borderRadius: "50px",
                    background: sport.active 
                      ? "linear-gradient(90deg, #00f5ff, #ff00d4)"
                      : "rgba(255,255,255,0.2)",
                    backgroundSize: "200% auto",
                    fontWeight: "bold",
                    px: 4,
                    transition: "all 0.3s ease",
                    "&:hover": sport.active ? {
                      background: "linear-gradient(90deg, #ff00d4, #00f5ff)",
                      transform: "scale(1.1)",
                      boxShadow: "0 0 20px rgba(0,245,255,0.5)",
                    } : {},
                  }}
                  disabled={!sport.route}
                >
                  {sport.route ? "Play Now" : "Coming Soon"}
                </Button>
              </Paper>
            </Zoom>
          </Grid>
        ))}
      </Grid>

      {/* Footer */}
      <Fade in timeout={2000}>
        <Box sx={{ mt: 8, textAlign: "center", position: "relative", zIndex: 2 }}>
          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)" }}>
            © {new Date().getFullYear()} BettingBaazi.com • Must be 18+ to play • Please gamble responsibly
          </Typography>
        </Box>
      </Fade>

      {/* Global styles for animations */}
      <style jsx global>{`
        @keyframes gradientText {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
        
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(244, 67, 54, 0.7); }
          70% { box-shadow: 0 0 0 10px rgba(244, 67, 54, 0); }
          100% { box-shadow: 0 0 0 0 rgba(244, 67, 54, 0); }
        }
        
        @keyframes progress {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 100%; }
        }
      `}</style>
    </Box>
  );
}
