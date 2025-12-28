# OLX Lebanon - Frontend Assessment

A classified ads platform built with Next.js (Pages Router), TypeScript, and custom CSS styling that mimics the OLX Lebanon app.

![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![TanStack Query](https://img.shields.io/badge/TanStack%20Query-5.0-red)
![Zod](https://img.shields.io/badge/Zod-3.0-purple)

## 🚀 Features

### Implemented Screens

1. **Home Screen** (`/`)
   - Hero section with search functionality
   - Category chips for quick navigation
   - Featured ads grid (3+ categories: Cars, Properties, Mobiles)
   - Call-to-action section
   - Server-side rendered (SSR) for SEO

2. **Post An Ad** (`/post-ad`)
   - OLX-style two-column category selector
   - Dynamic form fields based on selected category
   - Form validation with Zod
   - Support for Properties for Sale & Cars for Sale categories

### Technical Features

- ✅ **No external UI libraries** (MaterialUI, etc.)
- ✅ **No CSS utility frameworks** (Tailwind, etc.)
- ✅ **Next.js Pages Router** with TypeScript
- ✅ **Custom CSS Modules** for styling
- ✅ **TanStack Query** for data fetching and caching
- ✅ **Zod** for form validation
- ✅ **Arabic & English** language support (RTL/LTR)
- ✅ **SSR** for home page
- ✅ **Mock ads** from 3 categories (Cars, Apartments, Mobiles)

## 📦 Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AdCard/         # Ad display card
│   ├── Button/         # Button component
│   ├── Card/           # Card wrapper
│   ├── Input/          # Form input
│   ├── Layout/         # Main layout with header/footer
│   ├── LanguageSwitcher/ # EN/AR toggle
│   ├── Select/         # Dropdown select
│   └── Textarea/       # Multi-line input
├── contexts/           # React contexts
│   └── LocaleContext/  # i18n context
├── hooks/              # Custom TanStack Query hooks
│   ├── useCategories.ts
│   └── useCategoryFields.ts
├── i18n/               # Translations
│   └── translations.ts
├── pages/              # Next.js pages
│   ├── index.tsx       # Home page (SSR)
│   ├── post-ad.tsx     # Post an ad page
│   └── _app.tsx        # App wrapper
├── schemas/            # Zod validation schemas
├── services/           # API services
│   ├── api.ts          # OLX API integration
│   └── mockData.ts     # Mock ads data
├── styles/             # CSS Modules
├── types/              # TypeScript types
└── utils/              # Utilities and constants
```

## 🔌 API Integration

The app integrates with OLX Lebanon's public APIs:

- **Categories API**: `https://www.olx.com.lb/api/categories`
- **Category Fields API**: `https://www.olx.com.lb/api/categoryFields`

With fallback mock data when the API is unavailable.

## 🌐 Internationalization

The app supports:
- **English** (LTR)
- **Arabic** (RTL)

Language preference is persisted in localStorage.

## 🎨 Design

The UI is designed to match the OLX Lebanon app with:
- OLX brand colors (#002f34, #23e5db)
- Clean, modern card-based layouts
- Responsive design for mobile and desktop
- Accessible form components

## 📝 Form Validation

Using Zod for:
- Title: 10-100 characters
- Description: 20-5000 characters
- Price: 0-999,999,999
- Dynamic category-specific fields

## 🧪 Supported Categories

The form fully supports:
- ✅ Properties for Sale
- ✅ Cars for Sale
- ✅ Mobile Phones
- ✅ All other categories via dynamic field loading

## 📄 License

MIT
