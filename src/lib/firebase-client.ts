// Client-side Firebase config for static export
// Uses Firestore REST API via firebase-admin service account on the server
// For static deployment, we embed the data at build time + use client-side fetching

const FIRESTORE_PROJECT = 'fantasy-football-father-2f71e';

interface FirestoreDoc {
  fields: Record<string, any>;
}

function parseFirestoreValue(value: any): any {
  if (value.stringValue !== undefined) return value.stringValue;
  if (value.integerValue !== undefined) return parseInt(value.integerValue);
  if (value.doubleValue !== undefined) return value.doubleValue;
  if (value.booleanValue !== undefined) return value.booleanValue;
  if (value.nullValue !== undefined) return null;
  if (value.mapValue) {
    const result: Record<string, any> = {};
    for (const [k, v] of Object.entries(value.mapValue.fields || {})) {
      result[k] = parseFirestoreValue(v);
    }
    return result;
  }
  if (value.arrayValue) {
    return (value.arrayValue.values || []).map(parseFirestoreValue);
  }
  return value;
}

function parseDoc(doc: any): any {
  const id = doc.name?.split('/').pop();
  const result: Record<string, any> = { id };
  if (doc.fields) {
    for (const [k, v] of Object.entries(doc.fields)) {
      result[k] = parseFirestoreValue(v as any);
    }
  }
  return result;
}

export async function fetchCollection(collection: string): Promise<any[]> {
  const url = `https://firestore.googleapis.com/v1/projects/${FIRESTORE_PROJECT}/databases/(default)/documents/${collection}?pageSize=500`;
  const res = await fetch(url);
  if (!res.ok) return [];
  const data = await res.json();
  return (data.documents || []).map(parseDoc);
}

export async function fetchDocument(collection: string, docId: string): Promise<any | null> {
  const url = `https://firestore.googleapis.com/v1/projects/${FIRESTORE_PROJECT}/databases/(default)/documents/${collection}/${docId}`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const doc = await res.json();
  return parseDoc(doc);
}
