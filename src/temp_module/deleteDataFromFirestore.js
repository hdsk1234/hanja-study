import { collection, getDocs, writeBatch, query, orderBy } from "firebase/firestore";

async function removeDuplicates(db, collectionName, fieldName) {
  const colRef = collection(db, collectionName);
  const q = query(colRef, orderBy(fieldName));
  const snapshot = await getDocs(q);

  const batch = writeBatch(db);
  const seenValues = new Set();
  let duplicateCount = 0;

  snapshot.docs.forEach((doc) => {
    const val = doc.data()[fieldName];
    if (seenValues.has(val)) {
      batch.delete(doc.ref);
      duplicateCount++;
    } else {
      seenValues.add(val);
    }
  });

  if (duplicateCount > 0) {
    await batch.commit();
  }
  return duplicateCount;
}