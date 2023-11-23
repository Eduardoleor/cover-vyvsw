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
  university: string;
  uid: string;
  subjects: string[];
}

const useUserInfo = (): {
  userInfo: UserInfo | null;
  loading: boolean;
  refetchUserInfo: () => void;
} => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchUserInfo = useCallback(() => {
    if (user) {
      setLoading(true);
      const db = getFirestore();
      const userDocRef = doc(db, "users", user.uid);

      getDoc(userDocRef)
        .then((docSnap: DocumentSnapshot) => {
          if (docSnap.exists()) {
            setUserInfo(docSnap.data() as UserInfo);
          } else {
            setUserInfo(null);
          }
          setLoading(false);
        })
        .catch((error: any) => {
          console.error("Error fetching user info:", error);
          setUserInfo(null);
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

  return { userInfo, loading, refetchUserInfo: fetchUserInfo };
};

export default useUserInfo;
