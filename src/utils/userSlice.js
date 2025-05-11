import { createSlice } from "@reduxjs/toolkit";
import { dummyUsers } from "./constants";

const initialState = {
  users: dummyUsers,
  globalFilter: "", // For global filtering
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setGlobalFilter: (state, action) => {
      state.globalFilter = action.payload;
    },
    addUser: (state, action) => {
      state.users.push(action.payload); // Add the new user to the users array
    },
    updateUser: (state, action) => {
      const updatedUser = action.payload;
      const index = state.users.findIndex((user) => user.id === updatedUser.id);
      if (index !== -1) {
        state.users[index] = updatedUser;
      }
    },
  },
});

export const { setGlobalFilter, addUser, updateUser } = userSlice.actions;

export default userSlice.reducer;
