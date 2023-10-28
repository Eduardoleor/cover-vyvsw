import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as SecureStore from "expo-secure-store";
import { SECURITY_STORAGE_SESSION } from "./src/constants/storage";
import LoadingView from "./src/components/LoadingView";
import ErrorView from "./src/components/ErrorView";

export default function App() {
  const [userHasSession, setUserHasSession] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

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
    if (userHasSession && !loading && !error) {
      console.log("here");
    }
  }, []);

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
