"use client";

import { Wrench, Settings, Droplets, Zap, Truck, Shield } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useLanguage } from "@/lib/i18n/context";

const translations = {
  en: {
    title: "Our Services",
    subtitle: "Complete HVAC Solutions",
    services: [
      {
        icon: Settings,
        title: "Installation",
        description:
          "Professional installation with up to 15 feet of piping, wiring, drainage, and voltage protector included",
      },
      {
        icon: Wrench,
        title: "Maintenance",
        description:
          "Preventive maintenance starting at $75 for 12k-18k BTU units",
      },
      {
        icon: Shield,
        title: "Diagnostics",
        description:
          "Residential diagnostics for $65 with 50% deposit to reserve",
      },
      {
        icon: Droplets,
        title: "Deep Cleaning",
        description:
          "Thorough deep cleaning to improve efficiency and air quality",
      },
      {
        icon: Truck,
        title: "Relocation",
        description:
          "Safe equipment relocation and reinstallation services",
      },
      {
        icon: Zap,
        title: "Electrical Work",
        description:
          "HVAC-related electrical work, subpanels, and voltage protectors",
      },
    ],
  },
  es: {
    title: "Nuestros Servicios",
    subtitle: "Soluciones Completas de HVAC",
    services: [
      {
        icon: Settings,
        title: "Instalación",
        description:
          "Instalación profesional con hasta 15 pies de tubería, cableado, drenaje y protector de voltaje incluido",
      },
      {
        icon: Wrench,
        title: "Mantenimiento",
        description:
          "Mantenimiento preventivo desde $75 para unidades de 12k-18k BTU",
      },
      {
        icon: Shield,
        title: "Diagnóstico",
        description:
          "Diagnóstico residencial por $65 con depósito del 50% para reservar",
      },
      {
        icon: Droplets,
        title: "Limpieza Profunda",
        description:
          "Limpieza profunda completa para mejorar eficiencia y calidad del aire",
      },
      {
        icon: Truck,
        title: "Relocalización",
        description:
          "Servicios seguros de relocalización y reinstalación de equipos",
      },
      {
        icon: Zap,
        title: "Trabajo Eléctrico",
        description:
          "Trabajos eléctricos relacionados a HVAC, subpaneles y protectores de voltaje",
      },
    ],
  },
};

export function Services() {
  const { language } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["100px", "-100px"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["-50px", "80px"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 15]);

  const t = translations[language];

  return (
    <section
      id="services"
      ref={ref}
      className="py-24 bg-gray-50 relative overflow-hidden"
    >
      <motion.div
        style={{ y }}
        className="absolute top-0 right-0 w-1/3 h-full bg-blue-100/20 rounded-l-full blur-3xl"
      />
      <motion.div
        style={{ y: y2, rotate }}
        className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-blue-200/10 rounded-full blur-3xl"
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t.title}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600">{t.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
              >
                <Card className="h-full hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-900">
                      {service.title}
                    </h3>
                    <p className="text-gray-600">{service.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
