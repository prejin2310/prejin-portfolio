import { useEffect, useRef } from "react";

export default function DotGridBackground() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let id;
    let stars = [];
    const mouse = { x: 0, y: 0 };
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const createStar = (w, h) => {
      const base = Math.random();
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.35 + Math.random() * 1.35,
        vx: (Math.random() - 0.5) * 0.1,
        vy: (Math.random() - 0.5) * 0.1,
        alpha: 0.16 + Math.random() * 0.72,
        twinkle: 0.004 + Math.random() * 0.018,
        phase: Math.random() * Math.PI * 2,
        glow: base > 0.96 ? 3.2 : base > 0.9 ? 2.2 : 0,
      };
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const density = width < 640 ? 0.00008 : 0.00013;
      const count = Math.min(250, Math.max(70, Math.floor(width * height * density)));
      stars = Array.from({ length: count }, () => createStar(width, height));
    };

    const onMouseMove = (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    const draw = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      ctx.clearRect(0, 0, width, height);

      for (const star of stars) {
        if (!reduceMotion) {
          const dx = mouse.x - star.x;
          const dy = mouse.y - star.y;
          const dist = Math.max(120, Math.hypot(dx, dy));
          const pull = 11 / dist;
          star.x += star.vx + dx * pull * 0.0032;
          star.y += star.vy + dy * pull * 0.0032;
          star.phase += star.twinkle;
        }

        if (star.x < -6) star.x = width + 6;
        if (star.x > width + 6) star.x = -6;
        if (star.y < -6) star.y = height + 6;
        if (star.y > height + 6) star.y = -6;

        const tw = 0.75 + Math.sin(star.phase) * 0.25;
        const a = Math.min(1, Math.max(0.06, star.alpha * tw));

        if (star.glow > 0) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.glow, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${a * 0.16})`;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${a})`;
        ctx.fill();
      }

      id = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(id);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        background:
          "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px), radial-gradient(ellipse at 50% 8%, rgba(11, 28, 68, 0.32), transparent 58%), linear-gradient(180deg, #020718 0%, #02040f 50%, #03030a 100%)",
        backgroundSize: "36px 36px, 36px 36px, auto, auto",
      }}
    />
  );
}
