import { Icon, Text } from "@rneui/base";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";

type Props = {
  subjects: string[];
  onAddSubject: () => void;
  onRefresh: () => void;
  isRefreshing: boolean;
};

export default function SubjectsComponent({
  subjects,
  onAddSubject,
  onRefresh,
  isRefreshing,
}: Props) {
  return (
    <FlatList
      data={[]}
      renderItem={({ item }) => <></>}
      keyExtractor={(item) => item.id}
      refreshing={isRefreshing}
      onRefresh={onRefresh}
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      ListEmptyComponent={
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
            onPress={onAddSubject}
          />
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
});
