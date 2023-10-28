import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";

import { SECURITY_STORAGE_SESSION } from "../constants/storage";

const useSession = () => {
  const [userHasSession, setUserHasSession] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    SecureStore.getItemAsync(SECURITY_STORAGE_SESSION)
      .then((value) => {
        if (value) {
          setUserHasSession(true);
        }
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return { userHasSession, loading, error };
};

export default useSession;
