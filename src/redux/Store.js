import { configureStore } from "@reduxjs/toolkit";
import { menuItemApiSlice } from "./slices/api/menuItem.api.slice";
import { userApiSlice } from "./slices/api/user.api.slice";
import { orderApiSlice } from "./slices/api/order.api.slice";
import { adminApiSlice } from "./slices/api/admin.api.slice";
import cartReducer from "./slices/state/cart.slice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [menuItemApiSlice.reducerPath]: menuItemApiSlice.reducer,
    [userApiSlice.reducerPath]: userApiSlice.reducer,
    [orderApiSlice.reducerPath]: orderApiSlice.reducer,
    [adminApiSlice.reducerPath]: adminApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      menuItemApiSlice.middleware,
      userApiSlice.middleware,
      orderApiSlice.middleware,
      adminApiSlice.middleware
    ),
});
