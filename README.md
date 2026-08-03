# Bodhini NextGen Foundation (BNF) Web Platform

A modern, high-performance web platform built for **Bodhini NextGen Foundation (BNF)** — an educational foundation dedicated to building self-aware, skilled, and future-ready students across India through scientifically backed psychometric assessments, guided reflection journaling, and career mentorship.

---

## 🌟 Features & Page Overview

The platform consists of **14 fully responsive, animated, and pre-rendered pages**:

1. **Home Page (`/`)**: High-impact hero section, core mission pillars, interactive SDG alignment cards, statistics counter, and animated CTA triggers.
2. **About Us (`/about`)**: Comprehensive mission statement, 4-step framework, SDG integration, and **Team BNF Showcase** (Core Team, Advisory Board, Interns, and Volunteers).
3. **Programs (`/programs`)**: School vs. College interactive filter tabs, 3D feature cards, NEP 2020 alignment strip, and Enquiry modal dialog.
4. **Guided Journaling System (`/journaling`)**: Editorial storytelling layout, 4-step winding timeline, authentic ruled notebook preview with animated page-flip tabs, and impact metrics.
5. **Impact Report (`/impact`)**: Full-bleed background hero with parallax zoom, dark gradient invert overlays, 5-chip stat strip, giant editorial numbers, and student testimonial quote switcher.
6. **Partner With Us (`/partner`)**: Full-bleed hero image with MoU signing ceremony visual, 6 interactive partnership categories (Schools, Startups, NGOs, Corporate CSR, Government, Mentors), formal MoU benefits, infinite logo marquee strip, and MoU enquiry form.
7. **Careers at BNF (`/career`)**: Full-bleed background hero, interactive 4-pillar culture spotlight, open roles listing with expandable accordion details, and a responsive application form modal dialog.
8. **Volunteer Movement (`/volunteer`)**: Full-bleed background hero, 3 why-volunteer editorial pillars, **24+ comprehensive categorized volunteer opportunities matrix**, and multi-select volunteer sign-up form.
9. **Contact Us (`/contact`)**: Contact hero with quick info chips, glassmorphism contact form, embedded interactive OpenStreetMap (Indore location), social media showcase strip, and interactive FAQ accordion.
10. **Authentication Flow (`/login` & `/register`)**: Role-based access switches (*Student Account* vs *Partner Account*) for profile management and growth tracking.
11. **Password Recovery (`/forgot-password`)**: Role selection toggle, 3-step OTP PIN verification simulation, and instant reset link confirmation.
12. **Student & Partner Profile Dashboard (`/profile`)**: Interactive user portal displaying baseline psychometric scores, journaling streak, and enrolled programs.
13. **Custom 404 Error Page (`app/not-found.js`)**: Gradient 404 text, letter-by-letter text reveals, quick navigation buttons to Home/Programs/Support, and popular quick links strip.

---

## 🛠️ Technology Stack

- **Framework**: Next.js (App Router, Turbopack)
- **UI Library**: React 19
- **Styling**: Tailwind CSS, Vanilla CSS Design System
- **Animations**: Framer Motion (GPU-accelerated transforms, parallax, text reveals)
- **Icons**: React Icons (FontAwesome 6)
- **Maps**: OpenStreetMap (Indore Headquarters Location Embed)

---

## 🎨 Color Palette Design System

- **Deep Teal**: `#0D4F4F` (Primary Brand & Structure)
- **Saffron / Coral Accent**: `#FF9933` / `#E8705A` (CTA Buttons & Badges)
- **Growth Green**: `#138808` (Impact & Volunteer Accents)
- **Sky Blue**: `#5BB8D4` (Secondary Accents & Orbs)
- **Midnight**: `#0F1F1F` (Dark Sections & Typography)
- **Off-White**: `#FAFAF7` (Editorial Backgrounds)

---

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js 18+** installed on your system.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/guptasahil3284-source/bnf.git
   cd bnf
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open in Browser**:
   Navigate to [http://localhost:3000](http://localhost:3000) to view the website.

---

## 📦 Production Build & Deployment

To generate an optimized production build:

```bash
npm run build
```

To start the production server locally:

```bash
npm run start
```

---

## 📄 License

This repository is maintained for **Bodhini NextGen Foundation (BNF)**. All rights reserved.
