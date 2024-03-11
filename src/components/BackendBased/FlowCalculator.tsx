import ReactFlow, { Connection, EdgeChange, Node, NodeChange, Panel, ReactFlowInstance, addEdge, applyEdgeChanges, applyNodeChanges, getOutgoers, useReactFlow } from "reactflow";
import { NodeOptions } from "./NodeOptions";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { DragEvent, useCallback, useEffect, useMemo, useState } from "react";
import { NumNode, OperatorNode } from "./Nodes";
import { addNode, replaceEdges, replaceNodes } from "../../store/slices/flowManagement/flowManagementSlice";

import { v4 as uuid } from "uuid";
import { ResultNode } from "./Nodes/ResultNode";
type FlowCalculatorProps={
	onSaveFlow: Function;
	refreshFlow: Function;
}

export function FlowCalculator({onSaveFlow,refreshFlow}:FlowCalculatorProps){
	const dispatch=useDispatch<AppDispatch>()
	const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance>();
	const { getNodes, getEdges } = useReactFlow();
	const nodeTypes = useMemo(() => ({ num: NumNode,operation:OperatorNode, result:ResultNode }), []);

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
			data: { 
				val: 0,
				sourceHandle:uuid(),
				targetHandle:uuid(),
			}
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

	// Edge connect feature
	const onConnect = (connection: Connection) => {
		const newEdges = addEdge(connection, edges);
		dispatch(replaceEdges(newEdges));
	};

	const isValidConnection=useCallback((connection:Connection) => {
		const nodes = getNodes();
		const edges = getEdges();
		const target = nodes.find((node) => node.id === connection.target);
		const source = nodes.find((node) => node.id === connection.source);
		const sourceSet=new Set(edges.map(ed=>ed.source));
		const targetSet=new Set(edges.map(ed=>ed.target));
		const hasCycle = (node, visited = new Set()) => {
			if (visited.has(node.id)) return false;

			visited.add(node.id);

			for (const outgoer of getOutgoers(node, nodes, edges)) {
				if (outgoer.id === connection.source) return true;
				if (hasCycle(outgoer, visited)) return true;
			}
		};

		if ((target?.id === connection.source) || (source?.type=== target?.type)) return false;
		else if(targetSet.has(''+connection.target)) return false;
		else if(hasCycle(target)) return false;
		else if(target?.type=="result" && source?.type!='num') return false;
		return true;
	},[nodes,edges])

	useEffect(()=>{
		
	}
	,[nodes,edges])
	
	return(
		<>
		<NodeOptions></NodeOptions>
		<div style={{ width: '100%', height: '50vh' }} className="rounded-lg">
			<ReactFlow
				nodes={nodes}
				isValidConnection={isValidConnection}
				edges={edges}
				nodeTypes={nodeTypes}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				onConnect={onConnect}
				onDrop={onDrop}
				onDragOver={onDragOver}
				onInit={setReactFlowInstance}
			>

				<Panel position="top-right">
					<button className="text-lg hover:border text-white p-2 text-center mr-1 rounded-lg bg-[#fff3] duration-100" onClick={()=>onSaveFlow()}>save</button>
					<button className="text-lg hover:border text-white p-2 text-center rounded-lg bg-[#fff3] duration-100"  onClick={()=>refreshFlow()}>restore</button>
				</Panel>
			</ReactFlow>
		</div></>
	)
}