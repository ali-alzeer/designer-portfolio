import { useRef, useEffect, useMemo } from "react";

const BackgroundCanvas = ({ theme }: { theme: "dark" | "light" }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Generate shape data once
  const shapes = useMemo(() => {
    return Array.from({ length: 50 }).map(() => ({
      x: Math.random(), // store as percentage/ratio
      y: Math.random(),
      size: Math.random() * 40 + 10,
      rotation: Math.random() * Math.PI * 2,
      type: Math.random() > 0.5 ? "square" : "triangle",
      hasFill: Math.random() > 0.5 ? true : false,
      fill: Math.random() > 0.7 ? "rgb(255,130,255,.2)" : "rgb(130,130,130,.2)",
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    // Handle resizing
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      draw();
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Set color based on theme
      ctx.fillStyle =
        theme === "dark" ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)";

      shapes.forEach((shape) => {
        const x = shape.x * canvas.width;
        const y = shape.y * canvas.height;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(shape.rotation);

        if (shape.type === "square") {
          ctx.strokeStyle = shape.fill;
          ctx.lineWidth = 1;
          if (shape.hasFill) {
            ctx.fillStyle = shape.fill;
            ctx.fillRect(
              -shape.size / 2,
              -shape.size / 2,
              shape.size,
              shape.size,
            );
          }
          ctx.strokeRect(
            -shape.size / 2,
            -shape.size / 2,
            shape.size,
            shape.size,
          );
        } else {
          ctx.beginPath();
          ctx.moveTo(0, -shape.size / 2);
          ctx.lineTo(-shape.size / 2, shape.size / 2);
          ctx.lineTo(shape.size / 2, shape.size / 2);
          ctx.closePath();
          ctx.strokeStyle = shape.fill;
          ctx.lineWidth = 1;
          if (shape.hasFill) {
            ctx.fillStyle = shape.fill;
            ctx.fill();
          }
          ctx.stroke();
        }
        ctx.restore();
      });
    };

    window.addEventListener("resize", resize);
    resize(); // Initial draw

    return () => window.removeEventListener("resize", resize);
  }, [shapes, theme]); // Redraws if theme changes

  return (
    <canvas
      role="presentation"
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1, // Stay behind your content
        pointerEvents: "none", // Don't block clicks
      }}
    />
  );
};

export default BackgroundCanvas;
