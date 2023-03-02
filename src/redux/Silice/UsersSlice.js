import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userApis from "../../apis/userApis";
export const usersListSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    // get api
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    // add
    builder.addCase(addNewUser.fulfilled, (state, action) => {
      state.users.unshift(action.payload);
    });
    // delete
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      const itemId = action.payload;
      state.users = state.users.filter((item) => item.id !== itemId);
    });
    // update
    builder.addCase(updateUser.fulfilled, (state, action) => {
      // state.users = state.users.filter((data) => data.id !== action.payload.id);
      // state.users.push(action.payload);
      // test
      state.users = state.users.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    });
  },
});

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const res = await userApis.getAll();
  const users = res.data;
  return users;
});
export const addNewUser = createAsyncThunk(
  "users/addNewUser",
  async (newUser) => {
    const res = await userApis.add(newUser);
    const userRes = {
      name: res.data.name,
      id: res.data.id,
      email: res.data.email
    }
    localStorage.setItem("user", JSON.stringify(userRes))
    return res.data;
  }
);
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userID) => {
    const res = await userApis.delete(userID);
    return res.data;
  }
);
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (newUser) => {
    const res = await userApis.update(newUser);
    return res.data;
  }
);
// export const updateUser = createAsyncThunk("users/updateUser", async (user) => {
//   const response = await axios.patch(
//     `http://localhost:9000/users/${user.id}`,
//     user
//   );
//   return response.data;
// });
