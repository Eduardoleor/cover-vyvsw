import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  getAuth,
  getReactNativePersistence,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC-B0rP_stCJK0Nkk1VaxSvkCNq-Bu10ho",
  authDomain: "mobileapps-leal.firebaseapp.com",
  databaseURL: "https://mobileapps-leal.firebaseio.com",
  projectId: "mobileapps-leal",
  storageBucket: "mobileapps-leal.appspot.com",
  messagingSenderId: "866747943487",
  appId: "1:866747943487:web:2ae4c3a979b382aa73868a",
  measurementId: "G-9DZ80XNYXR",
};
const app = initializeApp(firebaseConfig);

initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export const auth = getAuth(app);

export default app;
