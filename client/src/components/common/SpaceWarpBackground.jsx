import { useEffect, useRef } from "react";
import { useTheme } from "../../context/ThemeContext";

/**
 * High-performance 3D Cosmic Space Warp & Glitter Starfield Canvas
 * Supports seamless transitions between Dark and Light mode
 */
export default function SpaceWarpBackground() {
  const { isDark } = useTheme();
  const canvasRef = useRef(null);
  const isDarkRef = useRef(isDark);

  useEffect(() => {
    isDarkRef.current = isDark;
  }, [isDark]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle pool
    const numStars = 420;
    const stars = [];
    const warpSpeed = 1.35;
    const maxDepth = 1000;

    let targetMouseX = 0;
    let targetMouseY = 0;
    let mouseX = 0;
    let mouseY = 0;

    // Palettes:
    // Dark mode: Crisp starlight whites, rose, and WatchFlow crimson tints
    const darkStarColors = [
      "255, 255, 255",
      "255, 240, 240",
      "245, 100, 100",
      "224, 77, 77",
      "255, 175, 175",
    ];

    // Light mode: Vibrant crimson, rose quartz, and refined slate starlight
    const lightStarColors = [
      "186, 60, 60",
      "224, 77, 77",
      "140, 45, 45",
      "100, 116, 139",
      "230, 80, 80",
    ];

    function createStar() {
      const colorIndex = Math.floor(Math.random() * darkStarColors.length);
      return {
        x: (Math.random() - 0.5) * width * 2,
        y: (Math.random() - 0.5) * height * 2,
        z: Math.random() * maxDepth + 1,
        prevZ: 0,
        darkColor: darkStarColors[colorIndex],
        lightColor: lightStarColors[colorIndex],
        size: Math.random() * 1.5 + 0.5,
      };
    }

    for (let i = 0; i < numStars; i++) {
      const star = createStar();
      star.prevZ = star.z;
      stars.push(star);
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      targetMouseX = (e.clientX - width / 2) * 0.15;
      targetMouseY = (e.clientY - height / 2) * 0.15;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const render = () => {
      // Smooth camera tilt
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      const dark = isDarkRef.current;

      // Theme-adaptive background clear:
      // Dark mode: Deep cosmic dark clear
      // Light mode: Clean warm cream-white clear
      if (dark) {
        ctx.fillStyle = "rgba(4, 2, 8, 0.4)";
      } else {
        ctx.fillStyle = "rgba(250, 248, 246, 0.45)";
      }
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2 + mouseX;
      const cy = height / 2 + mouseY;

      for (let i = 0; i < numStars; i++) {
        const star = stars[i];

        star.prevZ = star.z;
        star.z -= warpSpeed * 3;

        // Reset if star passes camera
        if (star.z <= 1) {
          star.x = (Math.random() - 0.5) * width * 2;
          star.y = (Math.random() - 0.5) * height * 2;
          star.z = maxDepth;
          star.prevZ = maxDepth;
        }

        // 3D perspective projection
        const k = 400 / star.z;
        const px = star.x * k + cx;
        const py = star.y * k + cy;

        const prevK = 400 / star.prevZ;
        const prevPx = star.x * prevK + cx;
        const prevPy = star.y * prevK + cy;

        // Skip off-screen stars
        if (px < 0 || px >= width || py < 0 || py >= height) {
          continue;
        }

        const depthRatio = 1 - star.z / maxDepth;
        const alpha = dark
          ? Math.min(Math.max(depthRatio * 1.2, 0.1), 0.95)
          : Math.min(Math.max(depthRatio * 0.9, 0.15), 0.85);

        const thickness = Math.max(star.size * (1 - star.z / maxDepth) * 1.8, 0.6);
        const color = dark ? star.darkColor : star.lightColor;

        // Draw warp streak trail
        ctx.beginPath();
        ctx.moveTo(prevPx, prevPy);
        ctx.lineTo(px, py);
        ctx.strokeStyle = `rgba(${color}, ${alpha})`;
        ctx.lineWidth = thickness;
        ctx.lineCap = "round";
        ctx.stroke();

        // Star head sparkle
        if (depthRatio > 0.6) {
          ctx.beginPath();
          ctx.arc(px, py, thickness * 0.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${color}, ${Math.min(alpha * 1.2, 1)})`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* 3D Warp Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

      {/* Atmospheric Cosmic Nebula Gradients */}
      <div
        className={`absolute -top-32 -left-32 w-[550px] h-[550px] rounded-full blur-[120px] pointer-events-none transition-opacity duration-500 ${
          isDark ? "bg-[#BA3C3C]/12 opacity-100" : "bg-[#BA3C3C]/8 opacity-60"
        }`}
      />
      <div
        className={`absolute top-1/3 -right-32 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none transition-opacity duration-500 ${
          isDark ? "bg-[#E04D4D]/10 opacity-100" : "bg-[#E04D4D]/6 opacity-60"
        }`}
      />
      <div
        className={`absolute -bottom-40 left-1/3 w-[650px] h-[650px] rounded-full blur-[150px] pointer-events-none transition-opacity duration-500 ${
          isDark ? "bg-[#521313]/15 opacity-100" : "bg-[#BA3C3C]/5 opacity-40"
        }`}
      />

      {/* Subtle vignette darkening towards edges */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
          isDark
            ? "bg-radial from-transparent via-transparent to-black/60"
            : "bg-radial from-transparent via-transparent to-slate-200/30"
        }`}
      />
    </div>
  );
}
