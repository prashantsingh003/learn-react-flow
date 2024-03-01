import { createContext, useContext } from "react";

export const Context=createContext({
	nodes:[],
	edges:[],
	// addNode:(node)=>{},
	// updateNode:(id,node)=>{},
	// deleteNode:(id)=>{},
	// addEdge:(edge)=>{},
	// updateEdge:(id,edge)=>{},
	// deleteEdge:(id)=>{},

});

export const ContextProvider=Context.Provider;
// export const TodoConTextProvider=({children})=>{
// 	return(
// 		<Context.provider>
// 			{children}
// 		</Context.provider>
// 	)
// }

export const useTodoContext=()=>{
	return useContext(Context);
}