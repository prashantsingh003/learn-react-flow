import { nanoid, createSlice } from "@reduxjs/toolkit";

const initialState:{nodes:any[],edges:any[]}={nodes:[],edges:[]}

export const nodeManagementSlice=createSlice({
	name:'nodeManagement',
	initialState,
	reducers:{
		updateNodes:(state,action)=>{
			// console.log(action.payload)
			state.nodes=[...state.nodes,...action.payload]
		},
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
		},

		addEdge:(state,action)=>{
			// const edge={
			// 	id:nanoid(),
			// 	data:action.payload
			// }
			// state.edges.push(edge)
		},
		removeEdge:(state,action)=>{
			state.edges=state.edges.filter(el=>el.id!=action.payload.id)
		},
		updateEdge:(state,action)=>{
			const edge=action.payload;
			const id=action.payload.id
			state.edges=state.edges.map(el=>el.id==id?{...el,...edge}:el)
		}
	}
})

export const {removeNode,updateNode,addNode,updateNodes,removeEdge,updateEdge,addEdge}=nodeManagementSlice.actions;
export default nodeManagementSlice.reducer