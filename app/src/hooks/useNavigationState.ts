import { useRootNavigationState } from "expo-router";
import { useEffect, useState } from "react";

const useNavigationState = () => {
  const [isReadyNavigation, setIsReadyNavigation] = useState<boolean>(false);
  const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    if (rootNavigationState) {
      setIsReadyNavigation(true);
    }
  }, []);

  return { isReadyNavigation };
};

export default useNavigationState;
