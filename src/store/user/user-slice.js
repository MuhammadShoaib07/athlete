import { createSlice, isAsyncThunkAction } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { users: [], editUser: [], count: 0 },
  reducers: {
    setUsers(state, action) {
      const user = action.payload;
      state.users = user;
      state.count = state.users.length;
    },
    editUserByIndex(state, action) {
      debugger;
      const { data } = action.payload;
      const userIndex = data.userIndex;
      const editUserD = data.editUserData;
      state.users[userIndex] = { ...state.users[userIndex], ...editUserD };
    },
    addUser(state, action) {
      const newuser = action.payload;
      state.users.push(newuser);
    },
    deleteUser(state, action) {
      const userIndex = action.payload;
      state.users.splice(userIndex, 1);
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;
