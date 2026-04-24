import { useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useEmblaCarousel from 'embla-carousel-react';

const projects = [
  {
    title: '📷 Photograph – Ed Sheeran',
    description:
      'Lagu tentang kenangan cinta yang tetap hidup lewat foto, walau jarak memisahkan.',
    image: '/ed.jpg',
    color: 'from-blue-400 via-indigo-500 to-slate-800',
  },
  {
    title: '🎭 Somebody’s Pleasure – Aziz Hedra',
    description:
      'Cerita tentang kehilangan diri sendiri demi menyenangkan orang lain.',
    image: '/aziz.jpg',
    color: 'from-purple-600 via-slate-700 to-black',
  },
  {
    title: '🌅 Bersenja Gurau – Raim Laode',
    description:
      'lagu manis tentang menikmati waktu sederhana bareng orang tersayang.',
    image: '/raim.jpeg',
    color: 'from-orange-300 via-pink-400 to-rose-500',
  },
  {
    title: '🌆 Kota Ini Tak Sama Tanpamu – Nadhif Basmalah',
    description:
      'Perasaan kosong karena seseorang pergi, sampai kota terasa berbeda.',
    image: '/nadhif.jpg',
    color: 'from-gray-500 via-slate-600 to-black',
  },
  {
    title: '🎲 Risk It All – Bruno Mars',
    description:
      'Tentang berani mengambil risiko demi cinta yang benar-benar diinginkan.',
    image: '/bruno.jpg',
    color: 'from-red-500 via-orange-500 to-yellow-400',
  },
  {
    title: '☎️ Payphone – Maroon 5',
    description:
      'Kisah hubungan yang gagal dan penyesalan yang tersisa',
    image: '/maroon.jpg',
    color: 'from-pink-500 via-rose-500 to-red-600',
  },
];

export default function ProjectsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
  });

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 3000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <section
      id="projects"
      className="py-20 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-800"
    >
      <div className="container mx-auto px-4">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            Soundtrack Hidup🎵
          </h2>
        </motion.div>

        {/* CAROUSEL */}
        <div className="relative max-w-6xl mx-auto">
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex gap-6">

              {projects.map((project, index) => (
                <div
                  key={index}
                  className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.33%]"
                >
                  <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/10 hover:-translate-y-3 transition-all duration-500">

                    <div className="relative group">

                      {/* GLOW */}
                      <div
                        className={`absolute inset-0 rounded-xl bg-gradient-to-r ${project.color}
                        blur-2xl opacity-40 group-hover:opacity-90 
                        scale-90 group-hover:scale-110 transition duration-500`}
                      />

                      {/* BORDER */}
                      <div
                        className={`relative p-[2px] rounded-xl bg-gradient-to-r ${project.color}`}
                      >

                        {/* IMAGE */}
                        <div className="aspect-[2/3] w-full rounded-xl overflow-hidden bg-black flex items-center justify-center">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover object-center 
                            group-hover:scale-110 transition duration-500"
                          />
                        </div>

                      </div>
                    </div>

                    {/* TITLE */}
                    <h3 className="font-bold text-lg mt-4 text-white">
                      {project.title}
                    </h3>

                    {/* DESC */}
                    <p className="text-sm text-gray-300 mt-2">
                      {project.description}
                    </p>

                  </div>
                </div>
              ))}

            </div>
          </div>

          {/* BUTTON */}
          <Button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 text-white backdrop-blur"
          >
            <ChevronLeft />
          </Button>

          <Button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 text-white backdrop-blur"
          >
            <ChevronRight />
          </Button>

        </div>
      </div>
    </section>
  );
}