import {
  getFirestore,
  doc,
  getDoc,
  DocumentSnapshot,
} from "firebase/firestore";
import { useEffect, useState, useCallback } from "react";

import useAuth from "./useAuth";

interface UserInfo {
  displayName: string;
  email: string;
  enrollment: string;
  universityId: string;
  facultyId: string;
  uid: string;
  subjects: string[];
}

const useUserInfo = (): {
  userInfo: UserInfo | null;
  loading: boolean;
  error: Error | null;
  refetchUserInfo: () => void;
} => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useAuth();

  const fetchUserInfo = useCallback(() => {
    if (user) {
      setLoading(true);
      setError(null);
      const db = getFirestore();
      const userDocRef = doc(db, "users", user.uid);

      getDoc(userDocRef)
        .then((docSnap: DocumentSnapshot) => {
          if (docSnap.exists()) {
            setUserInfo(docSnap.data() as UserInfo);
          } else {
            setUserInfo(null);
          }
        })
        .catch((error: any) => {
          console.error("Error fetching user info:", error);
          setError(error);
          setUserInfo(null);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setUserInfo(null);
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

  return { userInfo, loading, error, refetchUserInfo: fetchUserInfo };
};

export default useUserInfo;
