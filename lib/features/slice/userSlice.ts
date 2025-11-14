import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id: string | null;
  name: string | null;
  last_name: string | null;
  email: string | null;
  image?: string | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  id: null,
  name: null,
  last_name: null,
  email: null,
  image: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        id: string;
        name: string;
        last_name?: string;
        email: string;
        image?: string;
      }>
    ) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.last_name = action.payload.last_name ?? null;
      state.email = action.payload.email;
      state.image = action.payload.image;
      state.isAuthenticated = true;
    },
    clearUser: (state) => {
      state.id = null;
      state.name = null;
      state.last_name = null;
      state.email = null;
      state.image = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
