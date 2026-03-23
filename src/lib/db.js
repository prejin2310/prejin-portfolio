import {
  collection, doc,
  getDocs, getDoc,
  setDoc, addDoc,
  updateDoc, deleteDoc as _deleteDoc,
} from "firebase/firestore";
import { db } from "./firebase";

/** Fetch all documents from a collection, sorted by numeric `id` field */
export async function getAll(col) {
  const snap = await getDocs(collection(db, col));
  return snap.docs
    .map((d) => ({ _id: d.id, ...d.data() }))
    .sort((a, b) => (a.id ?? 0) - (b.id ?? 0));
}

/** Fetch a single document */
export async function getDocument(col, id) {
  const snap = await getDoc(doc(db, col, String(id)));
  return snap.exists() ? { _id: snap.id, ...snap.data() } : null;
}

/** Create or overwrite a document (uses numeric id as doc key) */
export async function saveDocument(col, id, data) {
  await setDoc(doc(db, col, String(id)), data);
}

/** Delete a document */
export async function deleteDocument(col, id) {
  await _deleteDoc(doc(db, col, String(id)));
}

/** Seed an entire collection from a static array (uses item.id as doc key) */
export async function seedCollection(col, items) {
  await Promise.all(items.map((item) => setDoc(doc(db, col, String(item.id)), item)));
}

/** Seed the profile settings document */
export async function seedProfile(profileData) {
  await setDoc(doc(db, "settings", "profile"), profileData);
}
