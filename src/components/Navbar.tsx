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
            // ✅ DARK MODE = GREY
            ? `backdrop-blur-xl 
               bg-gradient-to-r from-[#f3f4f6]/95 via-[#e5e7eb]/95 to-[#d1d5db]/95 
               border-b border-gray-300/50 
               shadow-[0_4px_20px_rgba(0,0,0,0.1)]`
            // ✅ LIGHT MODE = NAVY
            : `backdrop-blur-xl 
               bg-gradient-to-r from-[#0f172a]/95 via-[#1e293b]/95 to-[#334155]/95 
               border-b border-slate-600/40 
               shadow-[0_4px_30px_rgba(0,0,0,0.6)]`
          : isDark
          ? `bg-gradient-to-r from-[#f3f4f6]/80 via-[#e5e7eb]/80 to-[#d1d5db]/80`
          : `bg-gradient-to-r from-[#0f172a]/80 via-[#1e293b]/80 to-[#334155]/80`
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
                // dark = grey bg → logo gelap
                ? 'bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500 bg-clip-text text-transparent'
                // light = navy bg → logo terang
                : 'bg-gradient-to-r from-slate-200 via-blue-300 to-slate-400 bg-clip-text text-transparent'
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
                    ? 'text-gray-700 hover:text-black'
                    : 'text-slate-200 hover:text-white'
                }`}
                whileHover={{ y: -2 }}
              >
                {item.label}

                <span
                  className={`absolute left-1/2 -translate-x-1/2 -bottom-1 h-[2px] w-0 
                  transition-all duration-300 group-hover:w-full ${
                    isDark ? 'bg-gray-800' : 'bg-white'
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
                  ? 'text-gray-700 hover:bg-gray-300/50'
                  : 'text-white hover:bg-white/10'
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
                ? 'bg-gray-100/95 border-t border-gray-300'
                : 'bg-[#0f172a]/95 border-t border-slate-600'
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
                      ? 'text-gray-700 hover:text-black'
                      : 'text-slate-200 hover:text-white'
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