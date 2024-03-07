import { createSlice,nanoid } from "@reduxjs/toolkit";
import axios from 'axios';
const initialState:{nodes:any[],edges:any[]}={nodes:[],edges:[]}
const backendFlowManagementSlice=createSlice({
	name:'backendFlowManagement',
	initialState,
	reducers:{
		updateNodes: (state, action) => {
			state.nodes = action.payload
		},
		addNode: (state, action) => {
			const node = {
				...action.payload
			}
			state.nodes.push(node)
		},
		removeNode: (state, action) => {
			state.nodes = state.nodes.filter(el => el.id != action.payload.id)
		},
		updateNode: (state, action) => {
			const node = action.payload;
			const id = action.payload.id
			state.nodes = state.nodes.map(el => el.id == id ? { ...el, ...node } : el)
		},

		updateEdges: (state, action) => {
			state.edges = action.payload
		},
		addEdge: (state, action) => {
			const edge={
				...action.payload,
			}
			state.edges.push(edge)
		},
		removeEdge: (state, action) => {
			state.edges = state.edges.filter(el => el.id != action.payload.id)
		},
		updateEdge: (state, action) => {
			const edge = action.payload;
			const id = action.payload.id
			state.edges = state.edges.map(el => el.id == id ? { ...el, ...edge } : el)
		},
		getAndSetNewFlow:(state,action)=>{
			// axios.get()
		},
		setFlowInBackend:(state)=>{

		}

	}
})

export const { removeNode, updateNode, addNode, updateNodes, removeEdge, updateEdges, addEdge } = backendFlowManagementSlice.actions;
export default backendFlowManagementSlice.reducer