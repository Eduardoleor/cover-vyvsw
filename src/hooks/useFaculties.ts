import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  FirestoreError,
} from "firebase/firestore";
import { useState, useEffect, useCallback } from "react";

// Tipo para los datos de una facultad
type FacultyType = {
  id: string;
  name: string;
  shortName: string;
  logo: string;
  universityId: string;
};

// Tipo para el estado y la función de retorno del hook
type UseFacultiesHook = {
  faculties: FacultyType[];
  loading: boolean;
  error: FirestoreError | null;
  reloadFaculties: () => void;
};

export const useFaculties = (universityId: string): UseFacultiesHook => {
  const [faculties, setFaculties] = useState<FacultyType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<FirestoreError | null>(null);

  const fetchFaculties = useCallback(async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(
        query(
          collection(getFirestore(), "faculties"),
          where("universityId", "==", universityId),
        ),
      );
      const facultyData: FacultyType[] = querySnapshot.docs.map((doc) => {
        const data = doc.data() as Omit<FacultyType, "id">;
        return {
          id: doc.id,
          ...data,
        };
      });

      setFaculties(facultyData);
    } catch (err) {
      setError(err as FirestoreError);
    } finally {
      setLoading(false);
    }
  }, [universityId]);

  useEffect(() => {
    fetchFaculties();
  }, [fetchFaculties]);

  return { faculties, loading, error, reloadFaculties: fetchFaculties };
};
