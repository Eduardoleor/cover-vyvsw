import { Text } from "@rneui/base";
import { ActivityIndicator, StyleSheet, View } from "react-native";

import Layout from "./LayoutView";

export default function LoadingView() {
  return (
    <Layout>
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.text}>Cargando...</Text>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    marginVertical: 20,
  },
});
