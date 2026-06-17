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
    message: "Message",
    submit: "Send Request",
    success: "Request Sent!",
    successMessage: "We'll contact you soon",
    services: {
      installation: "Installation",
      maintenance: "Maintenance",
      diagnostics: "Diagnostics",
      repair: "Repair",
      cleaning: "Deep Cleaning",
      relocation: "Relocation",
      electrical: "Electrical Work",
      coastal: "Coastal Treatment",
    },
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
    message: "Mensaje",
    submit: "Enviar Solicitud",
    success: "¡Solicitud Enviada!",
    successMessage: "Te contactaremos pronto",
    services: {
      installation: "Instalación",
      maintenance: "Mantenimiento",
      diagnostics: "Diagnóstico",
      repair: "Reparación",
      cleaning: "Limpieza Profunda",
      relocation: "Relocalización",
      electrical: "Trabajo Eléctrico",
      coastal: "Tratamiento Costero",
    },
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
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const t = translations[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      });
    }, 3000);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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
                  <Label htmlFor="firstName">{t.firstName}</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                    required
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">{t.lastName}</Label>
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
                  <Label htmlFor="email">{t.email}</Label>
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
                  <Label htmlFor="phone">{t.phone}</Label>
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

              <div className="mb-6">
                <Label htmlFor="service">{t.service}</Label>
                <Select
                  value={formData.service}
                  onValueChange={(value) => handleChange("service", value)}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder={t.servicePlaceholder} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="installation">
                      {t.services.installation}
                    </SelectItem>
                    <SelectItem value="maintenance">
                      {t.services.maintenance}
                    </SelectItem>
                    <SelectItem value="diagnostics">
                      {t.services.diagnostics}
                    </SelectItem>
                    <SelectItem value="repair">
                      {t.services.repair}
                    </SelectItem>
                    <SelectItem value="cleaning">
                      {t.services.cleaning}
                    </SelectItem>
                    <SelectItem value="relocation">
                      {t.services.relocation}
                    </SelectItem>
                    <SelectItem value="electrical">
                      {t.services.electrical}
                    </SelectItem>
                    <SelectItem value="coastal">
                      {t.services.coastal}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="mb-6">
                <Label htmlFor="message">{t.message}</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  required
                  rows={4}
                  className="mt-2"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Send className="mr-2 w-5 h-5" />
                {t.submit}
              </Button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
