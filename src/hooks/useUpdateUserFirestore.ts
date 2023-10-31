import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";

import useAuth from "./useAuth";

const useUpdateUserFirestore = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const updateUserFirestore = async ({
    subjects,
    enrollment,
    university,
  }: {
    subjects: string[];
    enrollment: string;
    university: string;
  }) => {
    if (!user) {
      return;
    }

    setLoading(true);

    const db = getFirestore();
    const userDocRef = doc(db, "users", user.uid);

    try {
      await updateDoc(userDocRef, {
        subjects,
        enrollment,
        university,
      });
    } catch (error) {
      console.error("Error updating user data in Firestore:", error);
    } finally {
      setLoading(false);
    }
  };

  return { updateUserFirestore, loading };
};

export default useUpdateUserFirestore;
