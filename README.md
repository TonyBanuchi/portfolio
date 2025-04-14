This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


Application Structure:
/
├── app/                     # App Router directory
│   ├── layout.tsx           # Root layout (server component)
│   ├── page.tsx             # Homepage (can be server component)
│   ├── about/               # About page route
│   │   └── page.tsx
│   ├── projects/            # Projects page route
│   │   └── page.tsx
│   ├── contact/             # Contact page route
│   │   └── page.tsx
│   └── globals.css          # Global styles
│
├── components/              # Shared components
│   ├── ui/                  # UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── ...
│   ├── ThemeProvider.tsx    # Theme provider (client component)
│   ├── ClientLayout.tsx     # Client wrapper for layout (client component)
│   ├── Header.tsx           # Header component (client component)
│   └── ...
│
├── theme/                   # Theme system
│   ├── types.ts             # Theme type definitions
│   ├── colors.ts            # Theme color definitions
│   └── index.ts             # Theme exports
│
├── tailwind.config.js       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Project dependencies