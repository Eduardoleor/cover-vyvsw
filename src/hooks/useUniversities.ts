import {
  getFirestore,
  collection,
  getDocs,
  QuerySnapshot,
} from "firebase/firestore";
import { useEffect, useState } from "react";

interface University {
  id: string;
  name: string;
  cover: string;
  logo: string;
}

const useUniversities = (): {
  universities: University[] | null;
  loading: boolean;
} => {
  const [universities, setUniversities] = useState<University[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUniversities = async () => {
      const db = getFirestore();
      const universitiesCollection = collection(db, "universities"); // Replace 'universities' with your Firestore collection

      try {
        const querySnapshot: QuerySnapshot = await getDocs(
          universitiesCollection
        );
        const universitiesData: University[] = [];

        querySnapshot.forEach((doc: any) => {
          universitiesData.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        setUniversities(universitiesData);
        setLoading(false);
      } catch (error) {
        // Handle the error (e.g., log it or set an error state)
        console.error("Error fetching universities:", error);
        setUniversities(null);
        setLoading(false);
      }
    };

    fetchUniversities();
  }, []);

  return { universities, loading };
};

export default useUniversities;
