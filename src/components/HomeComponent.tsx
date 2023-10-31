import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Avatar, Text } from "@rneui/base";
import React from "react";
import { ActivityIndicator, Alert, StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";

import SubjectsComponent from "./SubjectsComponent";
import { RootStackParamList } from "../../App";
import useUserInfo from "../hooks/useUserInfo";
import { AppDispatch } from "../redux/store";
import { logoutUser } from "../redux/userSlice";
import { getTwoLetterInitials } from "../utils/profile";
import Layout from "../views/LayoutView";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeComponent({ navigation }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, userInfo } = useUserInfo();

  const handleLogout = async () => {
    Alert.alert("Cerrar sesión", "¿Estás seguro?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Sí",
        onPress: () => {
          dispatch(logoutUser());
          navigation.replace("Auth");
        },
      },
    ]);
  };

  const handleAddSubject = () => {
    navigation.navigate("Onboarding");
  };

  return (
    <Layout>
      <View style={styles.header}>
        <Text h4>Bienvenido, {userInfo?.displayName}</Text>
        <Avatar
          size={32}
          rounded
          title={getTwoLetterInitials(userInfo?.displayName ?? "")}
          containerStyle={{ backgroundColor: "blue" }}
          onPress={handleLogout}
        />
      </View>
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator size="large" color="blue" />
        ) : (
          <SubjectsComponent
            subjects={userInfo?.subjects ?? []}
            onAddSubject={handleAddSubject}
          />
        )}
      </View>
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
});
