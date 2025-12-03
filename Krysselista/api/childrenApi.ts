//
//
// Children API connection to firebase.

// Imports

import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { ChildData } from "@/interfaces/child";

// Functions

// Create child
export async function createChild(childId: string, child: ChildData) {
  try {
    await setDoc(doc(db, "children", childId), child);
    console.log("Children saved with id:", childId);
  } catch (error) {
    console.log("Error! Could not create child: ", error);
  }
}

// Get all children from firebase by ID
export async function getAllChildrenById() {
  try {
    const query = await getDocs(collection(db, "children"));
    const children = query.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as ChildData)
    );

    return children;
  } catch (error) {
    console.log("Error! Could not get all children: ", error);
    return [];
  }
}

// Delete child
export async function deleteChild() {
  try {
  } catch (error) {
    console.log("Error! Could not delete child: ", error);
  }
}

// Update child
export async function updateChild() {
  try {
  } catch (error) {
    console.log("Error! Could not update child: ", error);
  }
}
