import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, Input, Text } from "@rneui/base";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";

import { RootStackParamList } from "../../App";
import { useCustomSelector } from "../hooks/useCustomSelector";
import { AppDispatch } from "../redux/store";
import { registerUser } from "../redux/userSlice";
import Layout from "../views/LayoutView";

type Props = NativeStackScreenProps<RootStackParamList, "SignUp">;

export default function SignUpComponent({ navigation }: Props) {
  const [user, setUser] = useState<{
    name: string;
    email: string;
    password: string;
    verifyPassword: string;
  }>({
    name: "",
    email: "",
    password: "",
    verifyPassword: "",
  });

  const dispatch = useDispatch<AppDispatch>();
  const status = useCustomSelector((state) => state.user.status);
  const error = useCustomSelector((state) => state.user.error);

  const isLoading = status === "loading";
  const isFailed = status === "failed";

  const handleSignIn = () => {
    navigation.goBack();
  };

  const handleSignUp = () => {
    const { email, password, name } = user;
    dispatch(registerUser({ email, password, name })).then((resultAction) => {
      if (registerUser.fulfilled.match(resultAction)) {
        navigation.replace("Home");
      } else if (registerUser.rejected.match(resultAction)) {
        console.error(resultAction.payload);
      }
    });
  };

  return (
    <Layout>
      <Text h4 style={styles.title}>
        Registro
      </Text>
      <Text>Regístrate para comenzar a usar la aplicación.</Text>
      <View style={styles.container}>
        <Input
          placeholder="Nombre"
          value={user.name}
          onChangeText={(text) => setUser({ ...user, name: text })}
        />
        <Input
          placeholder="Correo electrónico"
          value={user.email}
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={(text) => setUser({ ...user, email: text })}
        />
        <Input
          placeholder="Contraseña"
          value={user.password}
          onChangeText={(text) => setUser({ ...user, password: text })}
          secureTextEntry
        />
        <Input
          placeholder="Verificar contraseña"
          value={user.verifyPassword}
          onChangeText={(text) => setUser({ ...user, verifyPassword: text })}
          secureTextEntry
          errorMessage={
            user.password !== user.verifyPassword
              ? "Las contraseñas no coinciden"
              : ""
          }
          errorProps={{
            visible: user.password !== user.verifyPassword,
          }}
          errorStyle={{
            marginBottom: user.password !== user.verifyPassword ? 20 : 0,
          }}
        />
        {isFailed && <Text style={styles.message}>{error}</Text>}
        <Button
          title="Registrarme"
          disabled={isLoading || user.password !== user.verifyPassword}
          loading={isLoading}
          onPress={handleSignUp}
          loadingProps={{
            color: "blue",
          }}
        />
        <Text h4 style={styles.textO}>
          o
        </Text>
        <Button
          title="Inciar sesión"
          type="clear"
          disabled={isLoading}
          onPress={handleSignIn}
        />
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    marginVertical: 10,
  },
  message: {
    color: "red",
    fontSize: 14,
    marginBottom: 20,
  },
  textO: {
    fontSize: 14,
    marginTop: 10,
    textAlign: "center",
  },
});
