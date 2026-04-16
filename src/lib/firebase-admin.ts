import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import path from 'path';

let app: App;
let db: Firestore;

function getAdminApp(): App {
  if (getApps().length > 0) {
    return getApps()[0];
  }

  const credPath = path.resolve(process.cwd(), 'firebase-credentials.json');

  app = initializeApp({
    credential: cert(credPath),
    projectId: process.env.FIREBASE_PROJECT_ID,
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
