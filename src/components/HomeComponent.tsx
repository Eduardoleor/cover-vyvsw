import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View, Text, Button } from "react-native";
import { useDispatch } from "react-redux";

import { RootStackParamList } from "../../App";
import { AppDispatch } from "../redux/store";
import { logoutUser } from "../redux/userSlice";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeComponent({ navigation }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = async () => {
    dispatch(logoutUser());
    navigation.replace("Auth");
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>HomeComponent1222</Text>
      <Button title="Logout" onPress={() => handleLogout()} />
    </View>
  );
}
