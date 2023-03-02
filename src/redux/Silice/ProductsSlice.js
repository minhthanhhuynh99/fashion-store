import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productApis from "../../apis/productApis";
export const productsListSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    // get api
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
    // add
    builder.addCase(addNewProduct.fulfilled, (state, action) => {
      state.products.push(action.payload);
    });
    // // delete
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      const itemId = action.payload;
      state.products = state.products.filter((item) => item.id !== itemId);
    });
    // // update
    // builder.addCase(updateUser.fulfilled, (state, action) => {
    //   const itemId = action.payload;
    //   state.users = state.users.filter((item) => item.id !== itemId);
    // });
  },
});
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const res = await productApis.getAll();
    const products = res.data;
    return products;
  }
);
export const addNewProduct = createAsyncThunk(
  "products/addNewProduct",
  async (newProduct) => {
    const res = await productApis.add(newProduct);
    return res.data;
  }
);
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (productID) => {
    const res = await productApis.delete(productID);
    return res.data;
  }
);
