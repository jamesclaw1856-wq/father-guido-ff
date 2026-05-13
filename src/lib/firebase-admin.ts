import { existsSync } from 'node:fs';
import * as path from 'node:path';
import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';

let app: App;
let db: Firestore;

function getCredentialPath() {
  return path.resolve(process.cwd(), 'firebase-credentials.json');
}

export function getFirebaseConfigurationError(): string | null {
  if (process.env.FIREBASE_CREDENTIALS) {
    return null;
  }

  const credPath = getCredentialPath();
  if (existsSync(credPath)) {
    return null;
  }

  return `Firebase Admin is not configured. Add a service account file at ${credPath} or set FIREBASE_CREDENTIALS in .env.local.`;
}

function getAdminApp(): App {
  if (getApps().length > 0) {
    return getApps()[0];
  }

  // In production (Vercel): use FIREBASE_CREDENTIALS env var (JSON string)
  // In development: use local firebase-credentials.json file
  let credential;

  if (process.env.FIREBASE_CREDENTIALS) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_CREDENTIALS);
    credential = cert(serviceAccount);
  } else {
    const credPath = getCredentialPath();
    credential = cert(credPath);
  }

  app = initializeApp({
    credential,
    projectId: process.env.FIREBASE_PROJECT_ID || 'fantasy-football-father-2f71e',
  });

  return app;
}

export function getDb(): Firestore {
  if (!db) {
    const adminApp = getAdminApp();
    db = getFirestore(adminApp);
  }
  return db;
}
