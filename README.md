# Wayne Passion Reggae Kitchen

A premium e-commerce website for **Wayne Passion Reggae Kitchen** — authentic Caribbean jerk sauces crafted by the Reid family with Caribbean soul and authentic jerk tradition.

## 🌴 Overview

This is a modern React + Tailwind CSS website featuring:

- **Hero Section** with product showcase
- **All 7 Signature Flavors** with detailed descriptions
- **Reid Family Legacy** story and brand values
- **Flavor Sommelier** placeholder for future AI recipe recommendations
- **Premium Caribbean Design** with Rasta tri-color branding (red, gold, green)
- **Mobile Responsive** layout
- **Contact & Social Media** integration

## 🎨 Design Philosophy

**Reggae Soul Maximalism** — A bold fusion of Caribbean energy, Rastafarian symbolism, and premium global branding that celebrates vibrant color, cultural authenticity, and unapologetic boldness.

### Color Palette

- **Rasta Red**: `#DC143C` — Passion and heat
- **Rasta Gold**: `#FFD700` — Caribbean warmth and light
- **Rasta Green**: `#228B22` — Island life and natural ingredients
- **Black**: `#1A1A1A` — Luxury backdrop and sophistication
- **White**: `#F5F5F5` — Clarity and premium feel

### Typography

- **Display Font**: Playfair Display (bold, commanding, luxury)
- **Body Font**: Poppins (modern, readable, warm)

## 🚀 Tech Stack

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS 4
- **Build Tool**: Vite
- **UI Components**: shadcn/ui + Radix UI
- **Routing**: Wouter
- **Icons**: Lucide React

## 📦 Project Structure

```
reggae_kitchen/
├── client/
│   ├── public/           # Static assets (favicon, robots.txt)
│   ├── src/
│   │   ├── pages/        # Page components
│   │   ├── components/   # Reusable UI components
│   │   ├── contexts/     # React contexts
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # Utility helpers
│   │   ├── App.tsx       # Main app component with routing
│   │   ├── main.tsx      # React entry point
│   │   └── index.css     # Global styles and design tokens
│   └── index.html        # HTML template
├── server/               # Express server (placeholder)
├── package.json          # Dependencies and scripts
├── vite.config.ts        # Vite configuration
├── tailwind.config.ts    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── README.md             # This file
```

## 🛠️ Development

### Prerequisites

- Node.js 22+
- pnpm 10+

### Installation

```bash
pnpm install
```

### Development Server

```bash
pnpm dev
```

The dev server will start at `http://localhost:3000`

### Build for Production

```bash
pnpm build
```

Output is generated in the `dist/` directory:
- `dist/public/` — Static frontend files for Cloudflare Pages
- `dist/index.js` — Server bundle (if needed)

### Preview Production Build

```bash
pnpm preview
```

## 🚢 Deployment

### Cloudflare Pages

This project is configured for automatic deployment to Cloudflare Pages via GitHub Actions.

**Setup Instructions:**

1. Connect your GitHub repository to Cloudflare Pages
2. Set the following build settings:
   - **Build command**: `pnpm install && pnpm build`
   - **Build output directory**: `dist/public`
   - **Node.js version**: 22

3. Add the following secrets to your GitHub repository:
   - `CLOUDFLARE_API_TOKEN` — Your Cloudflare API token
   - `CLOUDFLARE_ACCOUNT_ID` — Your Cloudflare account ID

4. Push to `main` branch to trigger automatic deployment

**GitHub Actions Workflow:**

The `.github/workflows/deploy.yml` file automates the deployment process:
- Installs dependencies
- Builds the project
- Deploys to Cloudflare Pages

### Manus Hosting

The site is also deployed on Manus at: https://wayneshop-5hyisayn.manus.space

## 📝 The Seven Flavors

1. **Original Jerk Seasoning Sauce** — The classic blend with allspice, Scotch Bonnet, and thyme
2. **Tamarind Jerk Seasoning Sauce** — Tangy complexity with tamarind, allspice, and ginger
3. **Curry Jerk Sauce** — Golden turmeric meets Caribbean fire
4. **Hot Jerk Sauce (XX Spicy)** — Double-heat for the fearless with habanero and ghost pepper
5. **Rosemary Jerk Sauce** — Herbaceous refinement with rosemary, thyme, and allspice
6. **Original Jerk (Pepper-Free)** — All flavor, no heat
7. **Mango Jerk Seasoning Sauce** — Tropical sweetness meets Caribbean fire

## 🎯 Future Features

- **Flavor Sommelier AI** — AI-powered recipe recommendations matching dishes to flavors
- **E-Commerce Integration** — Direct sales with Stripe payment processing
- **Recipe Gallery** — Showcase jerk recipes featuring each sauce
- **Newsletter Signup** — Email capture for marketing campaigns
- **Customer Reviews** — Build trust with testimonials and ratings
- **Blog Section** — Share cooking tips and Reid family stories

## 📧 Contact

- **Email**: hello@reggaekitchen.com
- **Phone**: +1 (555) REGGAE-KITCHEN
- **Location**: Caribbean, Earth 🌍

## 📄 License

MIT License — See LICENSE file for details

## 🙏 Credits

Built with Caribbean soul and authentic jerk tradition for the Reid family legacy.

---

**Wayne Passion Reggae Kitchen** — Premium Caribbean Jerk Sauces 🌴🔥
