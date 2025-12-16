//
//
// Children API connection to firebase.

// Imports --------------------------------------------------------------------------

import {
  arrayRemove,
  collection,
  deleteDoc,
  doc,
  getDocs,
  addDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { ChildData } from "@/interfaces/child";

// Functions--------------------------------------------------------------------------

// Create child
export async function createChild(userdId: string, child: ChildData) {
  try {
    const childRef = await addDoc(collection(db, "children"), child);
    const userRef = doc(db, "users", userdId);
    await updateDoc(userRef, {
      children: arrayUnion(childRef.id),
    });

    console.log("Children saved with parent id:", childRef.id);
  } catch (error) {
    console.error("Error! Could not create child: ", error);
  }
}

// Get child by ID
export async function getChildById(childID: string) {
  try {
    const child = await getDoc(doc(db, "children", childID));
    return {
      ...child.data(),
      id: child.id,
    } as ChildData;
  } catch (error) {
    console.error("Error gettig child wild by id: ", error);
    return null;
  }
}

// Get children by userID
export async function getChildrenByUserId(userID: string) {
  try {
    const querySnapshot = await getDocs(
      query(collection(db, "children"), where("parentID", "==", userID))
    );

    return querySnapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id } as ChildData;
    });
  } catch (error) {
    console.error("Error gettig children by UserID: ", error);
    return null;
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
export async function deleteChild(childID: string, userID: string) {
  try {
    const userRef = doc(db, "users", userID);
    await updateDoc(userRef, { children: arrayRemove(childID) });

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

// Search children by name
export async function getSearchedChildren(searchTerm: string) {
  try {
    const endTerm = searchTerm + "\uf8ff";
    const querySnapshot = await getDocs(
      query(
        collection(db, "children"),
        where("name", ">=", searchTerm),
        where("name", "<=", endTerm)
      )
    );
    return querySnapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id } as ChildData;
    });
  } catch (error) {
    console.error("Error searching children: ", error);
    return [] as ChildData[];
  }
}