"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { motion, useScroll, useTransform } from "motion/react";
import { Send, CheckCircle } from "lucide-react";
import { useRef } from "react";
import { useLanguage } from "@/lib/i18n/context";

const serviceOptions: Record<
  "en" | "es",
  { key: string; label: string; subServices: string[] }[]
> = {
  en: [
    {
      key: "installation",
      label: "Installation",
      subServices: [
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
      key: "anticorrosion",
      label: "Anti-Corrosion Treatment",
      subServices: [
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
      key: "diagnostics",
      label: "Diagnostics & Repair",
      subServices: [
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
      key: "cleaning",
      label: "Deep Cleaning",
      subServices: [
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
      key: "refrigeration",
      label: "Commercial Refrigeration",
      subServices: [
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
      key: "electrical",
      label: "HVAC Electrical Work",
      subServices: [
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
  es: [
    {
      key: "installation",
      label: "Instalación",
      subServices: [
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
      key: "anticorrosion",
      label: "Tratamiento Anticorrosivo",
      subServices: [
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
      key: "diagnostics",
      label: "Diagnóstico y Reparación",
      subServices: [
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
      key: "cleaning",
      label: "Limpieza Profunda",
      subServices: [
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
      key: "refrigeration",
      label: "Refrigeración Comercial",
      subServices: [
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
      key: "electrical",
      label: "Trabajo Eléctrico HVAC",
      subServices: [
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
};

const translations = {
  en: {
    title: "Request a Service",
    subtitle: "Fill out the form and we'll contact you shortly",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    phone: "Phone",
    service: "Service Interested In",
    servicePlaceholder: "Select a service",
    subService: "Specific Service",
    subServicePlaceholder: "Select specific service",
    message: "Message (Optional)",
    messagePlaceholder:
      "Additional details, number of units, preferred schedule, etc.",
    submit: "Send Request",
    success: "Request Sent!",
    successMessage: "We'll contact you soon",
  },
  es: {
    title: "Solicitar un Servicio",
    subtitle: "Completa el formulario y te contactaremos pronto",
    firstName: "Nombre",
    lastName: "Apellido",
    email: "Correo Electrónico",
    phone: "Teléfono",
    service: "Servicio de Interés",
    servicePlaceholder: "Selecciona un servicio",
    subService: "Servicio Específico",
    subServicePlaceholder: "Selecciona el servicio específico",
    message: "Mensaje (Opcional)",
    messagePlaceholder:
      "Más información, cantidad de unidades, horario preferido, etc.",
    submit: "Enviar Solicitud",
    success: "¡Solicitud Enviada!",
    successMessage: "Te contactaremos pronto",
  },
};

export function ContactForm() {
  const { language } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgX = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const bgX2 = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: "",
    subService: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const t = translations[language];
  const services = serviceOptions[language];
  const selectedService = services.find((s) => s.key === formData.service);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // Resolve the service label for the email
    const serviceLabel = selectedService?.label ?? formData.service;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          service: serviceLabel,
        }),
      });

      if (!res.ok) throw new Error("Failed");

      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          service: "",
          subService: "",
          message: "",
        });
      }, 4000);
    } catch {
      setError(
        language === "en"
          ? "Something went wrong. Please try again or call us at (787) 525-6934."
          : "Algo salió mal. Intenta nuevamente o llámanos al (787) 525-6934."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    if (field === "service") {
      setFormData((prev) => ({ ...prev, service: value, subService: "" }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden"
    >
      {/* Parallax decorative orbs */}
      <motion.div
        style={{ x: bgX }}
        className="absolute top-10 right-0 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl"
      />
      <motion.div
        style={{ x: bgX2 }}
        className="absolute bottom-10 left-0 w-64 h-64 bg-blue-100/40 rounded-full blur-3xl"
      />
      <div className="container mx-auto px-4 relative z-10">
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          {isSubmitted ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-2xl shadow-xl p-12 text-center"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">
                {t.success}
              </h3>
              <p className="text-gray-600 text-lg">{t.successMessage}</p>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl shadow-xl p-6 sm:p-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <Label htmlFor="firstName">{t.firstName} *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                    required
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">{t.lastName} *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleChange("lastName", e.target.value)}
                    required
                    className="mt-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <Label htmlFor="email">{t.email} *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    required
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">{t.phone} *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    required
                    className="mt-2"
                  />
                </div>
              </div>

              {/* Service dropdown */}
              <div className="mb-6">
                <Label htmlFor="service">{t.service} *</Label>
                <Select
                  value={formData.service}
                  onValueChange={(value) => handleChange("service", value)}
                  required
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder={t.servicePlaceholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((s) => (
                      <SelectItem key={s.key} value={s.key}>
                        {s.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Sub-service dropdown — only visible after selecting a service */}
              {selectedService && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mb-6"
                >
                  <Label htmlFor="subService">{t.subService} *</Label>
                  <Select
                    value={formData.subService}
                    onValueChange={(value) => handleChange("subService", value)}
                    required
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder={t.subServicePlaceholder} />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedService.subServices.map((sub) => (
                        <SelectItem key={sub} value={sub}>
                          {sub}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </motion.div>
              )}

              <div className="mb-6">
                <Label htmlFor="message">{t.message}</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  rows={4}
                  placeholder={t.messagePlaceholder}
                  className="mt-2"
                />
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                size="lg"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                disabled={
                  !formData.service || !formData.subService || isSubmitting
                }
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {language === "en" ? "Sending..." : "Enviando..."}
                  </span>
                ) : (
                  <>
                    <Send className="mr-2 w-5 h-5" />
                    {t.submit}
                  </>
                )}
              </Button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
