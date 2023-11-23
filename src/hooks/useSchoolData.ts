import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";

type UniversityData = {
  name: string;
  logo: string;
};

type FacultyData = {
  name: string;
  logo: string;
};

type SchoolData = {
  university: UniversityData;
  faculty: FacultyData;
};

const useSchoolData = (facultyId: string, universityId: string) => {
  const [schoolData, setSchoolData] = useState<SchoolData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const db = getFirestore();

  useEffect(() => {
    const fetchSchoolData = async () => {
      try {
        const universityDocRef = doc(db, "universities", universityId);
        const facultyDocRef = doc(db, "faculties", facultyId);

        const universityDoc = await getDoc(universityDocRef);
        const facultyDoc = await getDoc(facultyDocRef);

        if (!universityDoc.exists() || !facultyDoc.exists()) {
          throw new Error("No se encontró la universidad o la facultad");
        }

        const universityData: UniversityData =
          universityDoc.data() as UniversityData;
        const facultyData: FacultyData = facultyDoc.data() as FacultyData;

        setSchoolData({ university: universityData, faculty: facultyData });
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchoolData();
  }, [facultyId, universityId, db]);

  return { schoolData, loading, error };
};

export default useSchoolData;
