import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ThemeProvider, createTheme, lightColors } from "@rneui/themed";
import { useEffect, useState } from "react";
import { Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";

import { auth } from "./firebaseConfig";
import AuthComponent from "./src/components/AuthComponent";
import FacultyComponent from "./src/components/FacultyComponent";
import HomeComponent from "./src/components/HomeComponent";
import SignUpComponent from "./src/components/SignUpComponent";
import OnboardingSubject from "./src/components/SubjectComponent";
import UniversityComponent from "./src/components/UniversityComponent";
import store from "./src/redux/store";
import LoadingView from "./src/views/LoadingView";

export type RootStackParamList = {
  Auth: undefined;
  Home: undefined;
  SignUp: undefined;
  OnboardingUniversity: undefined;
  OnboardingFaculty: {
    universityId: string;
    universityName: string;
  };
  OnboardingSubject: {
    universityId: string;
    universityName: string;
    facultyId: string;
    facultyName: string;
  };
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
    <GestureHandlerRootView style={{ flex: 1 }}>
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
                    headerTitle: "",
                    headerBackTitle: "Atrás",
                  }}
                />
                <RootStack.Screen
                  name="OnboardingUniversity"
                  component={UniversityComponent}
                  options={{
                    headerTitle: "",
                    headerBackTitle: "Atrás",
                  }}
                />
                <RootStack.Screen
                  name="OnboardingFaculty"
                  component={FacultyComponent}
                  options={{
                    headerTitle: "",
                    headerBackTitle: "Atrás",
                  }}
                />
                <RootStack.Screen
                  name="OnboardingSubject"
                  component={OnboardingSubject}
                  options={{
                    headerTitle: "",
                    headerBackTitle: "Atrás",
                  }}
                />
              </RootStack.Navigator>
            </NavigationContainer>
          </Provider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
