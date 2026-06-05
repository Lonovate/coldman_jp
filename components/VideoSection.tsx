"use client";

import { Play } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { useLanguage } from "@/lib/i18n/context";

const translations = {
  en: {
    title: "See Our Work in Action",
    subtitle: "Watch how we deliver professional HVAC services",
  },
  es: {
    title: "Ve Nuestro Trabajo en Acción",
    subtitle: "Mira cómo entregamos servicios profesionales de HVAC",
  },
};

const thumbnailImages = [
  "https://images.unsplash.com/photo-1771860007875-2ca3ecefd24d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhaXIlMjBjb25kaXRpb25lciUyMHVuaXQlMjBvdXRkb29yfGVufDF8fHx8MTc4MDY5MDIxMXww&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1698479603408-1a66a6d9e80f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobmljaWFuJTIwcmVwYWlyaW5nJTIwYWlyJTIwY29uZGl0aW9uaW5nfGVufDF8fHx8MTc4MDY5MDIxMXww&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1436473849883-bb3464c23e93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRvb3IlMjBhaXIlMjBjb25kaXRpb25pbmclMjB1bml0JTIwd2FsbHxlbnwxfHx8fDE3ODA2OTAyMTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
];

export function VideoSection() {
  const { language } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  const [isPlaying, setIsPlaying] = useState(false);

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
          <p className="text-lg sm:text-xl text-gray-600">{t.subtitle}</p>
        </motion.div>

        <motion.div
          style={{ scale, opacity: sectionOpacity }}
          className="max-w-5xl mx-auto"
        >
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl group cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1726614846573-c1ac2e6161d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaXIlMjBjb25kaXRpb25pbmclMjBtYWludGVuYW5jZSUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3ODA2OTAyMTF8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt={
                language === "en"
                  ? "Air conditioning maintenance professional"
                  : "Profesional de mantenimiento de aire acondicionado"
              }
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-blue-900/40 group-hover:bg-blue-900/50 transition-colors" />

            {!isPlaying && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsPlaying(true)}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-shadow cursor-pointer"
              >
                <Play
                  className="w-8 h-8 text-blue-600 ml-1"
                  fill="currentColor"
                />
              </motion.button>
            )}

            {isPlaying && (
              <div className="absolute inset-0 bg-black flex items-center justify-center">
                <p className="text-white text-lg">
                  {language === "en"
                    ? "Video player would go here"
                    : "El reproductor de video iría aquí"}
                </p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Additional Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-12 max-w-5xl mx-auto">
          {thumbnailImages.map((src, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="relative aspect-video rounded-lg overflow-hidden shadow-lg cursor-pointer group"
            >
              <img
                src={src}
                alt={`${language === "en" ? "HVAC work" : "Trabajo HVAC"} ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-blue-900/30 group-hover:bg-blue-900/40 transition-colors" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                <Play
                  className="w-5 h-5 text-blue-600 ml-0.5"
                  fill="currentColor"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
