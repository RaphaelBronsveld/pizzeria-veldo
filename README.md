# Pizzeria Veldo

## Features

- 🚀 Build with Next.JS App Router (server components / actions)
- 🔒 TypeScript by default
- 💎 ESLint as formatter/linter
- 🎉 Tailwind 4 with shadcn/ui for styling
- 🔥 Simple CI/CD with GH Actions.
- ⚡️ Connects to Supabase as Postgresql datasource
- 🧪 Basic unit testing using Vitest

## Getting Started

### Requirements

- node@22

### Installation

Install the dependencies:

```bash
npm install
```

### Set-up (db)

> [!WARNING]  
> No migrations + seeds generated yet(!). If you really want to set this project up you'd need to create these yourself.

Copy .env.local to set-up Supabase.

`cp .env.example .env.local`

### Development

Start the development server:

```bash
npm run dev
```

Your application will be available at `http://localhost:3000`.

## Deployment

Deployments are triggered through Vercel.
