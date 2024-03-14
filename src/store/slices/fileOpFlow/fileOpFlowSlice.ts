import { createSlice } from "@reduxjs/toolkit";
import { Edge } from "reactflow";
export type Flow = {
	nodes: any[];
	edges: any[];
}
export type FlowVariable = {
	name: String,
	value: any,
	editable: Boolean,
}
const getVars=()=>{
	const data=localStorage.getItem('flowVars');
	return data?JSON.parse(data):[];
}
const getFlowData=()=>{
	const data=localStorage.getItem('flowData');
	return data?JSON.parse(data):{nodes:[],edges:[]};
}
const initialState: { flow: Flow, flowVariables: FlowVariable[] } = {
	flow: getFlowData(),
	flowVariables: getVars()
}
const fileOpFlowSlice = createSlice({
	initialState,
	name: 'fileOpFlowSlice',
	reducers: {
		replaceNodes(state, { payload }: { payload: Node[] }) {
			state.flow.nodes = payload;
			localStorage.setItem('flowData',JSON.stringify(state.flow))
		},
		replaceEdges(state, { payload }: { payload: Edge[] }) {
			state.flow.edges = payload;
			localStorage.setItem('flowData',JSON.stringify(state.flow))
		},
		addNode(state, { payload: node }) {
			state.flow.nodes.push(node)
			localStorage.setItem('flowData',JSON.stringify(state.flow))
		},
		toggleExpandedNode(state, { payload: nodeId }: { payload: String }) {
			state.flow.nodes = state.flow.nodes.map(node => node.id != nodeId ? node : { ...node, data: { ...node.data, expanded: !node.data.expanded } });
		},

		createFlowVariable(state, { payload }: { payload: FlowVariable }) {
			const { name, value = null, editable = true } = payload
			if(new Set(state.flowVariables.map(v => v.name)).has(name)){
				alert("can't have variables with same name")
				return
			}
			state.flowVariables.push({ name, value, editable })
			localStorage.setItem('flowVars',JSON.stringify(state.flowVariables))
		},
		updateFlowVariable(state, { payload }: { payload: { name: String, value: any } }) {
			state.flowVariables = state.flowVariables.map(v => v.name != payload.name ? v : { ...v, value: payload.value })
			localStorage.setItem('flowVars',JSON.stringify(state.flowVariables))
		},
		setFlowVarEditable(state, { payload: varName }: { payload: String }) {
			state.flowVariables = state.flowVariables.map(v => v.name != varName ? v : { ...v, editable: true })
			localStorage.setItem('flowVars',JSON.stringify(state.flowVariables))
		},
		setFlowVarUneditable(state, { payload: varName }: { payload: String }) {
			state.flowVariables = state.flowVariables.map(v => v.name != varName ? v : { ...v, editable: false })
			localStorage.setItem('flowVars',JSON.stringify(state.flowVariables))
		},
		removeFlowVariable(state, { payload: varName }: { payload: String }) {
			state.flowVariables = state.flowVariables.filter(v => v.name != varName)
			localStorage.setItem('flowVars',JSON.stringify(state.flowVariables))
		}
	}
})
export const { replaceEdges, replaceNodes, addNode, toggleExpandedNode } = fileOpFlowSlice.actions;
export const { createFlowVariable, updateFlowVariable, setFlowVarEditable, setFlowVarUneditable, removeFlowVariable } = fileOpFlowSlice.actions;
export default fileOpFlowSlice.reducer;