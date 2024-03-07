import { configureStore } from "@reduxjs/toolkit";
import nodeManagementSlice from "./slices/nodeManagement/nodeManagementSlice";
import authSlice from "./slices/authSlice/authSlice";
export const store=configureStore({
	reducer:{
		flow:nodeManagementSlice,
		auth:authSlice,
	}
});
export type RootState = ReturnType<typeof store.getState>