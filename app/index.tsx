import { router, useRootNavigationState } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import ErrorView from "./src/components/ErrorView";
import LoadingView from "./src/components/LoadingView";
import { SECURITY_STORAGE_SESSION } from "./src/constants/storage";

export default function App() {
  const [userHasSession, setUserHasSession] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    SecureStore.getItemAsync(SECURITY_STORAGE_SESSION)
      .then((value) => {
        if (value) {
          setUserHasSession(true);
        }
        setUserHasSession(false);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!rootNavigationState?.key) {
      return;
    }

    if (userHasSession && !loading && !error) {
      router.replace("home");
    }
  }, [rootNavigationState]);

  return (
    <View style={styles.container}>
      {loading && <LoadingView />}
      {error && <ErrorView />}
      {!loading && !error && <Text>Bienvenido</Text>}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
