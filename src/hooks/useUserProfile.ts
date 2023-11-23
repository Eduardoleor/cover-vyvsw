import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  FirestoreError,
} from "firebase/firestore";
import { useState, useCallback } from "react";

type UserProfileUpdate = {
  universityId: string;
  facultyId: string;
  subjects: string[];
};

type UseUserProfileHook = {
  updateUserProfile: (
    userId: string,
    profileData: UserProfileUpdate,
  ) => Promise<void>;
  loading: boolean;
  error: FirestoreError | null;
};

export const useUserProfile = (): UseUserProfileHook => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<FirestoreError | null>(null);

  const updateUserProfile = useCallback(
    async (userId: string, profileData: UserProfileUpdate) => {
      setLoading(true);
      const db = getFirestore();
      const userDocRef = doc(db, "users", userId);

      try {
        const userDoc = await getDoc(userDocRef);
        if (!userDoc.exists()) {
          throw new Error("Usuario no encontrado");
        }
        const userData = userDoc.data();

        const existingSubjects = (userData.subjects as string[]) || [];
        const updatedSubjects = Array.from(
          new Set([...existingSubjects, ...profileData.subjects]),
        );

        await updateDoc(userDocRef, {
          ...profileData,
          subjects: updatedSubjects,
        });
      } catch (err) {
        setError(err as FirestoreError);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return { updateUserProfile, loading, error };
};
