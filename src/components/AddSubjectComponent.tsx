import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, Text } from "@rneui/base";
import { Input } from "@rneui/themed";
import React, { useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { RootStackParamList } from "../../App";
import useUpdateUserFirestore from "../hooks/useUpdateUserFirestore";
import Layout from "../views/LayoutView";

type Props = NativeStackScreenProps<RootStackParamList, "AddSubject">;

export default function AddSubjectComponent({ navigation, route }: Props) {
  const [subject, setSubject] = useState<string>("");
  const [enrollment, setEnrollment] = useState<string>("");
  const [subjects, setSubjects] = useState<string[]>([]);

  const { loading, updateUserFirestore } = useUpdateUserFirestore();

  const handleAddSubject = () => {
    if (subject.length > 0) {
      setSubjects([...subjects, subject]);
      setSubject("");
    } else {
      alert("Ingresa una materia");
    }
  };

  const handleRemoveSubject = (index: number) => {
    const updatedSubjects = [...subjects];
    updatedSubjects.splice(index, 1);
    setSubjects(updatedSubjects);
  };

  const handleContinue = () => {
    if (subjects.length > 0) {
      if (enrollment.length > 5) {
        updateUserFirestore({
          enrollment,
          subjects,
          university: route.params.universityId,
        })
          .then(() => {
            alert("Materias agregadas correctamente");
            navigation.navigate("Home");
          })
          .catch(() => {
            alert("Ocurrio un error al agregar las materias");
          });
      } else {
        alert("Ingresa una matricula valida");
      }
    } else {
      alert("Ingresa al menos una materia");
    }
  };

  return (
    <Layout>
      <Text h4>
        Agrega las materias que cursas este semestre en la facultad{" "}
        {route.params.universityName}.
      </Text>
      <View style={styles.input}>
        <Input
          placeholder="Matricula"
          leftIcon={{ type: "feather", name: "user" }}
          value={enrollment}
          onChangeText={(text) => setEnrollment(text)}
          clearButtonMode="always"
        />
      </View>
      <View style={styles.actionContainer}>
        <Input
          value={subject}
          clearButtonMode="always"
          style={styles.input}
          placeholder="Ingresa una materia"
          onChangeText={(text) => setSubject(text)}
        />
        <Button type="clear" title="Agregar" onPress={handleAddSubject} />
      </View>
      <FlatList
        data={subjects}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.subjectItem}>
            <Text style={styles.subjectTitle}>{item}</Text>
            <TouchableOpacity onPress={() => handleRemoveSubject(index)}>
              <Text style={styles.removeButton}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
      <Button
        title="Agregar"
        loading={loading}
        disabled={loading}
        loadingProps={{
          color: "blue",
        }}
        onPress={handleContinue}
      />
    </Layout>
  );
}

const styles = StyleSheet.create({
  input: {
    marginTop: 20,
  },
  separator: {
    height: 1,
    backgroundColor: "lightgray",
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    marginBottom: 20,
  },
  subjectTitle: {
    fontSize: 16,
    marginBottom: 8,
  },
  subjectItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
  },
  removeButton: {
    color: "red",
  },
});
