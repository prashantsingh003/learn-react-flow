import { createContext, useContext } from "react";

export const FlowContext=createContext({
	addNewFlow:()=>{},
	updateFlow:()=>{},
	deleteFlow:()=>{},
	refreshFlow:()=>{},
	renameFlow:(flow_name:String)=>{}
});

export const FlowContextProvider=FlowContext.Provider;

export const useFlowContext=()=>{
	return useContext(FlowContext);
}