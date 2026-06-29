"use client";

import { Phone, Mail, MapPin } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { useRef, useState, useCallback } from "react";
import { useLanguage } from "@/lib/i18n/context";
import {
  serviceTranslations,
  ServiceModal,
  type ServiceData,
} from "./Services";

const translations = {
  en: {
    tagline: "Professional HVAC Solutions",
    services: "Services",
    installation: "Installation",
    maintenance: "Maintenance",
    diagnostics: "Diagnostics",
    repair: "Repair",
    contact: "Contact",
    location: "Puerto Rico",
    hours: "Business Hours",
    hoursText: "Monday - Saturday: 8AM - 6PM",
    hoursText2: "Sunday: Emergency Only",
    rights: "All rights reserved.",
    builtBy: "Built by",
    brands: "We work with",
  },
  es: {
    tagline: "Soluciones Profesionales de HVAC",
    services: "Servicios",
    installation: "Instalación",
    maintenance: "Mantenimiento",
    diagnostics: "Diagnóstico",
    repair: "Reparación",
    contact: "Contacto",
    location: "Puerto Rico",
    hours: "Horario",
    hoursText: "Lunes - Sábado: 8AM - 6PM",
    hoursText2: "Domingo: Solo Emergencias",
    rights: "Todos los derechos reservados.",
    builtBy: "Desarrollado por",
    brands: "Trabajamos con",
  },
};

const brands = ["Gree", "Carrier", "CIAC", "LG", "Tosot", "Mitsubishi"];

export function Footer() {
  const { language } = useLanguage();
  const t = translations[language];
  const ref = useRef<HTMLElement>(null);
  const [selectedService, setSelectedService] = useState<ServiceData | null>(null);
  const handleCloseModal = useCallback(() => setSelectedService(null), []);
  const allServices = serviceTranslations[language].services;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["50px", "0px"]);

  return (<>
    <footer ref={ref} className="bg-gray-900 text-white pt-16 pb-8 relative overflow-hidden">
      {/* Parallax accent */}
      <motion.div
        style={{ y: bgY }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"
      />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="mb-4">
              <img
                src="/logo.png"
                alt="Coldman JP"
                className="h-12 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-gray-400 mb-4">{t.tagline}</p>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/profile.php?id=100090963060487"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/coldmanjp"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a
                href="https://wa.me/17873889689"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-500 transition-colors"
                aria-label="WhatsApp"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="font-bold text-lg mb-4">{t.services}</h3>
            <ul className="space-y-2 text-gray-400">
              {allServices.map((service, index) => (
                <li key={index}>
                  <button
                    onClick={() => setSelectedService(service)}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {service.title}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="font-bold text-lg mb-4">{t.contact}</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <a
                  href="tel:+17875256934"
                  className="hover:text-white transition-colors"
                >
                  (787) 525-6934
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a
                  href="mailto:coldmanjp.llc@gmail.com"
                  className="hover:text-white transition-colors"
                >
                  coldmanjp.llc@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{t.location}</span>
              </li>
            </ul>
          </motion.div>

          {/* Hours & Brands */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="font-bold text-lg mb-4">{t.hours}</h3>
            <p className="text-gray-400 mb-2">{t.hoursText}</p>
            <p className="text-gray-400 mb-6">{t.hoursText2}</p>

            <h4 className="font-bold text-sm mb-2">{t.brands}</h4>
            <div className="flex flex-wrap gap-2">
              {brands.map((brand, index) => (
                <span
                  key={index}
                  className="text-xs bg-gray-800 px-2 py-1 rounded text-gray-400"
                >
                  {brand}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
          <p>
            &copy; {new Date().getFullYear()} Coldman JP. {t.rights}
          </p>
          <p className="mt-2">
            {t.builtBy}{" "}
            <a
              href="https://lonovate.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold hover:text-white transition-colors"
            >
              Lonovate
            </a>
          </p>
        </div>
      </div>
    </footer>

      <AnimatePresence>
        {selectedService && (
          <ServiceModal service={selectedService} onClose={handleCloseModal} />
        )}
      </AnimatePresence>
    </>
  );
}
