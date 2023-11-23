import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Card, Image, Text } from "@rneui/base";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

import { RootStackParamList } from "../../App";
import { useUniversities } from "../hooks/useUniversities";
import Layout from "../views/LayoutView";

type Props = NativeStackScreenProps<RootStackParamList, "OnboardingUniversity">;

export default function UniversityComponent({ navigation }: Props) {
  const { loading, universities, reloadUniversities } = useUniversities();

  const handleSelectUniverity = ({
    id,
    name,
  }: {
    id: string;
    name: string;
  }) => {
    navigation.navigate("OnboardingFaculty", {
      universityId: id,
      universityName: name,
    });
  };

  return (
    <Layout>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      )}
      {!loading && (
        <FlatList
          data={universities}
          keyExtractor={(item) => item.id}
          refreshing={loading}
          onRefresh={reloadUniversities}
          ListHeaderComponent={
            <View>
              <Text h4>Listado de universidades</Text>
              <Text style={{ marginTop: 10 }}>
                Selecciona la universidad a la que perteneces para continuar con
                tu registro.
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                handleSelectUniverity({
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
                No hay universidades registradas, contacta al administrador.
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
