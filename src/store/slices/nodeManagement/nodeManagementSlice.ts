import { nanoid, createSlice } from "@reduxjs/toolkit";

const initialState:{nodes:any[],edges:any[]}={nodes:[],edges:[]}

export const nodeManagementSlice=createSlice({
	name:'nodeManagement',
	initialState,
	reducers:{
		addNode:(state,action)=>{
			const node={
				id:nanoid(),
				data:action.payload
			}
			state.nodes.push(node)
		},
		removeNode:(state,action)=>{
			state.nodes=state.nodes.filter(el=>el.id!=action.payload.id)
		},
		updateNode:(state,action)=>{
			const node=action.payload;
			const id=action.payload.id
			state.nodes=state.nodes.map(el=>el.id==id?{...el,...node}:el)
		}
	}
})

export const {removeNode,updateNode,addNode}=nodeManagementSlice.actions;
export default nodeManagementSlice.reducer