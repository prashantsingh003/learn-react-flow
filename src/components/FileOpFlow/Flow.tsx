import { useCallback, useMemo, useState } from "react";
import ReactFlow, { Connection, Controls, EdgeChange, NodeChange, ReactFlowInstance, addEdge, applyEdgeChanges, applyNodeChanges, getOutgoers, useReactFlow } from "reactflow";
import { AppDispatch, RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import { FileOpNode, CodeNode } from "./Nodes";
import { NodeOptions } from "./NodeOptions";
import { addNode, replaceEdges, replaceNodes } from "../../store/slices/fileOpFlow/fileOpFlowSlice";

export function Flow() {
	const nodeTypes = useMemo(() => ({ inp: CodeNode, fileOp: FileOpNode }), [])
	const { nodes, edges } = useSelector((state: RootState) => state.tsk4.flow);
	const dispatch = useDispatch<AppDispatch>()

	const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance>();
	// const { getNodes,getEdges}=useReactFlow()
	const onNodesChange = (change: NodeChange[]) => {
		const newNodes = applyNodeChanges(change, nodes)
		dispatch(replaceNodes(newNodes))
	};
	const onEdgesChange = (changes: EdgeChange[]) => {
		const newEdges = applyEdgeChanges(changes, edges)
		dispatch(replaceEdges(newEdges))
	};
	const onConnect = (connection: Connection) => {
		const newEdges = addEdge(connection, edges);
		console.log("fsadf")
		dispatch(replaceEdges(newEdges));
	};

	const isValidConnection = (connection: Connection) => {
		const target = nodes.find((node) => node.id === connection.target);
		// const source = nodes.find((node) => node.id === connection.source);
		// const sourceSet = new Set(edges.map(ed => ed.source));
		// const targetSet = new Set(edges.map(ed => ed.target));
		const hasCycle = (node, visited = new Set()) => {
			if (visited.has(node.id)) return false;

			visited.add(node.id);

			for (const outgoer of getOutgoers(node, nodes, edges)) {
				if (outgoer.id === connection.source) return true;
				if (hasCycle(outgoer, visited)) return true;
			}
		};
		if (hasCycle(target)) return false;
		return true;
	}

	const createNode = (type: String, position: any) => {
		return {
			id: uuid(),
			expanded:false,
			type,
			position,
			icon:false,
			data: {
				val: 0,
				sourceHandle: uuid(),
				targetHandle: uuid(),
			}
		}
	}
	const onDrop = (e: DragEvent) => {
		e.preventDefault()
		const type = e.dataTransfer.getData('application/reactflow');
		const position = reactFlowInstance?.screenToFlowPosition({ x: e.clientX, y: e.clientY })
		const node = createNode(type, position)
		dispatch(addNode(node))
	}
	const onDragOver = useCallback((event: DragEvent) => {
		event.preventDefault();
		event.dataTransfer.dropEffect = 'move';
	}, []);

	return (
		<div className="flex">
			<div>
				<NodeOptions></NodeOptions>
			</div>
			<div style={{ width: '100%', height: '50vh' }}>
				<ReactFlow
					onInit={setReactFlowInstance}
					isValidConnection={isValidConnection}
					nodes={nodes}
					edges={edges}
					nodeTypes={nodeTypes}
					onNodesChange={onNodesChange}
					onEdgesChange={onEdgesChange}
					onConnect={onConnect}
					onDrop={onDrop}
					onDragOver={onDragOver}
				>

					<Controls showInteractive={false} />
					{/* <svg>
						<defs>
							<linearGradient id="edge-gradient">
								<stop offset="0%" stopColor="#ae53ba" />
								<stop offset="100%" stopColor="#2a8af6" />
							</linearGradient>

							<marker
								id="edge-circle"
								viewBox="-5 -5 10 10"
								refX="0"
								refY="0"
								markerUnits="strokeWidth"
								markerWidth="10"
								markerHeight="10"
								orient="auto"
							>
								<circle stroke="#2a8af6" strokeOpacity="0.75" r="2" cx="0" cy="0" />
							</marker>
						</defs>
					</svg> */}
				</ReactFlow>
			</div>
		</div >
	)
}