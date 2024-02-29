import ReactFlow, { Connection, Edge, Node, ReactFlowInstance, addEdge, applyEdgeChanges, applyNodeChanges, getOutgoers, useEdgesState, useNodesState, useReactFlow } from "reactflow";
import { Options } from "./Options";
import './calculator.css';
import 'reactflow/dist/style.css';
import 'reactflow/dist/base.css';
import { useCallback, useEffect, useMemo, useState } from "react";
import { Add, Multiply, NumNode, Result, Subtract } from "./Nodes";
import { ColoredEdge } from "./Edges";
import { useDispatch, useSelector } from "react-redux";
import { updateNodes } from "../../store/slices/nodeManagement/nodeManagementSlice";

const getNewID = () => (Math.random() + 1).toString(36).substring(7);

export function Calculator() {
	const [inp, setInp] = useState<Number>(3)
	const [chainResult, setChainResult] = useState<Number>(0)
	const [numNodeInUse, setNumNodeInUse] = useState<Boolean>(false)
	const nodeTypes = useMemo(() => ({ add: Add, sub: Subtract, mul: Multiply, num: NumNode, result: Result }), []);
	const edgeTypes = useMemo(() => ({ 'custom-edge': ColoredEdge }), [])
	const dispatch = useDispatch()
	// const defaultEdgeOptions = useMemo(()=>({ type: 'edgeTypes'}),[])

	const [nodes, setNodes] = useState<Node[]>([]);
	const rdxNodes = useSelector((state => state.nodes))
	const setRdxNodes = (newNodes) => dispatch(updateNodes(newNodes))
	const [edges, setEdges] = useState<Edge[]>([]);
	const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance>();
	const { getNodes, getEdges } = useReactFlow();

	const onNodesChange = useCallback(
		(change) => {
			const newNodes=applyNodeChanges(change, rdxNodes)
			if (change.type == 'remove' && newNodes.some((el: Node) => el.type == 'num')) {
				setNumNodeInUse(false);
			}
			setRdxNodes(newNodes)
			setNodes((nds) => {
				const updatedNodes = applyNodeChanges(change, nds)
				return updatedNodes
			})
		},
		[setNodes]
	);
	const onEdgesChange = useCallback(
		(changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
		[setEdges]
	);

	// Edge connect feature
	const onConnect = useCallback(
		(connection: Connection) => setEdges((eds) => {
			const sourceId = connection.source;
			const node = getNodes().find(el => el.id == sourceId)
			if (node.type != 'num') {
				connection = { ...connection, type: 'custom-edge' };
			}
			return addEdge(connection, eds)
		}),
		[setEdges],
	);
	const calibrateResult = () => {
		const nodes = getNodes()
		const edges = getEdges()
		let res = 0;
		let node = nodes.find(el => el.type = 'num')
		// console.log(nodes)
		if (!node) return;
		const getNextNodeId = (sourceId: String) => edges.find((el) => el.source == sourceId)
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
			const nextNodeId = getNextNodeId(node.id)?.target;
			node = nodes.find((el) => el.id == nextNodeId)
			setChainResult(res)
		}
	}
	useEffect(calibrateResult, [nodes, edges])

	// Edge connect prevent self refrence
	const isValidConnection = useCallback(
		(connection: Connection) => {
			const nodes = getNodes()
			const res = connection.target == connection.source;
			return !res;
		},
		[getNodes, getEdges],
	);

	//  DRag and drop feature
	const onDrop = useCallback((e) => {
		e.preventDefault()
		const type = e.dataTransfer.getData('application/reactflow');
		if (type == 'num') {
			if (inp == 0) {
				alert('Empty node ' + inp)
				return
			}
			const currNodes = getNodes();
			if (currNodes.some(el => el.type == 'num')) {
				alert('Number Node already exists ')
				return
			}
			setNumNodeInUse(true)
		}
		const position = reactFlowInstance?.screenToFlowPosition({ x: e.clientX, y: e.clientY })
		const node = {
			id: getNewID(),
			type: type,
			position,
			data: { val: inp },
		}
		setRdxNodes(rdxNodes.concat(node))
		setNodes((nds) => nds.concat(node));
	}, [reactFlowInstance, setInp,setRdxNodes,getNodes])

	const onDragOver = useCallback((event) => {
		event.preventDefault();
		event.dataTransfer.dropEffect = 'move';
	}, []);

	return (
		<>
			<div style={{ width: '80vw', }}>
				<input type="number" className="p-2 outline-none rounded-md text-center w-full my-2" value={String(inp)} onChange={(e) => setInp(Number(e.target.value))} id="" />
				<Options disableNum={numNodeInUse}></Options>
			</div>
			<div style={{ width: '80vw', height: '50vh' }} className="rounded-lg">
				<ReactFlow
					nodes={nodes}
					edgeTypes={edgeTypes}
					isValidConnection={isValidConnection}
					edges={edges}
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
			<div style={{ width: '80vw' }}>
				<div className="text-lg mt-2 tracking-[.35em] hover:tracking-[.65em] ease-in duration-100"> Result</div>
				<input placeholder="Result" type="number" disabled className="p-2 outline-none rounded-md text-center w-full my-2" value={String(chainResult)} />
			</div>
		</>
	)
}