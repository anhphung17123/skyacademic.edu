/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Semantic color tokens for light/dark mode
        background: {
          DEFAULT: '#F7F8FA', // light neutral
          dark: '#181A1B',    // deep neutral
        },
        surface: {
          DEFAULT: '#FFFFFF', // card/surface
          dark: '#1C1F22',    // deeper neutral for dark cards
        },
        elevated: {
          DEFAULT: '#F0F1F3', // more elevated
          dark: '#232627',    // slightly brighter than surface-dark
        },
        text: {
          primary: {
            DEFAULT: '#1A2233', // high contrast text
            dark: '#F3F4F6',    // not pure white
          },
          secondary: {
            DEFAULT: '#5A6473', // reduced emphasis
            dark: '#AEB4C2',    // readable
          },
          muted: {
            DEFAULT: '#AEB4C2', // muted text
            dark: '#6B7280',    // muted in dark
          },
        },
        border: {
          subtle: {
            DEFAULT: '#E3E6EA',
            dark: '#2C3136',
          },
          strong: {
            DEFAULT: '#C1C7D0',
            dark: '#3A3F44',
          },
        },
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        secondary: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        accent: {
          primary: {
            DEFAULT: '#2563EB', // blue, accessible
            dark: '#3B82F6',    // strong blue for dark CTA
          },
          secondary: {
            DEFAULT: '#F59E42', // orange
            dark: '#FBBF24',
          },
        },
        success: {
          DEFAULT: '#22C55E',
          dark: '#4ADE80',
        },
        warning: {
          DEFAULT: '#FACC15',
          dark: '#FDE047',
        },
        error: {
          DEFAULT: '#EF4444',
          dark: '#F87171',
        },
        disabled: {
          DEFAULT: '#E5E7EB',
          dark: '#374151',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -3px rgba(0, 0, 0, 0.1), 0 10px 30px -2px rgba(0, 0, 0, 0.05)',
        'light-soft': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 4px 12px -2px rgba(59, 130, 246, 0.08), 0 8px 24px -4px rgba(0, 0, 0, 0.04)',
        'light-medium': '0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 10px 20px -4px rgba(59, 130, 246, 0.12), 0 20px 40px -8px rgba(0, 0, 0, 0.06)',
        'light-colored': '0 4px 12px -2px rgba(59, 130, 246, 0.15), 0 8px 24px -4px rgba(168, 85, 247, 0.1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'bounce-soft': 'bounceSoft 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'scale-in': 'scaleIn 0.3s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'slide-in-left': 'slideInLeft 0.3s ease-out',
        'gradient-shift': 'gradientShift 3s ease infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-pattern': 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
      },
    },
  },
  plugins: [],
}
