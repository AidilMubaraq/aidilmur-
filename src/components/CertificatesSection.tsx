import { useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import useEmblaCarousel from "embla-carousel-react";

type Destination = {
  title: string;
  image: string;
  description: string;
  reason: string;
  badge: string;
  color: string;
};

const destinations: Destination[] = [
  {
    title: "👑 United Kingdom",
    image: "/uk.jpg",
    description: "Classic London, Big Ben, and timeless streets.",
    reason: "I love the calm vintage vibes.",
    badge: "✨ Dream Place",
    color: "from-yellow-300 via-orange-300 to-amber-400",
  },
  {
    title: "⛰️ Switzerland",
    image: "/alpen.jpg",
    description: "Quiet Alps and views that feel unreal.",
    reason: "Peace feels expensive there.",
    badge: "📍 Must Visit",
    color: "from-cyan-300 via-sky-300 to-blue-400",
  },
  {
    title: "🥢 China",
    image: "/wall.jpg",
    description: "Great Wall and cities full of light.",
    reason: "Tradition and future in one place.",
    badge: "🚀 Future Journey",
    color: "from-red-400 via-orange-400 to-yellow-300",
  },
  {
    title: "🕌 India",
    image: "/mahal.jpg",
    description: "Taj Mahal and a culture full of soul.",
    reason: "Its history feels alive.",
    badge: "🌍 Bucket List",
    color: "from-pink-400 via-rose-400 to-orange-300",
  },
  {
    title: "☕ Turkey",
    image: "/balon.jpg",
    description: "Cappadocia skies and warm golden sunsets.",
    reason: "Golden skies hit different.",
    badge: "✨ Dream Place",
    color: "from-orange-300 via-amber-300 to-yellow-200",
  },
  {
    title: "🥐 France",
    image: "/paris.jpg",
    description: "Paris nights and elegant timeless charm.",
    reason: "Luxury in the simplest moments.",
    badge: "📍 Must Visit",
    color: "from-purple-300 via-pink-300 to-rose-300",
  },
];

export default function CertificatesSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
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
      id="certificates"
      className="relative py-20 overflow-hidden bg-gradient-to-br from-[#08111f] via-[#0b1f35] to-[#0f4c5c]"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-400/10 to-cyan-300/10 blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-cyan-100">
            Next Stop? ✈️
          </h2>

          <p className="text-cyan-100/70 mt-4 text-sm md:text-base">
            Not just places, but future memories.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative max-w-6xl mx-auto">
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex gap-6">
              {destinations.map((place, index) => (
                <div
                  key={index}
                  className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.33%]"
                >
                  <div className="p-5 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/10 hover:-translate-y-3 transition-all duration-500">

                    <div className="relative group">
                      {/* Glow */}
                      <div
                        className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${place.color}
                        blur-2xl opacity-40 group-hover:opacity-90
                        scale-90 group-hover:scale-110
                        transition duration-500`}
                      />

                      {/* Badge */}
                      <div className="absolute top-3 right-3 z-20 px-3 py-1 rounded-full text-xs font-medium bg-black/40 backdrop-blur-md text-white border border-white/10">
                        {place.badge}
                      </div>

                      {/* Square Image */}
                      <div
                        className={`relative p-[2px] rounded-3xl bg-gradient-to-r ${place.color}`}
                      >
                        <div className="aspect-square w-full rounded-3xl overflow-hidden bg-black">
                          <img
                            src={place.image}
                            alt={place.title}
                            className="w-full h-full object-cover object-center group-hover:scale-110 transition duration-500"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-lg mt-4 text-white">
                      {place.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-cyan-100/80 mt-2 leading-relaxed">
                      {place.description}
                    </p>

                    {/* Why */}
                    <p className="text-sm text-cyan-200 mt-3 italic">
                      Why? {place.reason}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
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