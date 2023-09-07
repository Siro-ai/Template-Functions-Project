import * as admin from "firebase-admin";
import {Collections, Recording, User} from "./types";
import * as path from "path";
const serviceAccountPath = path.join(__dirname, "../../sirocodingchallenges-firebase-adminsdk-d5epk-2bfdd561ef.json");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const serviceAccount = require(serviceAccountPath);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
admin.firestore().settings({
  host: "127.0.0.1:8080",
  ssl: false,
});
export const db = admin.firestore();


/** **** FIRESTORE READ OPERATIONS *******
 *
 * - GET a document by id
 * - GET a collection of documents, optionally filtered by a field value
 */
export async function getUser(uid: string) {
  const user = await db.collection(Collections.Users).doc(uid).get();
  if (!user.exists) {
    throw new Error("User not found for uid " + uid);
  }
  return user.data() as User;
}
export async function getRecordingByCreatorId(creatorId: string) {
  const recordings = await db.collection(Collections.Recordings).where("creatorId", "==", creatorId).get();
  return recordings.docs.map((doc) => doc.data() as Recording);
}


/** **** FIREBASE WRITE OPERATIONS *******
 *
 * - ADD a document: create a new document with a randomly generated id
 * - SET a document: create or update a new document with a specific id
 * - CREATE a document: create a new document (fails if document already exists)
 * - UPDATE a document: update an existing document (fails if document doesn't exist)
 * - DELETE a document: delete an existing document (fails if document doesn't exist)
 * - BATCH WRITE: perform multiple operations as a single batch. All operations will succeed or fail together.
 * - TRANSACTION WRITE: perform multiple operations as a single transaction. Transactions are atomic and will fail if any operation fails.
 * - ATOMIC OPERATIONS: increment a numeric field by a specific amount (e.g., increment a user's score by 1, append a new item to an array)
 */

export async function addRecording(recording: Recording) {
  await db.collection(Collections.Recordings).add(recording);
}
export async function setRecording(id: string, recording: Recording) {
  await db.collection(Collections.Recordings).doc(id).set(recording);
}
export async function updateRecording(id: string, recording: Partial<Recording>) {
  await db.collection(Collections.Recordings).doc(id).update(recording);
}
export async function deleteRecording(id: string) {
  await db.collection(Collections.Recordings).doc(id).delete();
}
export async function batchUpdateRecordingAndUser(recordingId: string, recording: Partial<Recording>, userId: string, user: Partial<User>) {
  const batch = db.batch();
  batch.update(db.collection(Collections.Recordings).doc(recordingId), recording);
  batch.update(db.collection(Collections.Users).doc(userId), user);
  await batch.commit();
}

export async function transactionUpdateRecordingAndUser(recordingId: string, recording: Partial<Recording>, userId: string, user: Partial<User>) {
  await db.runTransaction(async (transaction) => {
    // first get and log the document contents
    const recordingDoc = await transaction.get(db.collection(Collections.Recordings).doc(recordingId));
    const userDoc = await transaction.get(db.collection(Collections.Users).doc(userId));
    console.log("recordingDoc", recordingDoc.data());
    console.log("userDoc", userDoc.data());

    transaction.update(db.collection(Collections.Recordings).doc(recordingId), recording);
    transaction.update(db.collection(Collections.Users).doc(userId), user);
  });
}
