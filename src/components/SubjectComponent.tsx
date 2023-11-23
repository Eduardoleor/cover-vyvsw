import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, Text } from "@rneui/base";
import { useEffect, useMemo, useRef, useState } from "react";
import { Alert, FlatList, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Feather";

import { RootStackParamList } from "../../App";
import useAuth from "../hooks/useAuth";
import { useUserProfile } from "../hooks/useUserProfile";
import Layout from "../views/LayoutView";

type Props = NativeStackScreenProps<RootStackParamList, "OnboardingSubject">;

type Subject = {
  name: string;
  id: string;
};

export default function OnboardingSubject({ navigation, route }: Props) {
  const { updateUserProfile, loading, error } = useUserProfile();
  const { user } = useAuth();

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["35%"], []);

  const [isEditSubject, setIsEditSubject] = useState<boolean>(false);
  const [subjectId, setSubjectId] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [subjects, setSubjects] = useState<Subject[]>([]);

  const handleCloseAddSubject = () => {
    bottomSheetRef.current?.close();
  };

  const handleAddSubject = () => {
    bottomSheetRef.current?.expand();
  };

  const handleAddSubjectConfirm = () => {
    setSubjects((prev) => [...prev, { name: subject, id: Date.now() + "" }]);
    setSubject("");
    handleCloseAddSubject();
  };

  const handleRemoveSubject = (id: string) => {
    setSubjects((prev) => prev.filter((subject) => subject.id !== id));
  };

  const handleOpenEditSubject = ({
    id,
    name,
  }: {
    id: string;
    name: string;
  }) => {
    setIsEditSubject(true);
    setSubject(name);
    setSubjectId(id);
    bottomSheetRef.current?.expand();
  };

  const handleConfirmEditSubject = () => {
    if (subject.length > 0) {
      setSubjects((prevSubjects) =>
        prevSubjects.map((subj) =>
          subj.id === subjectId ? { ...subj, name: subject } : subj,
        ),
      );
      setIsEditSubject(false);
      setSubject("");
      setSubjectId("");
      handleCloseAddSubject();
    }
  };

  const handleCancelEditSubject = () => {
    setIsEditSubject(false);
    setSubject("");
    setSubjectId("");
    handleCloseAddSubject();
  };

  const handleNext = async () => {
    Alert.alert("Confirmación", "¿Estás seguro de continuar?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Continuar",
        onPress: async () => {
          if (user?.uid && subjects.length > 0) {
            try {
              const subjectNames = subjects.map((subject) => subject.name);
              await updateUserProfile(user.uid, {
                universityId: route.params.universityId,
                facultyId: route.params.facultyId,
                subjects: subjectNames,
              });
              navigation.navigate("Home");
            } catch (err) {
              console.log(err);
              Alert.alert(
                "Error",
                "Ocurrió un error al actualizar tu perfil, intenta nuevamente.",
              );
            }
          }
        },
      },
    ]);
  };

  useEffect(() => {
    if (error) {
      Alert.alert("Error", error.message);
    }
  }, [error]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: `${route.params.facultyName} | ${route.params.universityName}`,
    });
  }, []);

  return (
    <Layout>
      <FlatList
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        data={subjects}
        ListHeaderComponent={
          <View style={{ marginBottom: 20 }}>
            <Text h4>Listado de materias</Text>
            <Text style={{ marginTop: 10 }}>
              Selecciona las materias que estás cursando actualmente.
            </Text>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="book-open" size={50} />
            <Text style={styles.textAdd}>
              Agrega materias para completar tu perfil, presionando el botón.
            </Text>
            <Button
              title="Agregar materia"
              buttonStyle={styles.buttonAdd}
              onPress={handleAddSubject}
            />
          </View>
        }
        ListFooterComponent={
          <View style={{ marginTop: 30 }}>
            {subjects?.length > 0 && (
              <Button
                type="clear"
                title="Agregar materia"
                onPress={handleAddSubject}
              />
            )}
          </View>
        }
        renderItem={({ item }) => (
          <View key={item.id} style={styles.containerSubject}>
            <View style={styles.contentSubject}>
              <Icon name="book" size={20} />
              <Text style={styles.textSubject}>{item.name}</Text>
            </View>
            <View style={styles.contentSubjectActiosn}>
              <TouchableOpacity onPress={() => handleRemoveSubject(item.id)}>
                <Icon name="trash" size={20} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleOpenEditSubject(item)}>
                <Icon
                  name="edit"
                  size={20}
                  style={{
                    marginLeft: 10,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      {subjects?.length > 0 && (
        <Button
          title={loading ? "Cargando..." : "Siguiente"}
          loading={loading}
          onPress={handleNext}
          buttonStyle={styles.buttonNext}
          disabled={loading}
          loadingProps={{
            color: "blue",
          }}
        />
      )}
      <BottomSheet
        index={-1}
        keyboardBehavior="fillParent"
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            opacity={0.5}
            enableTouchThrough={false}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
            style={[
              { backgroundColor: "rgba(0, 0, 0, 1)" },
              StyleSheet.absoluteFillObject,
            ]}
          />
        )}
      >
        <View style={styles.containerBottom}>
          <Text h4>Ingrese el nombre de la materia</Text>
          <BottomSheetTextInput
            placeholder="Nombre de la materia"
            value={subject}
            onChangeText={setSubject}
            style={styles.textInput}
          />
          <Button
            title={isEditSubject ? "Editar" : "Agregar"}
            buttonStyle={styles.buttonAddBottom}
            onPress={
              isEditSubject ? handleConfirmEditSubject : handleAddSubjectConfirm
            }
          />
          <Button
            title="Cancelar"
            type="clear"
            onPress={
              isEditSubject ? handleCancelEditSubject : handleCloseAddSubject
            }
            titleStyle={{
              color: "dodgerblue",
            }}
          />
        </View>
      </BottomSheet>
    </Layout>
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    alignItems: "center",
    marginTop: 20,
    justifyContent: "center",
    flex: 1,
  },
  textAdd: {
    marginVertical: 10,
    fontSize: 16,
    textAlign: "center",
  },
  buttonAdd: {
    backgroundColor: "blue",
    borderRadius: 10,
    padding: 10,
    width: 200,
    marginTop: 10,
  },
  containerBottom: {
    flex: 1,
    padding: 24,
    backgroundColor: "white",
  },
  contentContainerBottom: {
    flex: 1,
    alignItems: "center",
  },
  textInput: {
    marginVertical: 20,
    fontSize: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: "gray",
  },
  buttonAddBottom: {
    borderRadius: 10,
    backgroundColor: "dodgerblue",
    marginBottom: 10,
  },
  containerSubject: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "gray",
  },
  contentSubject: {
    flexDirection: "row",
    alignItems: "center",
  },
  textSubject: {
    fontSize: 16,
    marginLeft: 10,
  },
  contentSubjectActiosn: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonNext: {
    borderRadius: 10,
    backgroundColor: "blue",
  },
});
