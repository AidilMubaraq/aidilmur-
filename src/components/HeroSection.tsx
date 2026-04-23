import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import ThreeScene from './ThreeScene';

export default function HeroSection({ isDark }) {
  const glowRef = useRef(null);
  const canvasRef = useRef(null);
  const [trail, setTrail] = useState([]);

  useEffect(() => {
    const move = (e) => {
      if (glowRef.current) {
        glowRef.current.style.left = e.clientX + 'px';
        glowRef.current.style.top = e.clientY + 'px';
      }

      setTrail((prev) => [
        ...prev.slice(-15),
        { x: e.clientX, y: e.clientY, id: Date.now() }
      ]);
    };

    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let stars = [];
    let animationId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 150; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5,
        speed: Math.random() * 0.25
      });
    }

    const animate = () => {
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);

      if (isDark) {
        gradient.addColorStop(0, '#020617');
        gradient.addColorStop(0.5, '#0f172a');
        gradient.addColorStop(1, '#1e293b');
      } else {
        gradient.addColorStop(0, '#0f172a');
        gradient.addColorStop(0.5, '#1e293b');
        gradient.addColorStop(1, '#334155');
      }

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        star.y += star.speed;
        if (star.y > canvas.height) star.y = 0;

        ctx.fillStyle = 'rgba(255,255,255,0.4)';
        ctx.fillRect(star.x, star.y, star.size, star.size);
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [isDark]);

  const scrollToAbout = () => {
    const el = document.querySelector('#about');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden font-sans">

      <canvas ref={canvasRef} className="absolute inset-0 -z-20" />

      <div className={`absolute inset-0 -z-10 ${
        isDark ? 'bg-black/30' : 'bg-slate-900/30'
      }`} />

      {/* Glow */}
      <div
        ref={glowRef}
        className={`pointer-events-none fixed w-80 h-80 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 z-10 ${
          isDark
            ? 'bg-gradient-to-br from-pink-500/30 via-purple-500/30 to-indigo-500/30'
            : 'bg-gradient-to-br from-cyan-400/30 via-blue-500/30 to-indigo-500/30'
        }`}
      />

      {trail.map((t) => (
        <motion.div
          key={t.id}
          className="pointer-events-none fixed w-1.5 h-1.5 rounded-full blur-[1px] bg-white/70 z-20"
          style={{ left: t.x, top: t.y }}
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 0, scale: 2.5 }}
          transition={{ duration: 0.6 }}
        />
      ))}

      <ThreeScene />

      <div className="container mx-auto px-4 relative z-30">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">

          {/* IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex justify-center md:justify-end"
          >
            <div className="relative">
              <div className={`absolute -inset-2 rounded-3xl blur-2xl opacity-80 ${
                isDark
                  ? 'bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600'
                  : 'bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600'
              }`} />

              <div className="relative bg-white/20 backdrop-blur-xl border border-white/20 rounded-3xl p-2">
                <img
                  src="laut.jpg"
                  alt="Aidil Mubaraq"
                  className="w-64 h-80 md:w-80 md:h-[420px] object-cover rounded-2xl"
                />
              </div>
            </div>
          </motion.div>

          {/* TEXT */}
          <div className="text-center md:text-left">
            
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-wide">
              
              <span className={isDark ? 'text-white' : 'text-blue-400'}>
                Akses Dimulai
              </span>

              <br />

              <span className={`bg-gradient-to-r ${
                isDark
                  ? 'from-pink-400 via-purple-400 to-indigo-400'
                  : 'from-cyan-300 via-blue-400 to-indigo-400 whitespace-nowrap'
              } bg-clip-text text-transparent`}>
                Aidil Mubaraq Syah
              </span>
            </h1>

            {/* 🚀 PARAGRAF */}
            <p className={`mt-6 max-w-xl text-lg leading-relaxed tracking-wide ${
              isDark ? 'text-gray-300' : 'text-cyan-300'
            }`}>
              🚀 Dalam setiap proyek kecil, terukir perjalanan menuju 
              penguasaan teknologi dan masa depan digital.
            </p>

            <div className="flex gap-4 mt-10 justify-center md:justify-start">
              <button
                onClick={scrollToAbout}
                className="px-8 py-3 rounded-full text-white font-bold 
                bg-gradient-to-r from-blue-600 to-indigo-700"
              >
                Jelajahi
              </button>

              <a
                href="#"
                className={`px-8 py-3 rounded-full font-semibold ${
                  isDark
                    ? 'text-white bg-purple-600'
                    : 'text-white bg-blue-600'
                }`}
              >
                Hubungi
              </a>
            </div>
          </div>

        </div>
      </div>

      <motion.button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 p-3 rounded-full 
        bg-white/20 backdrop-blur-md z-30"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ArrowDown className="text-white w-6 h-6" />
      </motion.button>
    </section>
  );
}