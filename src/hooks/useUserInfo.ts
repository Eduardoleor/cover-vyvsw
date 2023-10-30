import {
  getFirestore,
  doc,
  getDoc,
  DocumentSnapshot,
} from "firebase/firestore"; // Import Firestore functions
import { useEffect, useState } from "react";

import useAuth from "./useAuth";

interface UserInfo {
  displayName: string;
  email: string;
  uid: string;
}

const useUserInfo = (): UserInfo | null => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const { user } = useAuth(); // Replace with your custom authentication hook

  useEffect(() => {
    if (user) {
      // Create a reference to the user's document in Firestore
      const db = getFirestore();
      const userDocRef = doc(db, "users", user.uid); // Replace 'users' with your Firestore collection

      // Fetch the user's data
      getDoc(userDocRef)
        .then((docSnap: DocumentSnapshot) => {
          if (docSnap.exists()) {
            // Document exists, set user info in state
            setUserInfo(docSnap.data() as UserInfo);
          } else {
            // Document doesn't exist, set userInfo as null or handle accordingly
            setUserInfo(null);
          }
        })
        .catch((error: any) => {
          // Handle the error (e.g., log it or set an error state)
          console.error("Error fetching user info:", error);
          setUserInfo(null);
        });
    } else {
      // User is not authenticated, set userInfo as null
      setUserInfo(null);
    }
  }, [user]); // Trigger the effect when the user object changes

  return userInfo;
};

export default useUserInfo;
