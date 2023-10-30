import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, View } from "react-native";

type LayoutProps = {
  children: React.ReactNode;
  style?: StyleSheet.NamedStyles<any>;
};

export default function Layout({ children, style }: LayoutProps) {
  return (
    <>
      <StatusBar style="auto" />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>{children}</View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
});
