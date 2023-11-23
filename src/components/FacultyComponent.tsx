import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Card, Image, Text } from "@rneui/base";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

import { RootStackParamList } from "../../App";
import { useFaculties } from "../hooks/useFaculties";
import Layout from "../views/LayoutView";

type Props = NativeStackScreenProps<RootStackParamList, "OnboardingFaculty">;

export default function FacultyComponent({ navigation, route }: Props) {
  const { universityId, universityName } = route?.params;
  const { loading, faculties, reloadFaculties } = useFaculties(universityId);

  const handleSelectFaculty = ({ id, name }: { id: string; name: string }) => {
    navigation.navigate("OnboardingSubject", {
      universityId,
      universityName,
      facultyId: id,
      facultyName: name,
    });
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: `${universityName}`,
    });
  }, []);

  return (
    <Layout>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      )}
      {!loading && (
        <FlatList
          data={faculties}
          keyExtractor={(item) => item.id}
          refreshing={loading}
          onRefresh={reloadFaculties}
          ListHeaderComponent={
            <View>
              <Text h4>Listado de facultades</Text>
              <Text style={{ marginTop: 10 }}>
                Selecciona la facultad a la que perteneces para continuar con tu
                registro.
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                handleSelectFaculty({
                  id: item.id,
                  name: item.shortName,
                })
              }
            >
              <Card containerStyle={styles.cardContainer}>
                <Text style={styles.cardTitle}>{item.shortName}</Text>
                <Text>{item.name}</Text>
                <View style={styles.cardContent}>
                  <Image
                    source={{ uri: item.logo }}
                    alt={item.name}
                    style={styles.cardImage}
                  />
                </View>
              </Card>
            </TouchableOpacity>
          )}
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Icon name="alert-circle" size={30} />
              <Text style={styles.emptyText}>
                No hay facultades registradas, contacta al administrador.
              </Text>
            </View>
          }
        />
      )}
    </Layout>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 10,
  },
  cardContainer: {
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.8)",
    marginTop: 30,
  },
  cardTitle: {
    fontSize: 18,
    marginVertical: 10,
    fontWeight: "bold",
  },
  cardContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  cardImage: {
    width: 200,
    height: 150,
    resizeMode: "contain",
  },
});
