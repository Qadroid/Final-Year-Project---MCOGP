// This file is used as a store and a set of functions to interact with Firestore

import { writable } from "svelte/store";
import { auth, firestore } from "@/firebase";
import { collection, doc, getDoc, getDocs, onSnapshot, setDoc } from "firebase/firestore";

export const currentProject = writable("default");

// Function to subscribe to Firestore document
export function subscribeToCurrentProject() {
  const userId = auth.currentUser?.uid;
  const docRef = doc(firestore, `users/${userId}/currentProject`);

  const unsubscribe = onSnapshot(docRef, (doc) => {
    if (doc.exists()) {
      currentProject.set(doc.data());
    } else {
      currentProject.set(null);
    }
  }, (error) => {
    console.error("Error fetching current project:", error);
  });

  return unsubscribe; 
}

// Function to create a default project for a new user
export async function createUserDefaultProject() {
    const userId = auth.currentUser?.uid;

  if (!userId) {
    console.error("No user ID provided");
    return;
  }

  const projectRef = doc(firestore, "projects", userId);
  const projectSnap = await getDoc(projectRef);

  if (!projectSnap.exists()) {
    await setDoc(projectRef, {
        projectName: "Default",
        createdAt: new Date(),
        members: [userId]
    })
    .then(() => {
        console.log("Default project created");
    })
    .catch((error) => {
        console.error("Error creating default project:", error);
    });
  }
}

// Function to load all projects from Firestore
export async function loadProjects() {
  const projectsRef = collection(firestore, "projects");
  const projectSnapshots = await getDocs(projectsRef);
  const projects = projectSnapshots.docs.map(doc => doc.data());
  return projects;
}