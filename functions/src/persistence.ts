import * as admin from "firebase-admin";
import {Collections, Recording, User} from "./types";
import {config} from "firebase-functions";

admin.initializeApp(config().firebase);
// point to emulator
admin.firestore().settings({
  host: "127.0.0.1:8080",
  ssl: false,
});
export const db = admin.firestore();


/** Sample Firebase Read Operations */
export async function getUser(uid: string) {
  console.log("going to get user for uid " + uid);

  const user = await db.collection(Collections.Users).doc(uid).get();
  if (!user.exists) {
    throw new Error("User not found for uid " + uid);
  }
  return user.data() as User;
}

export async function getRecording(recordingId: string) {
  const recording = await db.collection(Collections.Recordings).doc(recordingId).get();
  if (!recording.exists) {
    throw new Error("Recording not found for id " + recordingId);
  }
  return recording.data() as Recording;
}


/** Sample Firebase Write Operations */
export async function updateUser(id: string, user: Partial<User>) {
  await db.collection(Collections.Users).doc(id).update(user);
}

export async function updateRecording(id: string, recording: Partial<Recording>) {
  await db.collection(Collections.Recordings).doc(id).update(recording);
}
