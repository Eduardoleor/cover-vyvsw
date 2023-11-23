import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import { useIsFocused } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Avatar, Button, Text } from "@rneui/base";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";

import HomeSubjectsComponent from "./HomeSubjectsComponent";
import { RootStackParamList } from "../../App";
import { useSubjects } from "../hooks/useSubjects";
import useUserInfo from "../hooks/useUserInfo";
import { AppDispatch } from "../redux/store";
import { logoutUser } from "../redux/userSlice";
import { getTwoLetterInitials } from "../utils/profile";
import { findFirstName } from "../utils/text";
import Layout from "../views/LayoutView";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeComponent({ navigation }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const isFocused = useIsFocused();

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["35%"], []);

  const { loading, error, userInfo, refetchUserInfo } = useUserInfo();
  const { removeSubjects, removeSubject, editSubject } = useSubjects();

  const [loadingDelete, setLoadingDelete] = useState(false);
  const [olderSubect, setOlderSubject] = useState("");
  const [subjectUpdate, setSubjectUpdate] = useState("");
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  const handleLogout = async () => {
    Alert.alert("Menu de opciones", "", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Cerrar sesión",
        onPress: () => {
          dispatch(logoutUser());
          navigation.replace("Auth");
        },
      },
      {
        text: "Eliminar listado de materias",
        onPress: () => {
          removeSubjects(userInfo?.uid ?? "");
          refetchUserInfo();
        },
      },
    ]);
  };

  const handleEmptyAddSubject = () => {
    navigation.navigate("OnboardingUniversity");
  };

  const handleAddSubject = () => {
    navigation.navigate("OnboardingSubject", {
      universityId: userInfo?.universityId ?? "",
      universityName: "",
      facultyId: userInfo?.facultyId ?? "",
      facultyName: "",
    });
  };

  const handleOpenEditSubject = (subject: string) => {
    bottomSheetRef.current?.expand();
    setOlderSubject(subject);
    setSubjectUpdate(subject);
  };

  const handleEditSubject = () => {
    setLoadingUpdate(true);
    editSubject(userInfo?.uid ?? "", olderSubect, subjectUpdate).finally(() => {
      refetchUserInfo();
      setLoadingUpdate(false);
      bottomSheetRef.current?.close();
      setSubjectUpdate("");
      setOlderSubject("");
    });
  };

  const handleDeleteSubject = (subject: string) => {
    setLoadingDelete(true);
    removeSubject(userInfo?.uid ?? "", subject).finally(() => {
      refetchUserInfo();
      setLoadingDelete(false);
    });
  };

  useEffect(() => {
    if (isFocused) refetchUserInfo();
  }, [isFocused]);

  return (
    <Layout>
      <View style={styles.header}>
        <Text h4>
          Bienvenido, {findFirstName(userInfo?.displayName ?? "")}.
        </Text>
        <>
          {loading ? (
            <ActivityIndicator size="small" color="#0000ff" />
          ) : (
            <Avatar
              size={32}
              rounded
              title={getTwoLetterInitials(userInfo?.displayName ?? "")}
              containerStyle={{ backgroundColor: "blue" }}
              onPress={handleLogout}
            />
          )}
        </>
      </View>
      <View style={styles.content}>
        <HomeSubjectsComponent
          loading={loading}
          loadingDelete={loadingDelete}
          error={Boolean(error)}
          subjects={userInfo?.subjects ?? []}
          onEmtpyAddSubject={handleEmptyAddSubject}
          onAddSubject={handleAddSubject}
          onRefresh={refetchUserInfo}
          onDeleteSubject={handleDeleteSubject}
          onEditSubject={handleOpenEditSubject}
        />
      </View>
      {!loading && !error && !!userInfo?.subjects?.length && (
        <Button
          title="Crear portada"
          buttonStyle={{
            backgroundColor: "blue",
            borderRadius: 10,
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
          <Text h4>Editar materia: </Text>
          <BottomSheetTextInput
            placeholder="Nombre de la materia"
            value={subjectUpdate}
            onChangeText={setSubjectUpdate}
            style={styles.textInput}
          />
          <Button
            buttonStyle={styles.buttonAddBottom}
            title={loadingUpdate ? "Cargando..." : "Editar materia"}
            disabled={loadingUpdate || !subjectUpdate.length}
            loading={loadingUpdate}
            onPress={() => handleEditSubject()}
            loadingProps={{ color: "blue" }}
          />
          <Button
            title="Cancelar"
            type="clear"
            disabled={loadingUpdate}
            onPress={() => {
              bottomSheetRef.current?.close();
              setSubjectUpdate("");
              setOlderSubject("");
            }}
          />
        </View>
      </BottomSheet>
    </Layout>
  );
}

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  content: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
  },
  containerBottom: {
    flex: 1,
    padding: 24,
    backgroundColor: "white",
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
});
