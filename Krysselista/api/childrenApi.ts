//
//
// Children API connection to firebase.

// Imports

import {
  arrayRemove,
  collection,
  deleteDoc,
  doc,
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
    console.error("Error! Could not create child: ", error);
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

    console.log("All children successfully fetched from firebase.");
    return children;
  } catch (error) {
    console.error("Error! Could not get all children: ", error);
    return [];
  }
}

// Delete child
export async function deleteChild(childID: string) {
  try {
    const childRef = doc(db, "children", childID);
    await updateDoc(childRef, {
      children: arrayRemove(childID),
    });

    await deleteDoc(doc(db, "children", childID));
    console.log("Successfully deleted child.");
  } catch (error) {
    console.error("Error! Could not delete child: ", error);
  }
}

// Toggle child presence
export async function toggleChildPresence(
  childID: string,
  currentValue: boolean
) {
  try {
    const value = !currentValue;
    const childRef = doc(db, "children", childID);
    await updateDoc(childRef, {
      isPresent: value,
    });

    console.log("Updated child presence: ", value);
    return value;
  } catch (error) {
    console.error("Error! Could not update child: ", error);
  }
}
