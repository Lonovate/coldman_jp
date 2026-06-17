"use client";

import { Play, ExternalLink } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useLanguage } from "@/lib/i18n/context";
import { Button } from "./ui/button";

const translations = {
  en: {
    title: "See Our Work in Action",
    subtitle:
      "Watch how we deliver professional HVAC services — straight from our Instagram",
    viewOnInstagram: "View on Instagram",
    followUs: "Follow Us on Instagram",
    featured: "Featured",
  },
  es: {
    title: "Ve Nuestro Trabajo en Acción",
    subtitle:
      "Mira cómo entregamos servicios profesionales de HVAC — directo de nuestro Instagram",
    viewOnInstagram: "Ver en Instagram",
    followUs: "Síguenos en Instagram",
    featured: "Destacado",
  },
};

/**
 * INSTAGRAM REELS CONFIG
 * Add your best Instagram reel URLs here.
 * Format: { url: "https://www.instagram.com/reel/XXXX", thumbnail: "/path/or/url", title_en: "...", title_es: "..." }
 *
 * To get the embed working, each reel URL will open in a new tab on Instagram.
 * For embedded playback, use the Instagram oEmbed API or paste the embed iframe URL.
 */
const instagramReels = [
  {
    url: "https://www.instagram.com/reel/DZTM5QfJf9f/",
    thumbnail: "/images/instagram-video-1.jpg",
    title_en: "Professional AC Installation",
    title_es: "Instalación Profesional de AC",
  },
  {
    url: "https://www.instagram.com/reel/DWZJTcoEfRm/",
    thumbnail: "/images/instagram-video-2.jpg",

    title_en: "Equipment Diagnostics & Repair",
    title_es: "Diagnóstico y Reparación de Equipos",
  },
  {
    url: "https://www.instagram.com/reel/DTqql-NEotj/",
    thumbnail: "/images/instagram-video-4.jpg",
    title_en: "Maintenance & Deep Cleaning",
    title_es: "Mantenimiento y Limpieza Profunda",
  },
  {
    url: "https://www.instagram.com/reel/CyUkYMygXiP/",
    thumbnail: "/images/instagram-video-3.jpg",

    title_en: "Commercial HVAC Solutions",
    title_es: "Soluciones HVAC Comerciales",
  },
];

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
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

        {/* Featured Video — large hero card */}
        <motion.div
          style={{ scale, opacity: sectionOpacity }}
          className="max-w-5xl mx-auto mb-12"
        >
          <a
            href={instagramReels[0].url}
            target="_blank"
            rel="noopener noreferrer"
            className="block relative aspect-video rounded-2xl overflow-hidden shadow-2xl group cursor-pointer"
          >
            <img
              src={instagramReels[0].thumbnail}
              alt={
                language === "en"
                  ? instagramReels[0].title_en
                  : instagramReels[0].title_es
              }
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-colors" />

            {/* Play button */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Play
                className="w-8 h-8 text-blue-600 ml-1"
                fill="currentColor"
              />
            </div>

            {/* Bottom info bar */}
            <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
              <div>
                <span className="inline-flex items-center gap-1.5 bg-pink-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                  <InstagramIcon className="w-3.5 h-3.5" />
                  {t.featured}
                </span>
                <h3 className="text-white text-xl sm:text-2xl font-bold">
                  {language === "en"
                    ? instagramReels[0].title_en
                    : instagramReels[0].title_es}
                </h3>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-white/80 text-sm">
                <ExternalLink className="w-4 h-4" />
                {t.viewOnInstagram}
              </div>
            </div>
          </a>
        </motion.div>

        {/* Reel Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {instagramReels.slice(1).map((reel, index) => (
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

              {/* Instagram badge */}
              <div className="absolute top-3 right-3 w-8 h-8 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 rounded-lg flex items-center justify-center">
                <InstagramIcon className="w-4 h-4 text-white" />
              </div>

              {/* Title */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white font-semibold text-sm">
                  {language === "en" ? reel.title_en : reel.title_es}
                </p>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Follow CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
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
        </motion.div>
      </div>
    </section>
  );
}
