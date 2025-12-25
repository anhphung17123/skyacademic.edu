# SkyAcademy Static Public Portal

A static version of the SkyAcademy English Learning Platform public website. This project provides a complete UI/UX showcase with mock data, perfect for demos, presentations, and frontend development.

## 🚀 Features

- **No API Required**: All data comes from static mock files
- **Pure UI/UX Showcase**: Perfect for demos and presentations
- **Responsive Design**: Mobile-first, works on all devices
- **Internationalization**: Vietnamese & English support (i18next)
- **Dark Mode**: Built-in theme switcher with context management
- **Modern Stack**: React 18 + TypeScript + Vite + TailwindCSS
- **Type-Safe**: Full TypeScript coverage with strict typing
- **Component-Based**: Modular, reusable component architecture

## 📦 What's Included

### Public Pages
- 🏠 **Home** - Hero section, Featured Courses, Free Videos, Featured Blocks
- 📚 **Courses** - Course listings with language filtering (English/Vietnamese)
- 📖 **Course Detail** - Detailed course information, registration form, QR payment, syllabus, FAQs
- 📗 **Books** - Physical & Digital book catalog with preview gallery
- 📕 **Book Detail** - Book information, preview images, purchase options
- 🎬 **Free Videos** - YouTube video gallery with filtering and search
- ℹ️ **About** - Company information
- 📞 **Contact** - Contact form & information with CTA section
- 🔒 **Privacy Policy** - Privacy policy page
- 📋 **Terms of Service** - Terms of service page

### What's NOT Included (Removed from original)
- ❌ Login/Register/Authentication
- ❌ Admin Portal
- ❌ Dashboard
- ❌ API integrations
- ❌ Real payment processing

## 🛠️ Tech Stack

- **Framework**: React 18.3.1
- **Language**: TypeScript 5.2.2
- **Build Tool**: Vite 5.1.4
- **Styling**: TailwindCSS 3.4.1
- **Routing**: React Router DOM 6.22.0
- **Internationalization**: i18next 23.10.0 + react-i18next 14.0.5
- **Icons**: Lucide React 0.344.0
- **Node Version**: 20 (required)

## 📋 Prerequisites

- Node.js 20.x
- Yarn package manager

## 🛠️ Installation

```bash
# Install dependencies
yarn install

# Start development server (runs on http://localhost:9000)
yarn dev

# Build for production
yarn build

# Preview production build
yarn preview

# Run linter
yarn lint
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── book/           # Book-related components (BookCard, PreviewGalleryModal)
│   ├── common/         # Shared components (Loading, LanguageSwitcher, VideoPlayerPopup, etc.)
│   ├── course/         # Course-related components (CourseCard)
│   ├── layout/         # Layout components (Header, Footer, MainLayout)
│   ├── payment/        # Payment UI components (static)
│   └── ui/             # Base UI components (Button, Input)
├── constants/          # App configuration (API endpoints, common constants)
├── contexts/           # React contexts (theme-context)
├── helpers/           # Helper functions
├── hooks/             # Custom React hooks (useHome, useCourseDetail, etc.)
├── i18n/              # Internationalization
│   ├── index.ts       # i18n configuration
│   └── locales/       # Translation files (en.json, vi.json)
├── images/            # Static images and assets
├── mappers/           # Data transformation utilities (api-mappers)
├── pages/             # Page components
│   ├── Home/          # Home page with sections
│   ├── Courses/       # Course listing page
│   ├── CourseDetail/  # Course detail with components and hooks
│   ├── Books/         # Book listing page
│   ├── BookDetail/    # Book detail page
│   ├── FreeVideos/    # Free videos page with filters
│   ├── Contact/       # Contact page with form
│   ├── OrderSuccess/  # Order success page
│   └── ...            # Other pages
├── routes/            # Routing configuration (ClientPortalRoutes)
├── services/          # Service layer
│   ├── api/           # API service clients (mock implementations)
│   └── mock/          # Mock data and handlers
│       ├── data/      # Static mock data files
│       └── handlers/  # Mock API handlers
├── stores/            # Zustand state stores (authStore)
├── types/             # TypeScript type definitions
│   ├── api/           # API-related types
│   └── ...            # Domain types (book, course, user, etc.)
└── utils/             # Utility functions (currency, storage)
```

## 🎨 Design System

- **Primary Color**: Sky Blue (#0ea5e9)
- **Secondary Color**: Purple (#8b5cf6)
- **Fonts**: Inter (body), Poppins (display)
- **Icons**: Lucide React
- **Styling**: TailwindCSS utility classes
- **Theme**: Light/Dark mode support

## 📝 Mock Data

All data is served from static files in `src/services/mock/data/`:
- Courses (with details, classrooms, schedules)
- Books (with preview images)
- Free Videos (YouTube integration)
- Teachers
- Orders
- Registrations
- And more...

Mock handlers are located in `src/services/mock/handlers/` and simulate API responses.

## 🔧 Development

### Development Server

The development server runs on port 9000 by default (configured in `vite.config.ts`).

### Code Style

This project follows strict TypeScript and React best practices:
- TypeScript strict mode enabled
- ESLint configured with React hooks rules
- Component-based architecture
- Custom hooks for business logic
- Type-safe API mappers

### Path Aliases

The project uses path aliases for cleaner imports:
- `@/` maps to `src/`

Example:
```typescript
import { Home } from '@/pages/Home';
import { Button } from '@/components/ui/Button';
```

## 🌐 Internationalization

The project supports multiple languages:
- English (en)
- Vietnamese (vi)

Translation files are located in `src/i18n/locales/`. Use the `useTranslation` hook from `react-i18next` to access translations.

## 🚀 Deployment

Build the project for production:

```bash
yarn build
```

The output will be in the `dist/` directory, ready for static hosting.

## 📄 License

Private - SkyAcademy © 2025
