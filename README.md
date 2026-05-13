# Father Guido Fantasy Football

Private fantasy-football command center built with Next.js, React, TypeScript, and Firebase Admin/Firestore.

## What the app includes

- Password-protected dashboard
- News + ripple effects workflow
- Player database
- 3-year analysis page
- Draft board
- NFL team recommendations

## Local development

1. Install dependencies

```bash
npm ci
```

2. Configure local environment

```bash
cp .env.local.example .env.local
```

3. Add Firebase Admin credentials using one of these options

Option A (simplest locally):
- Download a Firebase service account JSON file
- Save it as:
  `firebase-credentials.json`

Option B:
- Put the full JSON into `FIREBASE_CREDENTIALS` inside `.env.local`

Notes:
- `.env.local` is loaded from the project root
- `firebase-credentials.json` is gitignored and should never be committed
- Data-backed pages will show clear setup warnings until credentials are present

4. Start the dev server

```bash
npm run dev
```

Open http://localhost:3000

## Authentication

By default, the app uses:

```txt
fatherguido2026
```

You can override it locally with `APP_PASSWORD` in `.env.local`.

## Firebase settings used by the app

- `APP_PASSWORD`
- `FIREBASE_PROJECT_ID`
- `FIREBASE_CREDENTIALS`
- fallback local file: `firebase-credentials.json`

## Current local behavior without Firebase credentials

Without Firebase Admin credentials:
- Dashboard shell still renders
- Analysis, Draft Board, and Teams pages still render
- Player and News pages show explicit setup warnings
- News update API returns an error until Firebase is configured
