import { configureStore } from "@reduxjs/toolkit";
import { categoriesListSlice } from "./Silice/categoriesSlice";
import { cartOderListSlice } from "./Silice/ordersSlice";
import { productsListSlice } from "./Silice/ProductsSlice";
import { usersListSlice } from "./Silice/UsersSlice";
import { checkOutListSlice } from "./Silice/checkOutSlice";
import countListSlice from "./Silice/count";


export const store = configureStore({
  reducer: {
    userList: usersListSlice.reducer,
    productList: productsListSlice.reducer,
    categoriestList: categoriesListSlice.reducer,
    orderList: cartOderListSlice.reducer,
    checkOutList: checkOutListSlice.reducer,
    countList: countListSlice.reducer
  },
});
