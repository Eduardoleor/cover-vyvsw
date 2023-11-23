import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, Input, Text } from "@rneui/base";
import React, { useCallback, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useDispatch } from "react-redux";

import { RootStackParamList } from "../../App";
import { useCustomSelector } from "../hooks/useCustomSelector";
import { AppDispatch } from "../redux/store";
import { registerUser } from "../redux/userSlice";
import { isValidEmail } from "../utils/email";
import { isValidPassword } from "../utils/password";
import Layout from "../views/LayoutView";

type Props = NativeStackScreenProps<RootStackParamList, "SignUp">;

export default function SignUpComponent({ navigation }: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [user, setUser] = useState<{
    name: string;
    enrollment: string;
    email: string;
    password: string;
    verifyPassword: string;
  }>({
    name: "",
    enrollment: "",
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
    const { email, enrollment, password, name } = user;
    dispatch(registerUser({ email, enrollment, password, name })).then(
      (resultAction) => {
        if (registerUser.fulfilled.match(resultAction)) {
          navigation.replace("Home", { refresh: true });
        } else if (registerUser.rejected.match(resultAction)) {
          console.error(resultAction.payload);
        }
      },
    );
  };

  const isValidForm = useCallback(() => {
    return (
      user.name !== "" &&
      user.enrollment !== "" &&
      isValidEmail(user.email) &&
      isValidPassword(user.password) &&
      user.verifyPassword !== "" &&
      user.password === user.verifyPassword
    );
  }, [user, isValidEmail, isValidPassword]);

  return (
    <Layout>
      <Text h4 style={styles.title}>
        Registro
      </Text>
      <Text>Regístrate para comenzar a usar la aplicación.</Text>
      <View style={styles.container}>
        <Input
          placeholder="Nombre completo"
          value={user.name}
          onChangeText={(text) => setUser({ ...user, name: text })}
        />
        <Input
          placeholder="Matrícula"
          value={user.enrollment}
          onChangeText={(text) => setUser({ ...user, enrollment: text })}
        />
        <Input
          placeholder="Correo electrónico"
          value={user.email}
          keyboardType="email-address"
          autoCapitalize="none"
          errorMessage={emailError}
          onChangeText={(text) => {
            setUser({ ...user, email: text });
            setEmailError(
              isValidEmail(text) ? "" : "El correo electrónico no es válido",
            );
          }}
        />
        <Input
          placeholder="Contraseña"
          value={user.password}
          secureTextEntry={!showPassword}
          errorMessage={passwordError}
          onChangeText={(text) => {
            setUser({ ...user, password: text });
            setPasswordError(
              isValidPassword(text)
                ? ""
                : "La contraseña debe ser alfanumérica y tener al menos 6 caracteres",
            );
          }}
          rightIcon={
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <Icon
                  name="eye"
                  size={20}
                  onPress={() => setShowPassword(!showPassword)}
                />
              ) : (
                <Icon
                  name="eye-slash"
                  size={20}
                  onPress={() => setShowPassword(!showPassword)}
                />
              )}
            </TouchableOpacity>
          }
        />
        <Input
          placeholder="Verificar contraseña"
          value={user.verifyPassword}
          onChangeText={(text) => setUser({ ...user, verifyPassword: text })}
          secureTextEntry={!showPasswordRepeat}
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
          rightIcon={
            <TouchableOpacity
              onPress={() => setShowPasswordRepeat(!showPasswordRepeat)}
            >
              {showPasswordRepeat ? (
                <Icon
                  name="eye"
                  size={20}
                  onPress={() => setShowPasswordRepeat(!showPasswordRepeat)}
                />
              ) : (
                <Icon
                  name="eye-slash"
                  size={20}
                  onPress={() => setShowPasswordRepeat(!showPasswordRepeat)}
                />
              )}
            </TouchableOpacity>
          }
        />
        {isFailed && <Text style={styles.message}>{error}</Text>}
        <Button
          title="Registrarme"
          disabled={isLoading || !isValidForm()}
          loading={isLoading}
          onPress={handleSignUp}
          loadingProps={{
            color: "blue",
          }}
          buttonStyle={{
            backgroundColor: "blue",
            borderRadius: 10,
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
          titleStyle={{
            color: "blue",
          }}
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
