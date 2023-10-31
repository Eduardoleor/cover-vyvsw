import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Image, Text } from "@rneui/base";
import React from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import { RootStackParamList } from "../../App";
import useUniversities from "../hooks/useUniversities";
import Layout from "../views/LayoutView";

type Props = NativeStackScreenProps<RootStackParamList, "Onboarding">;

export default function OnboardingComponent({ navigation }: Props) {
  const { loading, universities } = useUniversities();

  const handleUniversityPress = ({
    name,
    id,
  }: {
    name: string;
    id: string;
  }) => {
    Alert.alert("Facultad seleccionada", name, [
      {
        text: "Continuar",
        onPress: () => {
          navigation.push("AddSubject", {
            universityId: id,
            universityName: name,
          });
        },
      },
      {
        text: "Cancelar",
        style: "cancel",
      },
    ]);
  };

  return (
    <Layout>
      <Text h4>Antes de comenzar, selecciona tu universidad.</Text>
      {loading && (
        <View style={styles.loadingContent}>
          <Text style={styles.loadingText}>Cargando universidades...</Text>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
      {!loading && (
        <FlatList
          data={universities}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                handleUniversityPress({
                  name: item.name,
                  id: item.id,
                })
              }
            >
              <View style={styles.itemContent}>
                <Image
                  source={{ uri: item.cover }}
                  width={100}
                  height={150}
                  containerStyle={{ aspectRatio: 1, width: "50%", flex: 1 }}
                  PlaceholderContent={
                    <ActivityIndicator size="large" color="#0000ff" />
                  }
                  placeholderStyle={{
                    backgroundColor: "white",
                  }}
                />
                <Image
                  source={{ uri: item.logo }}
                  containerStyle={{ aspectRatio: 0.9, width: "50%", flex: 1 }}
                  PlaceholderContent={
                    <ActivityIndicator size="large" color="#0000ff" />
                  }
                  placeholderStyle={{
                    backgroundColor: "white",
                  }}
                />
              </View>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}
    </Layout>
  );
}

const styles = StyleSheet.create({
  loadingContent: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    marginVertical: 20,
  },
  itemContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 20,
  },
  separator: {
    height: 1,
    backgroundColor: "lightgray",
  },
});
