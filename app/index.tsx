import { router } from "expo-router";
import { useEffect } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

import ErrorView from "./src/components/ErrorView";
import Layout from "./src/components/Layout";
import LoadingView from "./src/components/LoadingView";
import { NAVIGATIONS_ROUTES } from "./src/constants/navigation";
import useNavigationState from "./src/hooks/useNavigationState";
import useSession from "./src/hooks/useSession";

export default function App() {
  const { isReadyNavigation } = useNavigationState();
  const { userHasSession, loading, error } = useSession();

  useEffect(() => {
    if (isReadyNavigation && !loading && !error) {
      userHasSession && router.replace(NAVIGATIONS_ROUTES.HOME);
    }
  }, [isReadyNavigation]);

  if (loading) {
    return <LoadingView />;
  }

  if (error) {
    return <ErrorView />;
  }

  return (
    <Layout>
      <View style={{ flex: 1 }}>
        <Text>Bievenido</Text>
        <Text>
          Ingresa a tu cuenta o registrate para comenzar a usar la app.
        </Text>
        <View style={styles.content}>
          <TextInput placeholder="Usuario" />
          <TextInput placeholder="Contraseña" />
          <Button title="Ingesar" />
          <Text>o</Text>
          <Button title="Registrarse" />
        </View>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
