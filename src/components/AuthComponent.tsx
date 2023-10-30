import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native"; // Import View, Text, TextInput, and Button
import { useDispatch } from "react-redux";

import { RootStackParamList } from "../../App";
import { useCustomSelector } from "../hooks/useCustomSelector";
import { AppDispatch } from "../redux/store";
import { loginUser, logoutUser } from "../redux/userSlice";

type Props = NativeStackScreenProps<RootStackParamList, "Auth">;

function AuthComponent({ navigation }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const user = useCustomSelector((state) => state.user.user);
  const status = useCustomSelector((state) => state.user.status);
  const error = useCustomSelector((state) => state.user.error);

  const handleRegister = () => {
    navigation.navigate("SignUp");
  };

  const handleLogin = () => {
    dispatch(loginUser({ email, password })).then((resultAction) => {
      if (loginUser.fulfilled.match(resultAction)) {
        navigation.navigate("Home");
      }
    });
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <View>
      {status === "loading" && <Text>Loading...</Text>}
      {status === "failed" && <Text>Error: {error}</Text>}
      {user ? (
        <View>
          <Text>Welcome, {user.user?.email}!</Text>
          <Button title="Logout" onPress={handleLogout} />
        </View>
      ) : (
        <View>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <Button title="Register" onPress={handleRegister} />
          <Button title="Login" onPress={handleLogin} />
        </View>
      )}
    </View>
  );
}

export default AuthComponent;
