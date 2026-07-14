# SAI Residential School

Official website for SAI Residential School — built with [Astro](https://astro.build) and Tailwind CSS.

## Tech Stack

- **Framework**: Astro 4
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Linting**: ESLint + Prettier

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Folder Structure

```
sai-residential-school/
├── public/              # Static assets (images, fonts, favicon)
├── src/
│   ├── assets/          # Processed assets (optimised images)
│   ├── components/      # Reusable Astro/UI components
│   ├── layouts/         # Page layout wrappers
│   ├── pages/           # File-based routing (each file = a route)
│   └── styles/          # Global CSS (Tailwind entry point)
├── astro.config.mjs
├── tailwind.config.mjs
└── tsconfig.json
```

## Environment Variables

Copy `.env.example` to `.env` and fill in the required values:

```bash
cp .env.example .env
```

## License

All rights reserved © SAI Residential School.
