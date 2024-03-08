import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { getFlowApi, getUserFlowsApi } from "../../../utils/api";
import { Edge, Node } from "reactflow";
export type FlowData = {
	name: String;
	id: String;
	created: Date
	updated: Date
}
export type Flow = {
	name: String;
	id: String;
	created: Date;
	updated: Date;
	nodes: any[];
	edges: any[];
}
const initialState: { userFlowList: FlowData[], currentFlow: Flow | null } = {
	userFlowList: [],
	currentFlow: null
}

const flowManagementSlice = createSlice({
	name: "flowManagement",
	initialState,
	reducers: {
		setUserFlows(state, { payload }: { payload: FlowData[] }) {
			state.userFlowList = payload;
		},
		clearUserFlows(state) {
			state.userFlowList = []
		},
		clearCurrentFlow(state) {
			state.currentFlow = null;
		},

		replaceNodes(state,{payload}:{payload:Node[]}){
			if(state.currentFlow)state.currentFlow.nodes=payload;
		},
		replaceEdges(state,{payload}:{payload:Edge[]}){
			if(state.currentFlow)state.currentFlow.edges=payload;
		},

		addNode(state,{payload:node}){
			state.currentFlow?.nodes.push(node)
		}
	},
	extraReducers(builder) {
		builder
			.addCase(getUserFlows.fulfilled, (state, action) => {
				state.userFlowList = action.payload;
			})
			.addCase(getSelectedFlowData.fulfilled, (state, { payload }: PayloadAction<Flow | null>) => {
				state.currentFlow = payload;
			})
	}
})
const getUserFlows = createAsyncThunk(
	"flowManagement/getUserFlows",
	async (userId: string) => {
		let res: FlowData[] = []
		await axios.get(getUserFlowsApi + userId)
			.then(({ data: flowList }: { data: FlowData[] }) => {
				res = flowList;
			})
			.catch((err: Error) => {
				console.error("Error occured while fetching user's flows")
				console.error(err)
			})
		return res;
	}
)

const getSelectedFlowData = createAsyncThunk(
	"flowManagement/getSelectedFlowData",
	async (flowId: String | undefined) => {
		let res: Flow | null = null;
		if (flowId) await axios.get(getFlowApi + flowId)
			.then(({ data: flow }: { data: Flow }) => {
				res = flow;
			})
			.catch((err: Error) => {
				console.error("Error occured while fetching flow")
				console.error(err)
			});
		return res;
	}
)
export const { setUserFlows, clearUserFlows, clearCurrentFlow } = flowManagementSlice.actions;
export const { replaceEdges, replaceNodes, addNode } = flowManagementSlice.actions;
export { getSelectedFlowData, getUserFlows }
export default flowManagementSlice.reducer;
