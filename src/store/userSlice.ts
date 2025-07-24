
import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  id: Number;
  name: string;
  lastname: string;
  email: string;
  role: string;
}

const initialValue: UserState = {
  id: 0,
  name: "",
  lastname: "",
  email: "",
  role: "",
};


const userSlice = createSlice({
  name: "user",
  initialState: initialValue,
  reducers: {
    setUserDetails: (state, action) => {
      return { ...state, ...action.payload };
    },
    logout: () => initialValue,
  },
});

export const { setUserDetails, logout } = userSlice.actions;

export default userSlice.reducer;
