# BetKit Web Application

A Nuxt 4 application for the BetKit Platform - the modern operating system for racetrack betting agencies.

## 🏗️ Architecture

Built with:
- **Nuxt 4** - SSR + Static Generation
- **Vue 3** - Composition API
- **Tailwind CSS 4** - Utility-first CSS framework
- **shadcn-nuxt** - Accessible UI components
- **TypeScript** - Type-safe development
- **i18n** - Multilingual support (ES, EN, PT-BR)

## 📁 Project Structure

```
betkit/
├── app/                    # Application source
│   ├── assets/css/        # Stylesheets
│   ├── components/        # Vue components
│   ├── composables/     # Vue composables
│   ├── layouts/         # Page layouts
│   ├── pages/           # Route pages
│   └── plugins/         # Vue plugins
├── public/               # Static assets
├── server/               # Nitro server
├── i18n/                 # Internationalization
├── openspec/             # SDD artifacts
└── .output/             # Production build output
```

## ⚡ Performance Optimizations

See [PERFORMANCE_OPTIMIZATIONS.md](./PERFORMANCE_OPTIMIZATIONS.md) for details.

Key optimizations implemented:
- Brotli/Gzip compression (quality 11)
- Passive event listeners
- JIT Tailwind CSS
- Critical CSS inlining
- DOM batching for layout thrashing prevention
- Optimized animations

## 🚀 Quick Start

### Prerequisites
- **Node.js 22+** (use `nvm use 22`)
- **pnpm** package manager

### Setup

```bash
# Install dependencies
pnpm install

# Setup fonts (optional)
pnpm nuxi setup-fonts
```

### Development

```bash
# Start dev server
pnpm dev

# TypeScript check
pnpm typecheck

# Lint and fix
pnpm lint:fix
```

### Production Build

```bash
# Build for production
pnpm build

# Preview production build
pnpm preview
```

## 🌍 Internationalization

The app supports 3 languages:
- **ES** (Spanish) - Default
- **EN** (English)
- **PT-BR** (Brazilian Portuguese)

Auto-detects user browser language with cookie persistence.

## 🚀 Deployment

### Vercel (Recommended)

The project is already linked to Vercel. Deploy with:

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to production
vercel --prod

# Or use the deploy script
./deploy.sh production
```

### Manual Deploy (PM2/Nginx)

```bash
# Build
pnpm build

# Install PM2
npm install -g pm2

# Start with PM2
pm2 start ecosystem.config.js --env production

# Save PM2 process list
pm2 save
pm2 startup
```

### Environment Variables

Copy `.env.production.example` to `.env.production` and fill in your values:

```bash
cp .env.production.example .env.production
```

Required variables:
- `NUXT_PUBLIC_SITE_URL` - Your site URL
- `DATABASE_URL` - Database connection
- `API_BASE_URL` - API backend URL

## 📊 Monitoring

### Health Check
```bash
# Check application health
curl https://your-domain.com/health
```

### Performance Analysis
```bash
# Analyze bundle size
pnpm build:analyze

# Run Lighthouse audit
lighthouse https://localhost:3000 --output=json --output-path=report.json
```

## 🔧 Development Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm preview` | Preview production build |
| `pnpm typecheck` | Run TypeScript checks |
| `pnpm lint:fix` | Auto-fix linting issues |
| `pnpm deploy:vercel` | Deploy to Vercel |
| `pnpm build:analyze` | Analyze bundle size |

## 🤖 AI Generated

This codebase was optimized by Gentle AI for performance, accessibility, and production readiness.

See the AI implementation notes in `PERFORMANCE_OPTIMIZATIONS.md`.

## 📄 License

© 2025 BetKit Technologies Inc. All rights reserved.