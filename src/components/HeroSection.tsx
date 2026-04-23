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

      // ✅ DARK MODE = GREY
      if (isDark) {
        gradient.addColorStop(0, '#f3f4f6');
        gradient.addColorStop(0.5, '#e5e7eb');
        gradient.addColorStop(1, '#d1d5db');
      } 
      // ✅ LIGHT MODE = NAVY
      else {
        gradient.addColorStop(0, '#0f172a');
        gradient.addColorStop(0.5, '#1e293b');
        gradient.addColorStop(1, '#334155');
      }

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        star.y += star.speed;
        if (star.y > canvas.height) star.y = 0;

        ctx.fillStyle = isDark
          ? 'rgba(0,0,0,0.25)'
          : 'rgba(255,255,255,0.4)';

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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* CANVAS */}
      <canvas ref={canvasRef} className="absolute inset-0 -z-20" />

      {/* OVERLAY */}
      <div className={`absolute inset-0 -z-10 ${
        isDark ? 'bg-gray-200/30' : 'bg-slate-900/30'
      }`} />

      {/* CURSOR GLOW */}
      <div
        ref={glowRef}
        className="pointer-events-none fixed w-80 h-80 rounded-full 
        bg-gradient-to-br from-slate-400/20 via-blue-500/20 to-slate-700/20
        blur-3xl -translate-x-1/2 -translate-y-1/2 z-10"
      />

      {/* TRAIL */}
      {trail.map((t) => (
        <motion.div
          key={t.id}
          className={`pointer-events-none fixed w-1.5 h-1.5 rounded-full blur-[1px] z-20 ${
            isDark ? 'bg-black/40' : 'bg-white/70'
          }`}
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
            transition={{ duration: 0.8 }}
            className="flex justify-center md:justify-end"
          >
            <div className="relative">
              {/* NAVY GLOW */}
              <div className={`absolute -inset-2 rounded-3xl blur-2xl opacity-70 ${
                isDark
                  ? 'bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600'
                  : 'bg-gradient-to-r from-slate-700 via-blue-800 to-slate-900'
              }`}></div>

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
            
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              
              {/* TEXT UTAMA */}
              <span className={isDark ? 'text-gray-900' : 'text-slate-100'}>
                Akses Dimulai
              </span>

              <br />

              {/* NAMA */}
              <span className={`bg-gradient-to-r ${
                isDark
                  ? 'from-gray-900 via-gray-700 to-gray-500'
                  : 'from-slate-200 via-blue-300 to-slate-400'
              } bg-clip-text text-transparent`}>
                Aidil Mubaraq Syah
              </span>
            </h1>

            {/* PARAGRAF */}
            <p className={`mt-6 max-w-xl text-lg font-medium ${
              isDark ? 'text-gray-700' : 'text-slate-300'
            }`}>
              Dalam setiap proyek kecil, terukir perjalanan menuju 
              penguasaan teknologi dan masa depan digital.
            </p>

            {/* BUTTON */}
            <div className="flex gap-4 mt-10 justify-center md:justify-start">
              <button
                onClick={scrollToAbout}
                className="px-8 py-3 rounded-full text-white font-bold 
                bg-gradient-to-r from-slate-700 to-slate-900"
              >
                Jelajahi
              </button>

              <a
                href="#"
                className={`px-8 py-3 rounded-full font-semibold ${
                  isDark
                    ? 'text-gray-900 bg-white/50 border border-gray-400'
                    : 'text-white bg-white/10 border border-white/20'
                }`}
              >
                Hubungi
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* SCROLL ICON */}
      <motion.button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 p-3 rounded-full 
        bg-white/20 border border-white/20 backdrop-blur-md z-30"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ArrowDown className={`${isDark ? 'text-gray-700' : 'text-white'} w-6 h-6`} />
      </motion.button>
    </section>
  );
}