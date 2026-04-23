import { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar({ isDark, toggleTheme }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Beranda', href: '#home' },
    { label: 'Kenalan Lebih Dekat⚡', href: '#about' },
    { label: 'Skil Akademik🔥', href: '#skills' },
    { label: 'Soundtrack Hidup🎵', href: '#projects' },
    { label: 'Get in Touch', href: 'https://wa.me/6285373819128' },
  ];

  const scrollToSection = (href) => {
    if (href.startsWith('#')) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.open(href, '_blank');
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? isDark
            // 🌑 DARK CYAN (BRIGHTER TONE)
            ? `backdrop-blur-xl 
               bg-gradient-to-r from-[#020617]/95 via-[#0f172a]/95 to-[#033649]/95 
               border-b border-cyan-200/20 
               shadow-[0_6px_30px_rgba(0,0,0,0.6)]`
            // LIGHT MODE (UNCHANGED)
            : `backdrop-blur-xl 
               bg-gradient-to-r from-slate-200/90 via-slate-300/90 to-slate-400/90 
               border-b border-slate-400/30 
               shadow-[0_6px_30px_rgba(0,0,0,0.15)]`
          : isDark
          ? `bg-gradient-to-r from-[#020617]/80 via-[#0f172a]/80 to-[#033649]/80 backdrop-blur-lg`
          : `bg-gradient-to-r from-slate-200/70 via-slate-300/70 to-slate-400/70 backdrop-blur-lg`
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* LOGO */}
          <motion.a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#home');
            }}
            className={`text-xl md:text-2xl font-bold tracking-wide cursor-pointer ${
              isDark
                ? 'bg-gradient-to-r from-cyan-200 via-cyan-100 to-white bg-clip-text text-transparent'
                : 'bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500 bg-clip-text text-transparent'
            }`}
          >
            Aidil Portfolio
          </motion.a>

          {/* DESKTOP */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                className={`relative font-medium transition-all group ${
                  isDark
                    ? 'text-slate-300 hover:text-cyan-200'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
                whileHover={{ y: -2 }}
              >
                {item.label}

                <span
                  className={`absolute left-1/2 -translate-x-1/2 -bottom-1 h-[2px] w-0 
                  transition-all duration-300 group-hover:w-full ${
                    isDark ? 'bg-cyan-200' : 'bg-slate-800'
                  }`}
                />
              </motion.a>
            ))}

            {/* THEME BUTTON */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className={`rounded-full ${
                isDark
                  ? 'text-cyan-200 hover:bg-cyan-300/10'
                  : 'text-slate-700 hover:bg-slate-300/50'
              }`}
            >
              <AnimatePresence mode="wait">
                {isDark ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                  >
                    <Sun className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                  >
                    <Moon className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </div>

          {/* MOBILE */}
          <div className="flex items-center gap-2 md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {isDark ? <Sun /> : <Moon />}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden backdrop-blur-xl ${
              isDark
                ? 'bg-[#020617]/95 border-t border-cyan-200/10'
                : 'bg-slate-200/95 border-t border-slate-400/30'
            }`}
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                  className={`transition ${
                    isDark
                      ? 'text-slate-300 hover:text-cyan-200'
                      : 'text-slate-700 hover:text-slate-900'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}