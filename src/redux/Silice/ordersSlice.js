import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartOderApis from "../../apis/cartOderApis";
export const cartOderListSlice = createSlice({
  name: "cartOder",
  initialState: {
    cartOder: [],
    itemsCount:0,
    totalAmount:0,
  },
  reducers: {},
  extraReducers: (builder) => {
    // get api
    builder.addCase(fetchCartOder.fulfilled, (state, action) => {
      state.cartOder = action.payload;
    });
    // add
    builder.addCase(addNewOder.fulfilled, (state, action) => {
       const itemIndex = state.cartOder.findIndex(item => item.id === action.payload.id);
       if(itemIndex>= 0) {
          state.cartOder[itemIndex].cartQuantity += 1
       }else{
        
         const temProduct = {...action.payload, cartQuantity: 1}
           state.cartOder.push(temProduct);
       }

    });
    // // delete
    builder.addCase(deleteOrder.fulfilled, (state, action) => {
      const id = action.payload;
      state.cartOder = state.cartOder.filter((item) => item.id !== id);
    }); 
    // // update
    // builder.addCase(updateUser.fulfilled, (state, action) => {
    //   const itemId = action.payload;
    //   state.users = state.users.filter((item) => item.id !== itemId);
    // });
  },
});
export const fetchCartOder = createAsyncThunk(
  "cartOder/fetchCartOder",
  async () => {
    const res = await cartOderApis.getAll();
    const cartOder = res.data;
    return cartOder;
  }
);
export const addNewOder = createAsyncThunk(
  "cartOder/addNewOder",
  async (newProduct) => {
    const res = await cartOderApis.add(newProduct);
    return res.data;
  }
);
export const updateOder = createAsyncThunk(
  "cartOder/updateOder",
  async (id) => {
    const res = await cartOderApis.update(id);
    return res.data;
  }
);
export const deleteOrder = createAsyncThunk(
  "cartOder/delete",
  async (id) => {
    const res = await cartOderApis.delete(id);
    return res.data;
  }
);
export const deleteListOrder = createAsyncThunk(
  "cartOder/deleteOder",
  async (id) => {
    console.log(id);
    id.map(item=>{
      const res = cartOderApis.delete(item.id)
      return res.data
    })
  }
);