<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project: Coldman JP - Landing Page

## About the Business
Coldman JP is an air conditioning services company that provides:
- AC installation (residential, commercial, enterprise)
- AC repair and maintenance
- Full HVAC servicing for houses, businesses, and enterprise clients

## Tech Stack
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **React:** v19
- **Package Manager:** npm

## Design & UX Principles

### Responsiveness
- Mobile-first approach
- Must look great on: mobile phones, tablets, laptops, desktops, and large screens
- Use Tailwind breakpoints: `sm`, `md`, `lg`, `xl`, `2xl`

### User Experience
- Users don't always read the full page — design for scanners and scrollers
- Use parallax effects and scroll-based animations to capture attention
- Include engaging media (images, videos) — all must be royalty-free / copyright-free
- Keep the interface intuitive — clear CTAs, simple navigation

### Internationalization (i18n)
- **Default language:** Spanish (es)
- **Secondary language:** English (en)
- Language toggle button visible in the navigation bar
- All user-facing text must support both languages

### Chatbot
- An AI chatbot agent must be present and accessible across all pages
- It should help visitors with questions about services, pricing, scheduling, etc.

### Navigation & Footer
- Navigation bar must include:
  - Logo / brand name
  - Language toggle (ES/EN)
  - Links to all social media profiles
  - Main navigation links
- Footer must include:
  - Social media links
  - Contact information
  - Business hours
  - Quick links

### Visual Effects
- Parallax scrolling sections
- Smooth scroll animations
- Engaging hero section with video or animated background
- Professional, clean aesthetic fitting an HVAC services company

## Code Conventions
- Use functional components with hooks
- Prefer Server Components where possible; use `"use client"` only when needed
- Keep components modular and reusable
- All text content must go through the i18n system — no hardcoded strings
- Use semantic HTML for accessibility
- Images must have alt text in both languages
