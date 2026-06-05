"use client";

import { LanguageProvider } from "@/lib/i18n/context";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { VideoSection } from "@/components/VideoSection";
import { TrustSection } from "@/components/TrustSection";
import { MaintenanceSection } from "@/components/MaintenanceSection";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { Chatbot } from "@/components/Chatbot";
import { SocialMedia } from "@/components/SocialMedia";

export default function Home() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-white">
        <Header />
        <SocialMedia />
        <main>
          <Hero />
          <Services />
          <VideoSection />
          <TrustSection />
          <MaintenanceSection />
          <ContactForm />
        </main>
        <Footer />
        <Chatbot />
      </div>
    </LanguageProvider>
  );
}
