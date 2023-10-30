import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ThemeProvider, createTheme, lightColors } from "@rneui/themed";
import { useEffect, useState } from "react";
import { Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";

import { auth } from "./firebaseConfig";
import AuthComponent from "./src/components/AuthComponent";
import HomeComponent from "./src/components/HomeComponent";
import LoadingView from "./src/components/LoadingView";
import SignUpComponent from "./src/components/SignUpComponent";
import store from "./src/redux/store";

export type RootStackParamList = {
  Auth: undefined;
  Home: undefined;
  SignUp: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

const theme = createTheme({
  lightColors: {
    ...Platform.select({
      default: lightColors.platform.android,
      ios: lightColors.platform.ios,
    }),
  },
});

export default function App() {
  const [loading, setLoading] = useState(true);
  const [hasSession, setHasSession] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setHasSession(!!user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return <LoadingView />;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <NavigationContainer>
            <RootStack.Navigator
              initialRouteName={hasSession ? "Home" : "Auth"}
            >
              <RootStack.Screen
                name="Auth"
                component={AuthComponent}
                options={{
                  headerShown: false,
                }}
              />
              <RootStack.Screen
                name="Home"
                component={HomeComponent}
                options={{
                  headerShown: false,
                }}
              />
              <RootStack.Screen
                name="SignUp"
                component={SignUpComponent}
                options={{
                  headerShown: false,
                }}
              />
            </RootStack.Navigator>
          </NavigationContainer>
        </Provider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
