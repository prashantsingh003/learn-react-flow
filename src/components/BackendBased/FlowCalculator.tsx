import ReactFlow, { EdgeChange, Node, NodeChange, applyEdgeChanges, applyNodeChanges } from "reactflow";
import { NodeOptions } from "./NodeOptions";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { DragEvent, useCallback, useMemo, useState } from "react";
import { NumNode, OperatorNode } from "./Nodes";
import { addNode, replaceEdges, replaceNodes } from "../../store/slices/flowManagement/flowManagementSlice";

import { v4 as uuid } from "uuid";

export function FlowCalculator(){
	const dispatch=useDispatch<AppDispatch>()
	const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance>();
	const nodeTypes = useMemo(() => ({ num: NumNode,operation:OperatorNode }), []);

	const edges=useSelector((state:RootState)=>state.userFlow.currentFlow.edges)
	const nodes=useSelector((state:RootState)=>state.userFlow.currentFlow.nodes)

	const onNodesChange = (change:NodeChange[]) => {
		const newNodes = applyNodeChanges(change, nodes)
		dispatch(replaceNodes(newNodes))
	};
	const onEdgesChange = (changes:EdgeChange[]) => {
		const newEdges = applyEdgeChanges(changes, edges)
		dispatch(replaceEdges(newEdges))
	};
	const createNode=(type:String,position:any)=>{
		return{
			id:uuid(),
			type,
			position,
			data: { val: 0 }
		}
	}

	const onDrop = (e:DragEvent) => {
		e.preventDefault()
		const type = e.dataTransfer.getData('application/reactflow');
		const position = reactFlowInstance?.screenToFlowPosition({ x: e.clientX, y: e.clientY })
		const node=createNode(type,position)
		dispatch(addNode(node))
	}
	const onDragOver = useCallback((event:DragEvent) => {
		event.preventDefault();
		event.dataTransfer.dropEffect = 'move';
	}, []);
	
	return(
		<>
		<NodeOptions></NodeOptions>
		<div style={{ width: '100%', height: '50vh' }} className="rounded-lg">
			<ReactFlow
				nodes={nodes}
				// edgeTypes={edgeTypes}
				// isValidConnection={isValidConnection}
				edges={edges}
				nodeTypes={nodeTypes}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				onDrop={onDrop}
				onDragOver={onDragOver}
				onInit={setReactFlowInstance}
				// defaultEdgeOptions={defaultEdgeOptions}
				// onConnect={onConnect}
			>
			</ReactFlow>
		</div></>
	)
}