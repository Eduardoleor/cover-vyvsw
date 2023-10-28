import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";

type LayoutProps = {
  children: React.ReactNode;
  style?: StyleSheet.NamedStyles<any>;
};

export default function Layout({ children, style }: LayoutProps) {
  return (
    <View style={[styles.container, style]}>
      {children}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
});
