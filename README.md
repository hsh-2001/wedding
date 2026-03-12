# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Firebase For Nitro API

This project uses Firebase Admin SDK for server routes (Nitro), not the browser SDK.

1. Copy `.env.example` to `.env`.
2. Fill these values from your Firebase service account:

- `NUXT_FIREBASE_ADMIN_PROJECT_ID`
- `NUXT_FIREBASE_ADMIN_CLIENT_EMAIL`
- `NUXT_FIREBASE_ADMIN_PRIVATE_KEY`

Example route added:

- `POST /api/firebase/verify`
  - Header: `Authorization: Bearer <firebase_id_token>`
  - Response: verified user info (`uid`, `email`)
