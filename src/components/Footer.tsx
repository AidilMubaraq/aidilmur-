import { motion } from 'framer-motion';
import { Github, Instagram, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ];

  return (
    <footer
      className="
      py-8 transition-all duration-300

      /* 🌘 LIGHT MODE (DEEP SLATE, LUXURY MINIMAL) */
      bg-gradient-to-r 
      from-slate-900 via-slate-800 to-slate-900
      border-t border-slate-700/30
      shadow-[0_-10px_30px_rgba(0,0,0,0.3)]

      /* 🌊 DARK MODE (CYAN OCEAN, FRESH & TECH) */
      dark:bg-gradient-to-r 
      dark:from-[#020617] dark:via-[#0b1a24] dark:to-[#064e5a]
      dark:border-cyan-200/10
      "
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">

          {/* TEXT */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="
            flex items-center gap-2 text-sm font-medium tracking-wide

            /* 🌘 LIGHT MODE */
            text-slate-300

            /* 🌊 DARK MODE */
            dark:text-slate-300
            "
          >
            <span>© {currentYear} Crafted with</span>

            <Heart className="h-4 w-4 text-red-400 fill-red-400 animate-pulse" />

            <span className="
              font-semibold

              /* 🌘 LIGHT MODE (SUBTLE SILVER ACCENT) */
              text-slate-200

              /* 🌊 DARK MODE (CYAN GLOW ACCENT) */
              dark:bg-gradient-to-r dark:from-cyan-200 dark:via-cyan-100 dark:to-slate-200
              dark:bg-clip-text dark:text-transparent
            ">
              by Aidil Mubaraq Syah
            </span>
          </motion.div>

          {/* SOCIAL */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-4"
          >
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="
                p-2 rounded-full transition-all duration-300

                /* 🌘 LIGHT MODE (DARK ICONS) */
                text-slate-400 hover:text-slate-200 hover:bg-slate-700/30 hover:scale-110

                /* 🌊 DARK MODE (CYAN ICONS) */
                dark:text-slate-400 dark:hover:text-cyan-200 dark:hover:bg-cyan-300/10
                "
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </footer>
  );
}