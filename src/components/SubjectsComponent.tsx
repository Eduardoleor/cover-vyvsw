import { Icon, Text } from "@rneui/base";
import React from "react";
import { StyleSheet, View } from "react-native";

type Props = {
  subjects: string[];
  onAddSubject: () => void;
};

export default function SubjectsComponent({ subjects, onAddSubject }: Props) {
  return (
    <View>
      {!subjects?.length ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.textEmpty}>
            Aún no tienes materias asignadas, agrega una a tu listado.
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
      ) : (
        <Text>SubjectsComponent</Text>
      )}
    </View>
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
  },
});
