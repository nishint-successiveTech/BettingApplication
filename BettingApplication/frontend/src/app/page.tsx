"use client";

import { useEffect, useRef, useState } from "react";
import { Typography, Button, Box, Paper, CircularProgress } from "@mui/material";
import Link from "next/link";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Set a timer to hide the loading screen after 5 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);
console.log("*********");
  useEffect(() => {
    if (!isLoading) return; // Only run canvas animation during loading

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let particles: Particle[] = [];
    let animationId: number;

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = `hsla(${Math.random() * 360}, 100%, 50%, 0.6)`;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < 120; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.update();
        p.draw();
        for (let j = i; j < particles.length; j++) {
          const dx = p.x - particles[j].x;
          const dy = p.y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255,255,255,${0.2 - dist / 600})`;
            ctx.lineWidth = 0.4;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      });
      animationId = requestAnimationFrame(animate);
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };
    resize();
    window.addEventListener("resize", resize);
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [isLoading]);

  // Loading Screen Component
  if (isLoading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          background: "radial-gradient(circle at top, #0f2027, #203a43, #2c5364)",
          flexDirection: "column",
        }}
      >
        {/* Animated Particle Canvas */}
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        />

        {/* Loading Content */}
        <Box
          sx={{
            textAlign: "center",
            color: "#fff",
            zIndex: 2,
            animation: "fadeIn 1.8s ease",
            "@keyframes fadeIn": {
              from: { opacity: 0, transform: "translateY(40px)" },
              to: { opacity: 1, transform: "translateY(0)" },
            },
          }}
        >
          {/* Title */}
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              fontSize: { xs: "2.8rem", md: "3.5rem" },
              background:
                "linear-gradient(90deg, #00f5ff, #ff00d4, #00f5ff, #ff00d4)",
              backgroundSize: "300% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0px 0px 25px rgba(0,255,200,0.7)",
              animation: "glowText 6s linear infinite",
              "@keyframes glowText": {
                "0%": { backgroundPosition: "0% center" },
                "100%": { backgroundPosition: "300% center" },
              },
              mb: 3,
            }}
          >
            Sattebazzi.com
          </Typography>

          {/* Loading Indicator */}
          <CircularProgress
            size={60}
            thickness={4}
            sx={{
              color: "#00f5ff",
              mb: 3,
            }}
          />

          {/* Loading Message */}
          <Typography
            variant="h6"
            sx={{
              color: "rgba(255,255,255,0.9)",
              fontSize: "1.2rem",
              textShadow: "0 0 12px rgba(255,255,255,0.4)",
            }}
          >
            Loading your premium betting experience...
          </Typography>
        </Box>
      </Box>
    );
  }

  // Main Content (shown after loading)
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        background: "radial-gradient(circle at top, #0f2027, #203a43, #2c5364)",
      }}
    >
      {/* Animated Particle Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />

      {/* Main Card */}
      <Paper
        elevation={24}
        sx={{
          p: { xs: 4, md: 6 },
          borderRadius: "30px",
          backdropFilter: "blur(18px)",
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.15)",
          textAlign: "center",
          color: "#fff",
          maxWidth: 700,
          width: "100%",
          position: "relative",
          zIndex: 2,
          boxShadow:
            "0 0 25px rgba(0, 255, 200, 0.3), 0 0 60px rgba(255,0,150,0.25)",
          animation: "fadeIn 1.8s ease",
          "@keyframes fadeIn": {
            from: { opacity: 0, transform: "translateY(40px)" },
            to: { opacity: 1, transform: "translateY(0)" },
          },
        }}
      >
        {/* Title */}
        <Typography
          variant="h2"
          sx={{
            fontWeight: "bold",
            fontSize: { xs: "2.8rem", md: "3.5rem" },
            background:
              "linear-gradient(90deg, #00f5ff, #ff00d4, #00f5ff, #ff00d4)",
            backgroundSize: "300% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0px 0px 25px rgba(0,255,200,0.7)",
            animation: "glowText 6s linear infinite",
            "@keyframes glowText": {
              "0%": { backgroundPosition: "0% center" },
              "100%": { backgroundPosition: "300% center" },
            },
          }}
        >
          Sattebazzi.com
        </Typography>

        {/* Subtitle */}
        <Typography
          variant="h6"
          sx={{
            mt: 2,
            mb: 5,
            color: "rgba(255,255,255,0.9)",
            fontSize: "1.2rem",
            textShadow: "0 0 12px rgba(255,255,255,0.4)",
          }}
        >
          The next-gen platform for real-time betting, analytics & instant wins ⚡
        </Typography>

        {/* Action Buttons */}
        <Box
          sx={{
            display: "flex",
            gap: 3,
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "center",
          }}
        >
          <Button
            component={Link}
            href="/login"
            sx={{
              px: 5,
              py: 1.7,
              borderRadius: "50px",
              fontSize: "1.2rem",
              fontWeight: "bold",
              background: "linear-gradient(90deg, #00f5ff, #00d9ff)",
              boxShadow: "0px 0px 25px rgba(0,255,255,0.6)",
              transition: "all 0.3s ease",
              "&:hover": {
                background: "linear-gradient(90deg, #00d9ff, #00f5ff)",
                transform: "scale(1.08)",
                boxShadow: "0px 0px 40px rgba(0,255,255,0.9)",
              },
            }}
          >
            Login
          </Button>
          <Button
            component={Link}
            href="/register"
            sx={{
              px: 5,
              py: 1.7,
              borderRadius: "50px",
              fontSize: "1.2rem",
              fontWeight: "bold",
              border: "2px solid rgba(255,255,255,0.6)",
              color: "#fff",
              transition: "all 0.3s ease",
              "&:hover": {
                background: "rgba(255,255,255,0.1)",
                borderColor: "#ff00d4",
                color: "#ff00d4",
                transform: "scale(1.08)",
                boxShadow: "0px 0px 30px rgba(255,0,212,0.6)",
              },
            }}
          >
            Register
          </Button>
        </Box>

        {/* Features */}
        <Box
          sx={{
            mt: 6,
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
            gap: 3,
          }}
        >
          {[
            { icon: "⚡", text: "Lightning Fast Bets" },
            { icon: "🔒", text: "Bank-Level Security" },
            { icon: "📊", text: "Live Match Analytics" },
            { icon: "💰", text: "Instant Withdrawals" },
          ].map((f, i) => (
            <Box
              key={i}
              sx={{
                textAlign: "center",
                animation: `fadeIn 1s ease ${i * 0.3}s both`,
              }}
            >
              <Typography sx={{ fontSize: "2rem" }}>{f.icon}</Typography>
              <Typography
                sx={{
                  fontSize: "1rem",
                  color: "rgba(255,255,255,0.75)",
                  fontWeight: 500,
                  mt: 0.5,
                }}
              >
                {f.text}
              </Typography>
            </Box>
          ))}
        </Box>
      </Paper>
    </Box>
  );
}







