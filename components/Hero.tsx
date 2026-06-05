"use client";

import { Button } from "./ui/button";
import { ArrowRight, Play } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useLanguage } from "@/lib/i18n/context";

const translations = {
  en: {
    title: "Professional HVAC Services",
    subtitle: "Installation, Maintenance & Repair",
    description:
      "Trusted experts in air conditioning solutions for residential and commercial properties in Puerto Rico",
    cta: "Schedule Service",
    learn: "Learn More",
    experience: "5+ Years",
    experienceText: "Experience",
    certified: "Certified",
    certifiedText: "Technicians",
    support: "24/7",
    supportText: "Support",
  },
  es: {
    title: "Servicios Profesionales de HVAC",
    subtitle: "Instalación, Mantenimiento y Reparación",
    description:
      "Expertos confiables en soluciones de aire acondicionado para propiedades residenciales y comerciales en Puerto Rico",
    cta: "Agendar Servicio",
    learn: "Más Información",
    experience: "5+ Años",
    experienceText: "de Experiencia",
    certified: "Técnicos",
    certifiedText: "Certificados",
    support: "24/7",
    supportText: "Soporte",
  },
};

export function Hero() {
  const { language } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const t = translations[language];

  return (
    <div
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Parallax Background */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-700/90 z-10" />
        <img
          src="https://images.unsplash.com/photo-1642749776312-aa42ce20c9f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxIVkFDJTIwdGVjaG5pY2lhbiUyMGluc3RhbGxpbmclMjBhaXIlMjBjb25kaXRpb25lcnxlbnwxfHx8fDE3ODA2OTAyMTB8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt={
            language === "en"
              ? "HVAC technician installing air conditioner"
              : "Técnico HVAC instalando aire acondicionado"
          }
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-20 container mx-auto px-4 py-32 text-center text-white"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 leading-tight">
            {t.title}
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl mb-6 text-blue-100">
            {t.subtitle}
          </p>
          <p className="text-base sm:text-lg md:text-xl mb-8 max-w-2xl mx-auto text-blue-50">
            {t.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              size="lg"
              className="bg-white text-blue-900 hover:bg-blue-50 text-lg px-8 h-12"
            >
              {t.cta}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-white/10 text-lg px-8 h-12"
            >
              <Play className="mr-2 w-5 h-5" />
              {t.learn}
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-3xl mx-auto">
            {[
              { value: t.experience, label: t.experienceText, delay: 0.2 },
              { value: t.certified, label: t.certifiedText, delay: 0.4 },
              { value: t.support, label: t.supportText, delay: 0.6 },
            ].map((stat) => (
              <motion.div
                key={stat.value}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: stat.delay }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
              >
                <div className="text-3xl sm:text-4xl font-bold mb-2">
                  {stat.value}
                </div>
                <div className="text-blue-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2"
        >
          <div className="w-1 h-2 bg-white rounded-full" />
        </motion.div>
      </motion.div>
    </div>
  );
}
