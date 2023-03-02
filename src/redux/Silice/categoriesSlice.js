import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import categoriesApis from "../../apis/categoriesApis";
export const categoriesListSlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    // get api
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
    // add;
    builder.addCase(addNewCategories.fulfilled, (state, action) => {
      state.categories.push(action.payload);
    });
    // // // delete
    builder.addCase(deleteCategories.fulfilled, (state, action) => {
      const itemId = action.payload;
      state.categories = state.categories.filter((item) => item.id !== itemId);
    });
    // // update
    // builder.addCase(updateUser.fulfilled, (state, action) => {
    //   const itemId = action.payload;
    //   state.users = state.users.filter((item) => item.id !== itemId);
    // });
  },
});
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const res = await categoriesApis.getAll();
    const categories = res.data;
    return categories;
  }
);
export const addNewCategories = createAsyncThunk(
  "categories/addNewCategories",
  async (newCategory) => {
    const res = await categoriesApis.add(newCategory);
    return res.data;
  }
);
export const deleteCategories = createAsyncThunk(
  "categories/deleteCategories",
  async (categoryID) => {
    const res = await categoriesApis.delete(categoryID);
    return res.data;
  }
);
