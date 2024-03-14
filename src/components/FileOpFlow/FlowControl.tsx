import { ReactFlowProvider } from "reactflow";
import { Flow } from "./Flow";
import { ManageFlowVars } from "./ManageFlowVars";

export function FlowControl(){
	return (
		<div>
			<ManageFlowVars></ManageFlowVars>
			<ReactFlowProvider>
				<Flow></Flow>
			</ReactFlowProvider>
		</div>
	)
}