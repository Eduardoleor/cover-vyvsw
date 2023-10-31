import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import { RootState } from "./store";
import { auth, db } from "../../firebaseConfig";

export interface UserState {
  user: UserCredential | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UserState = {
  user: null,
  status: "idle",
  error: null,
};

export const registerUser = createAsyncThunk<
  UserCredential,
  { name: string; email: string; password: string }
>("user/register", async ({ name, email, password }, { rejectWithValue }) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await updateProfile(userCredential.user, {
      displayName: name,
    });

    const user = userCredential.user;
    const userDocRef = doc(db, "users", user.uid);
    await setDoc(userDocRef, {
      displayName: name,
      email: user.email,
      uid: user.uid,
      subjects: [],
      university: "",
      enrollment: "",
    });

    return userCredential;
  } catch (error: any) {
    console.log(error);
    let errorMessage = "An error occurred during registration."; // Default error message

    if (error.code === "auth/email-already-in-use") {
      errorMessage = "El correo electrónico ya está en uso.";
    } else if (error.code === "auth/invalid-email") {
      errorMessage = "El correo electrónico no es válido.";
    } else if (error.code === "auth/weak-password") {
      errorMessage = "La contraseña debe tener al menos 6 caracteres.";
    }

    return rejectWithValue(errorMessage);
  }
});

export const loginUser = createAsyncThunk<
  UserCredential,
  { email: string; password: string }
>("user/login", async ({ email, password }, { rejectWithValue }) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential;
  } catch (error: any) {
    let errorMessage = "An error occurred during login."; // Default error message

    if (error.code === "auth/invalid-email") {
      errorMessage = "El correo electrónico no es válido.";
    } else if (
      error.code === "auth/user-not-found" ||
      error.code === "auth/wrong-password"
    ) {
      errorMessage = "El correo electrónico o la contraseña son incorrectos";
    }

    return rejectWithValue(errorMessage);
  }
});

export const logoutUser = createAsyncThunk<void, void>(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const resetStatus = createAsyncThunk<void, void>(
  "user/resetStatus",
  async () => {}
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logoutUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "succeeded";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "succeeded";
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.status = "succeeded";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(resetStatus.fulfilled, (state) => {
        state.status = "idle";
        state.error = null;
      });
  },
});

export default userSlice.reducer;

export const selectUser = (state: RootState) => state.user.user;
