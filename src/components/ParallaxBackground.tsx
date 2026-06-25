import { useEffect, useRef } from 'react';

export default function ParallaxBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollRef = useRef(0);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = document.documentElement.scrollHeight;

    const resize = () => {
      width = window.innerWidth;
      height = document.documentElement.scrollHeight;
      canvas.width = width;
      canvas.height = height;
    };
    resize();
    window.addEventListener('resize', resize);

    const onScroll = () => {
      scrollRef.current = window.scrollY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const elements = Array.from({ length: 18 }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 2 + Math.random() * 4,
      speed: 0.15 + Math.random() * 0.35,
      type: i % 3 as 0 | 1 | 2,
      phase: Math.random() * Math.PI * 2,
    }));

    const lines = Array.from({ length: 6 }, () => ({
      x1: Math.random() * width,
      y1: Math.random() * height,
      length: 60 + Math.random() * 120,
      angle: Math.random() * Math.PI * 2,
      speed: 0.08 + Math.random() * 0.15,
      phase: Math.random() * Math.PI * 2,
    }));

    let time = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.008;

      const scroll = scrollRef.current;
      const viewTop = scroll;
      const viewBottom = scroll + window.innerHeight;

      elements.forEach((el) => {
        const offsetY = el.y - scroll * el.speed;
        const baseY = ((offsetY % height) + height) % height;

        if (baseY < viewTop - 100 || baseY > viewBottom + 100) return;

        const drawY = baseY;
        const sway = Math.sin(time + el.phase) * 15;
        const drawX = el.x + sway;

        ctx.globalAlpha = 0.12 + Math.sin(time * 0.5 + el.phase) * 0.06;

        if (el.type === 0) {
          ctx.fillStyle = '#1d9bf0';
          ctx.fillRect(drawX, drawY, el.size * 2, el.size * 2);
        } else if (el.type === 1) {
          ctx.beginPath();
          ctx.moveTo(drawX - el.size * 2, drawY);
          ctx.lineTo(drawX + el.size * 2, drawY);
          ctx.moveTo(drawX, drawY - el.size * 2);
          ctx.lineTo(drawX, drawY + el.size * 2);
          ctx.strokeStyle = '#ff8a00';
          ctx.lineWidth = 1;
          ctx.stroke();
        } else {
          const s = el.size * 1.2;
          ctx.save();
          ctx.translate(drawX, drawY);
          ctx.rotate(time * 0.3 + el.phase);
          ctx.strokeStyle = '#0b3a5b';
          ctx.lineWidth = 1;
          ctx.strokeRect(-s, -s, s * 2, s * 2);
          ctx.restore();
        }
      });

      lines.forEach((line) => {
        const offsetY = line.y1 - scroll * line.speed;
        const baseY = ((offsetY % height) + height) % height;

        if (baseY < viewTop - 200 || baseY > viewBottom + 200) return;

        const sway = Math.sin(time * 0.7 + line.phase) * 20;
        const angle = line.angle + Math.sin(time * 0.3 + line.phase) * 0.2;
        const x1 = line.x1 + sway;
        const y1 = baseY;
        const x2 = x1 + Math.cos(angle) * line.length;
        const y2 = y1 + Math.sin(angle) * line.length;

        ctx.globalAlpha = 0.06 + Math.sin(time + line.phase) * 0.03;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = '#1d9bf0';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.globalAlpha = 0.1;
        ctx.beginPath();
        ctx.fillStyle = '#ff8a00';
        ctx.fillRect(x1 - 1, y1 - 1, 2, 2);
        ctx.fillRect(x2 - 1, y2 - 1, 2, 2);
      });

      ctx.globalAlpha = 1;
      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.7 }}
      aria-hidden="true"
    />
  );
}
