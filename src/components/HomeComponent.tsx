import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View, Text, Button } from "react-native";

import { RootStackParamList } from "../../App";
import { logoutUser } from "../redux/userSlice";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeComponent({ navigation }: Props) {
  const handleLogout = async () => {
    await logoutUser();
    navigation.replace("Auth");
  };

  return (
    <View>
      <Text>HomeComponent</Text>
      <Button title="Logout" onPress={() => handleLogout()} />
    </View>
  );
}
