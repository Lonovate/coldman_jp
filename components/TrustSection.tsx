"use client";

import { Shield, Award, Users, Clock } from "lucide-react";
import { motion } from "motion/react";
import { useLanguage } from "@/lib/i18n/context";

const translations = {
  en: {
    title: "Why Choose Coldman JP",
    subtitle: "Your trusted HVAC partner in Puerto Rico",
    features: [
      {
        icon: Shield,
        title: "Public Liability Insurance",
        description: "Fully insured for your peace of mind",
      },
      {
        icon: Award,
        title: "Certified Brands",
        description: "Work with Gree, Carrier, CIAC, LG, Tosot & Mitsubishi",
      },
      {
        icon: Users,
        title: "5+ Years Experience",
        description: "Trusted by residential and commercial clients",
      },
      {
        icon: Clock,
        title: "Flexible Payment",
        description:
          "Accept ATH Móvil, credit/debit cards, Stripe, checks & cash",
      },
    ],
    coastal: "Coastal Properties",
    coastalText: "Anti-corrosive treatment available for coastal properties",
    coastalPrice: "From $250",
    guarantee: "Quality Guarantee",
    guaranteeText: "Professional installation with comprehensive testing",
    guaranteeDetail:
      "Includes pressure testing, deep vacuum & commissioning",
  },
  es: {
    title: "Por Qué Elegir Coldman JP",
    subtitle: "Tu socio confiable de HVAC en Puerto Rico",
    features: [
      {
        icon: Shield,
        title: "Seguro de Responsabilidad",
        description: "Totalmente asegurados para tu tranquilidad",
      },
      {
        icon: Award,
        title: "Marcas Certificadas",
        description:
          "Trabajamos con Gree, Carrier, CIAC, LG, Tosot y Mitsubishi",
      },
      {
        icon: Users,
        title: "5+ Años de Experiencia",
        description: "Confianza de clientes residenciales y comerciales",
      },
      {
        icon: Clock,
        title: "Pago Flexible",
        description:
          "Aceptamos ATH Móvil, tarjetas, Stripe, cheques y efectivo",
      },
    ],
    coastal: "Propiedades Costeras",
    coastalText:
      "Tratamiento anticorrosivo disponible para propiedades costeras",
    coastalPrice: "Desde $250",
    guarantee: "Garantía de Calidad",
    guaranteeText: "Instalación profesional con pruebas comprensivas",
    guaranteeDetail:
      "Incluye pruebas de presión, vacío profundo y puesta en marcha",
  },
};

export function TrustSection() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section className="py-24 bg-gradient-to-br from-blue-900 to-blue-700 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            {t.title}
          </h2>
          <p className="text-lg sm:text-xl text-blue-100">{t.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {t.features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-blue-100">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-sm rounded-lg p-8 text-center"
          >
            <div className="text-2xl sm:text-3xl font-bold mb-2">
              {t.coastal}
            </div>
            <p className="text-blue-100">{t.coastalText}</p>
            <div className="mt-4 text-2xl font-bold">{t.coastalPrice}</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-sm rounded-lg p-8 text-center"
          >
            <div className="text-2xl sm:text-3xl font-bold mb-2">
              {t.guarantee}
            </div>
            <p className="text-blue-100">{t.guaranteeText}</p>
            <div className="mt-4 text-sm text-blue-100">
              {t.guaranteeDetail}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
