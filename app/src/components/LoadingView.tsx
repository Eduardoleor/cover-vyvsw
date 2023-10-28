import { ActivityIndicator, Text, View } from "react-native";

export default function LoadingView() {
  return (
    <View>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text>Cargando...</Text>
    </View>
  );
}
