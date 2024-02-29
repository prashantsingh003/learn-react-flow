import { configureStore } from "@reduxjs/toolkit";
import NodeMangagementReducer from './slices/nodeManagement/nodeManagementSlice'
export const store=configureStore({
	reducer:NodeMangagementReducer
});