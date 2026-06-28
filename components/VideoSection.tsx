"use client";

import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { useRef, useState, useEffect, useCallback } from "react";
import { useLanguage } from "@/lib/i18n/context";
import { Button } from "./ui/button";

const translations = {
  en: {
    title: "See Our Work in Action",
    subtitle:
      "Watch how we deliver professional HVAC services — straight from our Instagram",
    viewOnInstagram: "View on Instagram",
    followUs: "Follow Us on Instagram",
    followFb: "Follow Us on Facebook",
    featured: "Featured",
  },
  es: {
    title: "Ve Nuestro Trabajo en Acción",
    subtitle:
      "Mira cómo entregamos servicios profesionales de HVAC — directo de nuestras redes sociales",
    viewOnInstagram: "Ver en Instagram",
    followUs: "Síguenos en Instagram",
    followFb: "Síguenos en Facebook",
    featured: "Destacado",
  },
};

/**
 * CAROUSEL IMAGES
 * Replace these placeholder paths with your own images.
 * All 6 images rotate automatically in the featured hero carousel.
 */
const carouselImages = [
  "/carousel/WhatsApp Image 2026-06-25 at 19.48.17.jpeg",
  "/carousel/WhatsApp Image 2026-06-25 at 19.48.17 (1).jpeg",
  "/carousel/WhatsApp Image 2026-06-25 at 19.48.18.jpeg",
  "/carousel/WhatsApp Image 2026-06-25 at 19.48.18 (1).jpeg",
  "/carousel/WhatsApp Image 2026-06-25 at 19.48.18 (2).jpeg",
  "/carousel/WhatsApp Image 2026-06-25 at 19.48.19.jpeg",
  "/carousel/WhatsApp Image 2026-06-25 at 19.52.58.jpeg",
  "/carousel/WhatsApp Image 2026-06-25 at 19.52.58 (1).jpeg",
];

const CAROUSEL_INTERVAL = 5000;

const socialReels = [
  {
    url: "https://www.instagram.com/reel/DZTM5QfJf9f/",
    thumbnail: "/images/instagram-video-1.jpg",
    title_en: "Professional AC Installation",
    title_es: "Instalación Profesional de AC",
    platform: "instagram" as const,
  },
  {
    url: "https://www.facebook.com/reel/1631040804834857",
    thumbnail: "/images/instagram-video-2.jpg",
    title_en: "Equipment Diagnostics & Repair",
    title_es: "Diagnóstico y Reparación de Equipos",
    platform: "facebook" as const,
  },
  {
    url: "https://www.instagram.com/reel/DTqql-NEotj/",
    thumbnail: "/images/instagram-video-4.jpg",
    title_en: "Maintenance & Deep Cleaning",
    title_es: "Mantenimiento y Limpieza Profunda",
    platform: "instagram" as const,
  },
  {
    url: "https://www.facebook.com/reel/1507157424237573",
    thumbnail: " /carousel/WhatsApp Image 2026-06-25 at 19.48.17.jpeg",
    title_en: "Commercial HVAC Solutions",
    title_es: "Soluciones HVAC Comerciales",
    platform: "facebook" as const,
  },
];

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function FeaturedCarousel({
  language,
}: {
  language: "en" | "es";
}) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetTimer = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % carouselImages.length);
    }, CAROUSEL_INTERVAL);
  }, []);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [current, resetTimer]);

  const goTo = (idx: number) => {
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
  };

  const prev = () => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + carouselImages.length) % carouselImages.length);
  };

  const next = () => {
    setDirection(1);
    setCurrent((c) => (c + 1) % carouselImages.length);
  };

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  return (
    <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl group">
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.img
          key={current}
          src={carouselImages[current]}
          alt={`${language === "en" ? socialReels[0].title_en : socialReels[0].title_es} ${current + 1}`}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      {/* Prev / Next buttons */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
        aria-label="Previous"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
        aria-label="Next"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2">
        {carouselImages.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
              i === current
                ? "bg-white scale-110"
                : "bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Bottom info bar */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="text-white text-xl sm:text-2xl font-bold">
          {language === "en"
            ? socialReels[0].title_en
            : socialReels[0].title_es}
        </h3>
      </div>
    </div>
  );
}

export function VideoSection() {
  const { language } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  const t = translations[language];

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t.title}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Featured Carousel */}
        <motion.div
          style={{ scale, opacity: sectionOpacity }}
          className="max-w-5xl mx-auto mb-12"
        >
          <FeaturedCarousel language={language} />
        </motion.div>

        {/* Reel Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {socialReels.slice(1).map((reel, index) => (
            <motion.a
              key={index}
              href={reel.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="relative aspect-[9/16] rounded-xl overflow-hidden shadow-lg cursor-pointer group"
            >
              <img
                src={reel.thumbnail}
                alt={language === "en" ? reel.title_en : reel.title_es}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent group-hover:from-black/80 transition-colors" />

              {/* Play icon */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play
                  className="w-6 h-6 text-blue-600 ml-0.5"
                  fill="currentColor"
                />
              </div>

              {/* Platform badge */}
              {reel.platform === "facebook" ? (
                <div className="absolute top-3 right-3 w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <FacebookIcon className="w-4 h-4 text-white" />
                </div>
              ) : (
                <div className="absolute top-3 right-3 w-8 h-8 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 rounded-lg flex items-center justify-center">
                  <InstagramIcon className="w-4 h-4 text-white" />
                </div>
              )}

              {/* Title */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white font-semibold text-sm">
                  {language === "en" ? reel.title_en : reel.title_es}
                </p>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Follow CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12"
        >
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 hover:from-purple-700 hover:via-pink-600 hover:to-orange-500 text-white h-12 px-8 text-lg"
          >
            <a
              href="https://www.instagram.com/coldmanjp/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramIcon className="w-5 h-5 mr-2" />
              {t.followUs}
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white h-12 px-8 text-lg"
          >
            <a
              href="https://www.facebook.com/profile.php?id=100090963060487"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FacebookIcon className="w-5 h-5 mr-2" />
              {t.followFb}
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
