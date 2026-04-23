import { motion } from 'framer-motion';

const skills = {
  ipa: [
    { name: 'Matematika', level: 95 },
    { name: 'Fisika', level: 95 },
    { name: 'Biologi', level: 90 },
    { name: 'Kimia', level: 90 },
  ],
  ips: [
    { name: 'Sejarah', level: 95 },
    { name: 'Sosiologi', level: 90 },
    { name: 'Geografi', level: 93 },
    { name: 'Ekonomi', level: 90 },
  ],
  olahraga: [
    { name: 'Lari', level: 95 },
    { name: 'Badminton', level: 90 },
    { name: 'Bola', level: 90 },
    { name: 'Voli', level: 95 },
  ],
};

function SkillBar({
  name,
  level,
  delay,
  color,
}: {
  name: string;
  level: number;
  delay: number;
  color: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="space-y-2"
    >
      <div className="flex justify-between items-center text-white">
        <span className="font-medium">{name}</span>

        {/* POP-UP PERCENT */}
        <span className="text-sm font-bold text-cyan-300 drop-shadow-[0_0_6px_rgba(34,211,238,0.8)]">
          {level}%
        </span>
      </div>

      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: delay + 0.2 }}
          className={`h-full rounded-full ${color}`}
        />
      </div>
    </motion.div>
  );
}

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="py-20 md:py-32 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900"
    >
      <div className="container mx-auto px-4">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="text-cyan-400 font-medium mb-2 block">
            Expertise
          </span>

          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Skill Akademik🔥
          </h2>

          <div className="w-20 h-1 bg-cyan-400 mx-auto rounded-full" />
        </motion.div>

        {/* GRID */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

          {/* IPA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-slate-800 to-blue-900 border border-cyan-600 shadow-xl hover:scale-105 transition duration-500"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-cyan-500/30 border border-cyan-400 shadow-md">
                <span className="text-2xl">⚗️</span>
              </div>
              <h3 className="text-xl font-bold text-white">IPA</h3>
            </div>

            <div className="space-y-4">
              {skills.ipa.map((skill, index) => (
                <SkillBar
                  key={skill.name}
                  {...skill}
                  delay={index * 0.1}
                  color="bg-gradient-to-r from-cyan-400 to-blue-500"
                />
              ))}
            </div>
          </motion.div>

          {/* IPS (MANLY GOLD) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-slate-800 to-amber-900 border border-amber-600 shadow-xl hover:scale-105 transition duration-500"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-amber-500/30 border border-amber-400 shadow-md">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-bold text-white">IPS</h3>
            </div>

            <div className="space-y-4">
              {skills.ips.map((skill, index) => (
                <SkillBar
                  key={skill.name}
                  {...skill}
                  delay={index * 0.1}
                  color="bg-gradient-to-r from-amber-400 to-yellow-500"
                />
              ))}
            </div>
          </motion.div>

          {/* OLAHRAGA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-slate-800 to-teal-900 border border-teal-700 shadow-xl hover:scale-105 transition duration-500"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-teal-500/30 border border-teal-400 shadow-md">
                <span className="text-2xl">🌍</span>
              </div>
              <h3 className="text-xl font-bold text-white">Olahraga</h3>
            </div>

            <div className="space-y-4">
              {skills.olahraga.map((skill, index) => (
                <SkillBar
                  key={skill.name}
                  {...skill}
                  delay={index * 0.1}
                  color="bg-gradient-to-r from-teal-400 to-cyan-500"
                />
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}