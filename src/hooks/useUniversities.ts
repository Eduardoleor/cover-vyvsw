import {
  getFirestore,
  collection,
  getDocs,
  FirestoreError,
} from "firebase/firestore";
import { useState, useEffect, useCallback } from "react";

type UniversityType = {
  id: string;
  name: string;
  shortName: string;
  logo: string;
  faculties: string[];
};

type UseUniversitiesHook = {
  universities: UniversityType[];
  loading: boolean;
  error: FirestoreError | null;
  reloadUniversities: () => void;
};

export const useUniversities = (): UseUniversitiesHook => {
  const [universities, setUniversities] = useState<UniversityType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<FirestoreError | null>(null);

  const fetchUniversities = useCallback(async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(
        collection(getFirestore(), "universities"),
      );
      const universityData: UniversityType[] = querySnapshot.docs.map((doc) => {
        const data = doc.data() as Omit<UniversityType, "id">;
        return {
          id: doc.id,
          ...data,
        };
      });
      setUniversities(universityData);
    } catch (err) {
      setError(err as FirestoreError);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchUniversities();
  }, [fetchUniversities]);

  return {
    universities,
    loading,
    error,
    reloadUniversities: fetchUniversities,
  };
};
