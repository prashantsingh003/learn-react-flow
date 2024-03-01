import ReactFlow, { Connection, Edge, EdgeChange, Node, NodeChange, ReactFlowInstance, addEdge, applyEdgeChanges, applyNodeChanges, getOutgoers, useEdgesState, useNodesState, useReactFlow } from "reactflow";
import { Options } from "./Options";
import './calculator.css';
import 'reactflow/dist/style.css';
import 'reactflow/dist/base.css';
import { DragEvent, useCallback, useEffect, useState } from "react";
import { nodeTypes } from "./Nodes";
import { edgeTypes } from "./Edges";
import { useDispatch, useSelector } from "react-redux";
import { addNode, updateEdges, updateNodes } from "../../store/slices/nodeManagement/nodeManagementSlice";


export function Calculator() {
	const [inp, setInp] = useState<Number>(3)
	const [chainResult, setChainResult] = useState<Number>(0)
	const [numNodeInUse, setNumNodeInUse] = useState<Boolean>(false)
	const dispatch = useDispatch()
	// const { getNodes, getEdges } = useReactFlow();
	// const defaultEdgeOptions = useMemo(()=>({ type: 'edgeTypes'}),[])

	const {nodes:rdxNodes,edges:rdxEdges}:{nodes:Node[],edges:Edge[]} = useSelector(((state:any) => state.flow))
	const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance>();

	const onNodesChange = (change:NodeChange[]) => {
		const newNodes = applyNodeChanges(change, rdxNodes)
		if (change[0].type == 'remove' && !newNodes.find((el: Node) => el.type == 'num')) {
			setNumNodeInUse(false);
		}
		dispatch(updateNodes(newNodes))
	};
	const onEdgesChange = (changes:EdgeChange[]) => {
		const newEdges = applyEdgeChanges(changes, rdxEdges)
		dispatch(updateEdges(newEdges))
	};

	// Edge connect feature
	const onConnect = (connection: Connection) => {

		const sourceId = connection.source;
		const node = rdxNodes.find(el => el.id == sourceId)
		if (node && node.type != 'num') {
			//@ts-ignore
			connection = { ...connection, type: 'custom-edge' };
		}
		const newEdges = addEdge(connection, rdxEdges);
		dispatch(updateEdges(newEdges));
	};
	useEffect(() => {
		let res = 0;
		let node = rdxNodes.find((el) => el.type === 'num')
		if (!node) return;
		const getNextNodeId = (sourceId: String) => rdxEdges.find((el) => el.source == sourceId)
		while (node) {
			switch (node.type) {
				case 'mul':
					res *= node.data.val
					break;
				case 'add':
					res += node.data.val
					break;
				case 'sub':
					res -= node.data.val
					break;
				default:
					res += node.data.val
					break;
			}
			//@ts-ignore
			const nextNodeId = getNextNodeId(node.id).target;
			node = rdxNodes.find((el) => el.id == nextNodeId)
			setChainResult(res)
		}
	}, [rdxEdges])

	// Edge connect prevent self refrence
	const isValidConnection = (connection: Connection) => {
		const res = connection.target == connection.source;
		return !res;
	};

	//  DRag and drop feature
	const onDrop = (e:DragEvent) => {
		e.preventDefault()
		const type = e.dataTransfer.getData('application/reactflow');
		if (type == 'num') {
			if (inp == 0) {
				alert('Empty node ' + inp)
				return
			}
			if (rdxNodes.some(el => el.type == 'num')) {
				alert('Number Node already exists ')
				return
			}
			setNumNodeInUse(true)
		}
		const position = reactFlowInstance?.screenToFlowPosition({ x: e.clientX, y: e.clientY })
		const node = {
			type: type,
			position,
			data: { val: inp },
		}
		dispatch(addNode(node))
	}

	const onDragOver = useCallback((event:DragEvent) => {
		event.preventDefault();
		event.dataTransfer.dropEffect = 'move';
	}, []);

	return (
		<>
			<div style={{ width: '100%', }}>
				<input type="number" className="p-2 border-4 outline-none rounded-md text-center w-full my-2" value={String(inp)} onChange={(e) => setInp(Number(e.target.value))} id="" />
				<Options disableNum={numNodeInUse}></Options>
			</div>
			<div style={{ width: '100%', height: '50vh' }} className="rounded-lg">
				<ReactFlow
					nodes={rdxNodes}
					edgeTypes={edgeTypes}
					isValidConnection={isValidConnection}
					edges={rdxEdges}
					nodeTypes={nodeTypes}
					onNodesChange={onNodesChange}
					onEdgesChange={onEdgesChange}
					onDrop={onDrop}
					onDragOver={onDragOver}
					onInit={setReactFlowInstance}
					// defaultEdgeOptions={defaultEdgeOptions}
					onConnect={onConnect}
				>
				</ReactFlow>
			</div>
			<div style={{ width: '100%' }}>
				<div className="text-lg mt-2 tracking-[.35em] hover:tracking-[.65em] ease-in duration-100"> Result</div>
				<input placeholder="Result" type="number" disabled className="p-2 border-4 outline-none rounded-md text-center w-full my-2" value={String(chainResult)} />
			</div>
		</>
	)
}