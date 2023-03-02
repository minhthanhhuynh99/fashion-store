import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import checkOutApis from "../../apis/checkOutApis";
export const checkOutListSlice = createSlice({
  name: "checkOut",
  initialState: {
    checkOut: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    // get api
    builder.addCase(fetchCheckOut.fulfilled, (state, action) => {
      state.checkOut = action.payload;
    });
    // add
    builder.addCase(addCheckOut.fulfilled, (state, action) => {
      state.checkOut.push(action.payload);
    });
    // // delete
    builder.addCase(deleteCheckOut.fulfilled, (state, action) => {
      const itemId = action.payload;
      state.checkOut = state.oderUser.filter((item) => item.id !== itemId);
    });
    // // update
    // builder.addCase(updateUser.fulfilled, (state, action) => {
    //   const itemId = action.payload;
    //   state.users = state.users.filter((item) => item.id !== itemId);
    // });
  },
});
export const fetchCheckOut = createAsyncThunk(
  "checkOut/fetchCheckOut",
  async () => {
    const res = await checkOutApis.getAll();
    const checkOut = res.data;
    return checkOut;
  }
);
export const addCheckOut = createAsyncThunk(
  "checkOut/addNewOrderUser",
  async (newCheckOut) => {
    const res = await checkOutApis.add(newCheckOut);
    return res.data;
  }
);
export const deleteCheckOut = createAsyncThunk(
  "checkOut/deleteCheckOut",
  async (id) => {
    const res = await checkOutApis.delete(id);
    return res.data;
  }
);