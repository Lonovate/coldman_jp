"use client";

import { AlertCircle, CheckCircle, Calendar } from "lucide-react";
import { Button } from "./ui/button";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useLanguage } from "@/lib/i18n/context";

const translations = {
  en: {
    title: "The Importance of Regular Maintenance",
    subtitle: "Protect your investment and ensure optimal performance",
    benefits: [
      "Extend equipment lifespan by up to 50%",
      "Reduce energy costs by 15-30%",
      "Prevent costly emergency repairs",
      "Improve indoor air quality",
      "Maintain manufacturer warranty",
      "Ensure consistent cooling performance",
    ],
    pricing: "Maintenance Pricing",
    price12k: "12k-18k BTU",
    price24k: "24k BTU",
    price36k: "36k BTU",
    schedule: "Schedule Maintenance",
    warning: "Without Maintenance",
    warningText:
      "AC units can lose 5% efficiency annually without proper care",
  },
  es: {
    title: "La Importancia del Mantenimiento Regular",
    subtitle: "Protege tu inversión y asegura rendimiento óptimo",
    benefits: [
      "Extiende la vida útil del equipo hasta 50%",
      "Reduce costos de energía 15-30%",
      "Previene reparaciones de emergencia costosas",
      "Mejora la calidad del aire interior",
      "Mantiene la garantía del fabricante",
      "Asegura rendimiento consistente de enfriamiento",
    ],
    pricing: "Precios de Mantenimiento",
    price12k: "12k-18k BTU",
    price24k: "24k BTU",
    price36k: "36k BTU",
    schedule: "Agendar Mantenimiento",
    warning: "Sin Mantenimiento",
    warningText:
      "Las unidades de AC pueden perder 5% de eficiencia anualmente sin cuidado apropiado",
  },
};

export function MaintenanceSection() {
  const { language } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  const t = translations[language];

  return (
    <section
      id="about"
      ref={ref}
      className="py-24 bg-white relative overflow-hidden"
    >
      <motion.div
        style={{ x }}
        className="absolute top-1/2 left-0 w-1/2 h-1/2 bg-blue-50 rounded-r-full blur-3xl opacity-50"
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1739203469638-d6f54c24a5da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBIVkFDJTIwc2VydmljZSUyMHRlYW18ZW58MXx8fHwxNzgwNjkwMjEyfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt={
                  language === "en"
                    ? "Professional HVAC service team"
                    : "Equipo profesional de servicio HVAC"
                }
                className="w-full h-[400px] sm:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent" />

              {/* Warning Badge */}
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 bg-white/95 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-bold text-gray-900 mb-1">
                      {t.warning}
                    </div>
                    <div className="text-sm text-gray-600">
                      {t.warningText}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t.title}
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 mb-8">
              {t.subtitle}
            </p>

            <div className="space-y-4 mb-8">
              {t.benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{benefit}</span>
                </motion.div>
              ))}
            </div>

            {/* Pricing Cards */}
            <div className="bg-blue-50 rounded-lg p-6 mb-6">
              <h3 className="font-bold text-xl mb-4 text-gray-900">
                {t.pricing}
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">$75</div>
                  <div className="text-sm text-gray-600">{t.price12k}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">$85</div>
                  <div className="text-sm text-gray-600">{t.price24k}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">$95</div>
                  <div className="text-sm text-gray-600">{t.price36k}</div>
                </div>
              </div>
            </div>

            <Button
              size="lg"
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Calendar className="mr-2 w-5 h-5" />
              {t.schedule}
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
