import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';

let app: App;
let db: Firestore;

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
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const path = require('path');
    const credPath = path.resolve(process.cwd(), 'firebase-credentials.json');
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
