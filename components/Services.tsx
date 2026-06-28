"use client";

import {
  Wrench,
  Settings,
  Droplets,
  Zap,
  ShieldCheck,
  Shield,
  Snowflake,
  X,
} from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { useRef, useState, useEffect, useCallback } from "react";
import { useLanguage } from "@/lib/i18n/context";

export type ServiceData = {
  icon: typeof Settings;
  title: string;
  description: string;
  bulletPoints: string[];
  image: string;
};

export const serviceTranslations: Record<
  "en" | "es",
  { title: string; subtitle: string; services: ServiceData[] }
> = {
  en: {
    title: "Our Services",
    subtitle: "Complete HVAC Solutions",
    services: [
      {
        icon: Settings,
        title: "Installation",
        description:
          "Professional installation with up to 15 feet of piping, wiring, drainage, and voltage protector included",
        image: "/services/instalacion.jpeg",
        bulletPoints: [
          "Mini Split",
          "Multi Split",
          "Central Air",
          "Floor Ceiling",
          "VRF",
          "Fan Coil",
          "Air Handlers",
          "Commercial Systems",
          "Equipment Replacement",
          "Equipment Relocation",
          "Condensing Units",
          "Voltage Protectors",
        ],
      },
      {
        icon: ShieldCheck,
        title: "Anti-Corrosion Treatment",
        description:
          "Specialized protection against corrosion caused by salt and humidity",
        image: "/services/corrocion.jpeg",
        bulletPoints: [
          "Specialized protection against salt and humidity corrosion",
          "Anti-corrosion coating on exposed components",
          "Extended condenser and metal component lifespan",
          "Reduces premature wear from coastal environments",
          "Ideal for homes, businesses, and seaside properties",
          "Uniform application without affecting equipment operation",
          "Recommended as preventive protection for new and existing units",
        ],
      },
      {
        icon: Shield,
        title: "Diagnostics & Repair",
        description:
          "Residential diagnostics for $65 with 50% deposit to reserve",
        image: "/services/diasnostico.jpeg",
        bulletPoints: [
          "Mini Split",
          "Multi Split",
          "Central Air",
          "Floor Ceiling",
          "VRF",
          "Fan Coil",
          "Air Handlers",
          "Commercial Systems",
          "Compressors",
          "Fan Motors",
          "Electronic Boards",
          "Sensors",
          "Controls",
          "Leak Detection",
        ],
      },
      {
        icon: Droplets,
        title: "Deep Cleaning",
        description:
          "Thorough deep cleaning to improve efficiency and air quality",
        image: "/services/mantenimiento.jpeg",
        bulletPoints: [
          "Mini Split",
          "Multi Split",
          "Central Air",
          "Floor Ceiling",
          "VRF",
          "Fan Coil",
          "Air Handlers",
          "Commercial Systems",
        ],
      },
      {
        icon: Snowflake,
        title: "Commercial Refrigeration",
        description:
          "Complete commercial refrigeration services for businesses",
        image: "/services/comercial.jpeg",
        bulletPoints: [
          "Commercial Fridges",
          "Bottle Coolers",
          "Coolers",
          "Walk-In Coolers",
          "Cold Rooms",
          "Preventive Maintenance",
          "Diagnostics & Repair",
          "Equipment Installation",
        ],
      },
      {
        icon: Zap,
        title: "HVAC Electrical Work",
        description:
          "HVAC-related electrical work, subpanels, and voltage protectors",
        image: "/services/electronico.jpeg",
        bulletPoints: [
          "120V Power Supply",
          "220V Power Supply",
          "Subpanels",
          "Breakers",
          "Voltage Protectors",
          "Conduit Installation",
          "Dedicated Circuits",
          "HVAC Wiring",
          "Electrical Diagnostics",
          "Fault Correction",
        ],
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
        image: "/services/instalacion.jpeg",
        bulletPoints: [
          "Mini Split",
          "Multi Split",
          "Aire Central",
          "Piso Techo",
          "VRF",
          "Fan Coil",
          "Manejadoras de Aire",
          "Sistemas Comerciales",
          "Reemplazo de Equipos",
          "Relocalización de Equipos",
          "Condensado",
          "Protectores de Voltaje",
        ],
      },
      {
        icon: ShieldCheck,
        title: "Tratamiento Anticorrosivo",
        description:
          "Protección especializada contra la corrosión causada por salitre y humedad",
        image: "/services/corrocion.jpeg",
        bulletPoints: [
          "Protección especializada contra la corrosión causada por salitre y humedad",
          "Aplicación de recubrimiento anticorrosivo en componentes expuestos",
          "Mayor vida útil del condensador y sus componentes metálicos",
          "Ayuda a reducir el desgaste prematuro por ambientes costeros",
          "Ideal para residencias, comercios y propiedades cercanas al mar",
          "Aplicación uniforme sin afectar el funcionamiento del equipo",
          "Recomendado como protección preventiva en equipos nuevos y existentes",
        ],
      },
      {
        icon: Shield,
        title: "Diagnóstico y Reparación",
        description:
          "Diagnóstico residencial por $65 con depósito del 50% para reservar",
        image: "/services/diasnostico.jpeg",
        bulletPoints: [
          "Mini Split",
          "Multi Split",
          "Aire Central",
          "Piso Techo",
          "VRF",
          "Fan Coil",
          "Manejadoras de Aire",
          "Sistemas Comerciales",
          "Compresores",
          "Fan Motors",
          "Tarjetas Electrónicas",
          "Sensores",
          "Controles",
          "Detección de Fugas",
        ],
      },
      {
        icon: Droplets,
        title: "Limpieza Profunda",
        description:
          "Limpieza profunda completa para mejorar eficiencia y calidad del aire",
        image: "/services/mantenimiento.jpeg",
        bulletPoints: [
          "Mini Split",
          "Multi Split",
          "Aire Central",
          "Piso Techo",
          "VRF",
          "Fan Coil",
          "Manejadoras de Aire",
          "Sistemas Comerciales",
        ],
      },
      {
        icon: Snowflake,
        title: "Refrigeración Comercial",
        description:
          "Servicios completos de refrigeración comercial para negocios",
        image: "/services/comercial.jpeg",
        bulletPoints: [
          "Neveras Comerciales",
          "Botelleros",
          "Coolers",
          "Walk-In Coolers",
          "Cámaras Frías",
          "Mantenimiento Preventivo",
          "Diagnóstico y Reparación",
          "Instalación de Equipos",
        ],
      },
      {
        icon: Zap,
        title: "Trabajo Eléctrico HVAC",
        description:
          "Trabajos eléctricos relacionados a HVAC, subpaneles y protectores de voltaje",
        image: "/services/electronico.jpeg",
        bulletPoints: [
          "Alimentaciones 120V",
          "Alimentaciones 220V",
          "Subpaneles",
          "Breakers",
          "Protectores de Voltaje",
          "Canalización",
          "Circuitos Dedicados",
          "Cableado HVAC",
          "Diagnóstico Eléctrico",
          "Corrección de Fallas",
        ],
      },
    ],
  },
};

export function ServiceModal({
  service,
  onClose,
}: {
  service: ServiceData;
  onClose: () => void;
}) {
  const Icon = service.icon;

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
      >
        {/* Header image with overlay */}
        <div className="relative h-40 sm:h-48 overflow-hidden flex-shrink-0">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/70 via-blue-800/50 to-blue-900/80" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-9 h-9 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          {/* Title on image */}
          <div className="absolute bottom-0 left-0 right-0 p-5 flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                {service.title}
              </h3>
              <p className="text-blue-100 text-sm">{service.description}</p>
            </div>
          </div>
        </div>

        {/* Bullet points */}
        <div className="p-5 sm:p-6 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {service.bulletPoints.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
                className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-blue-50 transition-colors group"
              >
                <div className="w-2 h-2 rounded-full bg-blue-500 group-hover:scale-125 transition-transform flex-shrink-0" />
                <span className="text-gray-700 text-sm font-medium">
                  {item}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Services() {
  const { language } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const [selectedService, setSelectedService] = useState<ServiceData | null>(
    null
  );
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["100px", "-100px"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["-50px", "80px"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 15]);

  const t = serviceTranslations[language];

  const handleClose = useCallback(() => setSelectedService(null), []);

  return (
    <>
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
                  onClick={() => setSelectedService(service)}
                  className="cursor-pointer"
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

      <AnimatePresence>
        {selectedService && (
          <ServiceModal service={selectedService} onClose={handleClose} />
        )}
      </AnimatePresence>
    </>
  );
}
