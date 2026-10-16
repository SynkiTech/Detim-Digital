"use client";

import { useEffect, useRef } from "react";

type Ember = {
  x: number;
  y: number;
  r: number;
  speed: number;
  drift: number;
  opacity: number;
  flicker: number;
  depth: number;
};

type EmberCanvasProps = {
  /** Normalised cursor position (-1..1) for parallax. */
  pointer: React.RefObject<{ x: number; y: number }>;
};

/**
 * Lightweight ember/particle canvas (Master Prompt §5.3.4): ~50 orange
 * embers drifting upward with flicker and cursor parallax. Fewer on
 * mobile, paused when the tab is hidden, disabled under reduced motion,
 * devicePixelRatio capped for 60fps on mid-range phones.
 */
export function EmberCanvas({ pointer }: EmberCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    const mobile = window.matchMedia("(max-width: 768px)").matches;
    const COUNT = mobile ? 24 : 50;

    let width = 0;
    let height = 0;
    let raf = 0;
    let running = true;
    const embers: Ember[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const spawn = (randomY = false): Ember => ({
      x: Math.random() * width,
      y: randomY ? Math.random() * height : height + 12,
      r: 0.8 + Math.random() * 2.6,
      speed: 0.12 + Math.random() * 0.5,
      drift: (Math.random() - 0.5) * 0.24,
      opacity: 0.25 + Math.random() * 0.55,
      flicker: 0.5 + Math.random() * 1.6,
      depth: 0.3 + Math.random() * 0.7,
    });

    resize();
    for (let i = 0; i < COUNT; i++) embers.push(spawn(true));

    let last = performance.now();
    const frame = (now: number) => {
      if (!running) return;
      const dt = Math.min(48, now - last) / 16.7;
      last = now;

      const p = pointer.current ?? { x: 0, y: 0 };
      ctx.clearRect(0, 0, width, height);

      for (const e of embers) {
        e.y -= e.speed * dt;
        e.x += e.drift * dt + p.x * 0.35 * e.depth * dt;
        if (e.y < -14 || e.x < -20 || e.x > width + 20) {
          Object.assign(e, spawn());
        }
        const twinkle =
          e.opacity * (0.72 + 0.28 * Math.sin(now / 260 * e.flicker));
        const glow = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, e.r * 3);
        glow.addColorStop(0, `rgba(255, 140, 60, ${twinkle})`);
        glow.addColorStop(0.45, `rgba(242, 92, 5, ${twinkle * 0.55})`);
        glow.addColorStop(1, "rgba(242, 92, 5, 0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.r * 3, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const onResize = () => resize();
    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };

    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [pointer]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="cine-embers absolute inset-0 h-full w-full motion-reduce:hidden"
    />
  );
}
