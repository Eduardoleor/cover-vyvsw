import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, Input, Text } from "@rneui/base";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useDispatch } from "react-redux";

import { RootStackParamList } from "../../App";
import { useCustomSelector } from "../hooks/useCustomSelector";
import { AppDispatch } from "../redux/store";
import { loginUser, resetStatus } from "../redux/userSlice";
import Layout from "../views/LayoutView";

type Props = NativeStackScreenProps<RootStackParamList, "Auth">;

export default function AuthComponent({ navigation }: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState<{
    email: string;
    password: string;
  }>({ email: "", password: "" });

  const dispatch = useDispatch<AppDispatch>();
  const status = useCustomSelector((state) => state.user.status);
  const error = useCustomSelector((state) => state.user.error);

  const isLoading = status === "loading";
  const isFailed = status === "failed";

  const handleSignIn = () => {
    const { email, password } = user;
    dispatch(loginUser({ email, password })).then((resultAction) => {
      if (loginUser.fulfilled.match(resultAction)) {
        navigation.replace("Home", { refresh: true });
      }
    });
  };

  const handleSignUp = () => {
    dispatch(resetStatus());
    setUser({ email: "", password: "" });
    navigation.navigate("SignUp");
  };

  return (
    <Layout>
      <Text h4 style={styles.title}>
        Bienvenido
      </Text>
      <Text>
        Inicia sesión o crea una cuenta para comenzar a usar la aplicación.
      </Text>
      <View style={styles.container}>
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
          secureTextEntry={!showPassword}
          rightIcon={
            <Icon
              name={!showPassword ? "eye-slash" : "eye"}
              size={20}
              onPress={() => setShowPassword(!showPassword)}
            />
          }
        />
        {isFailed && <Text style={styles.message}>{error}</Text>}
        <Button
          title="Iniciar sesión"
          disabled={isLoading}
          loading={isLoading}
          onPress={handleSignIn}
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
          title="Registrarse"
          type="clear"
          disabled={isLoading}
          onPress={handleSignUp}
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
