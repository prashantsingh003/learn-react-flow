import ReactFlow from "reactflow";

export function FlowCalculator(){
	return(
		<>
		<div style={{ width: '100%', height: '50vh' }} className="rounded-lg">
			<ReactFlow
				// nodes={rdxNodes}
				// edgeTypes={edgeTypes}
				// isValidConnection={isValidConnection}
				// edges={rdxEdges}
				// nodeTypes={nodeTypes}
				// onNodesChange={onNodesChange}
				// onEdgesChange={onEdgesChange}
				// onDrop={onDrop}
				// onDragOver={onDragOver}
				// onInit={setReactFlowInstance}
				// defaultEdgeOptions={defaultEdgeOptions}
				// onConnect={onConnect}
			>
			</ReactFlow>
		</div></>
	)
}