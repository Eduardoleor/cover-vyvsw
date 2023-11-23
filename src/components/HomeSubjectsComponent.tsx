import { Button, Icon, Text } from "@rneui/base";
import React from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";

type Props = {
  loading: boolean;
  loadingDelete: boolean;
  error: boolean;
  subjects: string[];
  onEmtpyAddSubject: () => void;
  onAddSubject: () => void;
  onEditSubject: (subject: string) => void;
  onDeleteSubject: (subject: string) => void;
  onRefresh: () => void;
};

export default function SubjectsComponent({
  loading,
  loadingDelete,
  error,
  subjects,
  onEmtpyAddSubject,
  onAddSubject,
  onEditSubject,
  onDeleteSubject,
  onRefresh,
}: Props) {
  return (
    <FlatList
      data={subjects}
      keyExtractor={(item) => item}
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      refreshing={loading}
      onRefresh={onRefresh}
      renderItem={({ item }) => (
        <View>
          <View style={styles.containerItem}>
            <Text style={styles.subjectName}>{item}</Text>
            <View style={styles.contentItem}>
              <Icon
                name="edit"
                type="feather"
                style={{ marginRight: 10 }}
                onPress={() => onEditSubject(item)}
              />
              {loadingDelete ? (
                <ActivityIndicator size="small" color="#0000ff" />
              ) : (
                <Icon
                  name="trash-2"
                  type="feather"
                  onPress={() => onDeleteSubject(item)}
                />
              )}
            </View>
          </View>
          <View style={styles.separator} />
        </View>
      )}
      ListHeaderComponent={
        <View style={{ padding: 0 }}>
          {subjects?.length > 0 && (
            <Text style={styles.textTitle}>Listado de materias asignadas.</Text>
          )}
        </View>
      }
      ListFooterComponent={
        <View>
          {subjects?.length > 0 && (
            <Button
              style={{ marginTop: 20 }}
              type="clear"
              title="Agregar materia"
              onPress={onAddSubject}
            />
          )}
        </View>
      }
      ListEmptyComponent={
        <View style={{ flex: 1 }}>
          {!loading && !error && (
            <View style={styles.emptyContainer}>
              <Text style={styles.textEmpty}>
                Aún no tienes materias asignadas, agrega una a tu listado
                presionando el botón de abajo.
              </Text>
              <Icon
                reverse
                size={30}
                name="file-plus"
                type="feather"
                color="blue"
                onPress={onEmtpyAddSubject}
              />
            </View>
          )}
          {loading && (
            <View style={styles.emptyContainer}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          )}
          {!loading && error && (
            <View style={styles.emptyContainer}>
              <Text style={styles.textEmpty}>
                Ocurrió un error al cargar tus materias, intenta más tarde.
              </Text>
            </View>
          )}
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  textEmpty: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 20,
  },
  emptyContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  subjectName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  facultyName: {
    fontSize: 14,
  },
  universityName: {
    fontSize: 12,
  },
  containerItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  contentItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  separator: {
    borderBottomColor: "#e2e2e2",
    borderBottomWidth: 1,
  },
  textTitle: {
    fontSize: 16,
    marginTop: 20,
    marginBottom: 10,
  },
});
