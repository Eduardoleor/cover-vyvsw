import {
  getFirestore,
  doc,
  updateDoc,
  getDoc,
  FirestoreError,
} from "firebase/firestore";
import { useState, useCallback } from "react";

type UseSubjectsHook = {
  removeSubjects: (userId: string) => Promise<void>;
  removeSubject: (userId: string, subjectId: string) => Promise<void>;
  editSubject: (
    userId: string,
    oldName: string,
    newName: string,
  ) => Promise<void>;
  loading: boolean;
  error: FirestoreError | null;
};

export const useSubjects = (): UseSubjectsHook => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<FirestoreError | null>(null);

  const removeSubject = useCallback(
    async (userId: string, subjectId: string) => {
      setLoading(true);
      const db = getFirestore();
      const userDocRef = doc(db, "users", userId);

      try {
        const userDoc = await getDoc(userDocRef);
        if (!userDoc.exists()) {
          throw new Error("Usuario no encontrado");
        }
        const userData = userDoc.data();
        const updatedSubjects = userData.subjects.filter(
          (id: string) => id !== subjectId,
        );

        await updateDoc(userDocRef, {
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

  const removeSubjects = useCallback(async (userId: string) => {
    setLoading(true);
    const db = getFirestore();
    const userDocRef = doc(db, "users", userId);

    try {
      await updateDoc(userDocRef, {
        subjects: [],
        facultyId: "",
        universityId: "",
      });
    } catch (err) {
      setError(err as FirestoreError);
    } finally {
      setLoading(false);
    }
  }, []);

  const editSubject = useCallback(
    async (userId: string, oldName: string, newName: string) => {
      setLoading(true);
      const db = getFirestore();
      const userDocRef = doc(db, "users", userId);

      try {
        const userDoc = await getDoc(userDocRef);
        if (!userDoc.exists()) {
          throw new Error("Usuario no encontrado");
        }
        const userData = userDoc.data();
        const updatedSubjects = userData.subjects.map((subject: string) =>
          subject === oldName ? newName : subject,
        );

        await updateDoc(userDocRef, {
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

  return { removeSubjects, removeSubject, editSubject, loading, error };
};
