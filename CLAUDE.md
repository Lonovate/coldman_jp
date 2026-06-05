@AGENTS.md

# Coldman JP - AI Assistant Instructions

## Project Overview
This is a landing page for **Coldman JP**, an air conditioning services company. The site must be visually striking, fully responsive, and bilingual (Spanish default, English toggle).

## Key Requirements Summary
1. **Bilingual:** Spanish (default) + English via toggle button
2. **Fully Responsive:** Mobile, tablet, laptop, desktop, large screens
3. **Engaging UX:** Parallax effects, animations, royalty-free images/videos
4. **Chatbot:** AI agent accessible on every page
5. **Social Media:** Present in both navbar and footer
6. **Services:** AC installation, repair, maintenance for residential/commercial/enterprise

## Architecture Decisions
- Next.js 16 App Router with TypeScript
- Tailwind CSS v4 for styling
- Mobile-first responsive design
- Server Components by default, Client Components only when interactivity is needed
- i18n approach: context-based language provider with JSON translation files

## File Structure (Target)
```
app/
  layout.tsx              # Root layout with navbar, footer, chatbot
  page.tsx                # Home / landing page
  globals.css             # Global styles + Tailwind
components/
  navbar/                 # Navigation bar with language toggle + social links
  footer/                 # Footer with social links + contact info
  hero/                   # Hero section with parallax / video background
  services/               # Services showcase section
  about/                  # About the company section
  testimonials/           # Client testimonials
  contact/                # Contact form / CTA section
  chatbot/                # AI chatbot widget
  ui/                     # Shared UI primitives (buttons, cards, etc.)
lib/
  i18n/                   # Internationalization utilities
    translations/
      es.json             # Spanish translations
      en.json             # English translations
    context.tsx           # Language context provider
public/
  images/                 # Royalty-free images
  videos/                 # Royalty-free videos
```

## When Writing Code
- Always check `node_modules/next/dist/docs/` for Next.js 16 API guidance
- Never hardcode user-facing strings — use the i18n system
- Ensure all components are responsive across all breakpoints
- Use semantic HTML and proper accessibility attributes
- Keep components focused and modular
- Use royalty-free assets only (Unsplash, Pexels, Pixabay, or similar)
