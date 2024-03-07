import { configureStore } from "@reduxjs/toolkit";
import nodeManagementSlice from "./slices/nodeManagement/nodeManagementSlice";
import authSlice from "./slices/authSlice/authSlice";
import flowManagementSlice from "./slices/flowManagement/flowManagementSlice";
export const store=configureStore({
	reducer:{
		flow:nodeManagementSlice,
		auth:authSlice,
		userFlow:flowManagementSlice
	}
});
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch= typeof store.dispatch;