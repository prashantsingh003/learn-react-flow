import ReactFlow, { Edge, ReactFlowInstance, ReactFlowProvider, addEdge, useEdgesState, useNodesState } from "reactflow";
import { Options } from "./Options";
import './calculator.css';
// import '../flow.css';
import 'reactflow/dist/base.css';
import { useCallback, useMemo, useState } from "react";
import { Add, Multiply, NumNode, Result, Subtract } from "../Nodes";
// import { CustomEdge } from "../Edges";
const getNewID=()=>(Math.random() + 1).toString(36).substring(7);
export function Calculator(){
	const [inp,setInp]=useState<Number>(3)
	const nodeTypes = useMemo(() => ({ add: Add, sub:Subtract, mul:Multiply, num: NumNode, result:Result }), []);
	// const edgeTypes = {
	// 	turbo: CustomEdge,
	// };
	// const defaultEdgeOptions = {
	// 	type: 'turbo',
	// 	markerEnd: 'edge-circle',
	// }
	const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([]);
	const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance>();

	const onConnect = useCallback(
    (params) => setEdges((eds) => {
			console.log(params,eds)
			return addEdge(params, eds)
		}),
    [setEdges],
  );

	const onDrop=useCallback((e)=>{
		e.preventDefault()
		const type = e.dataTransfer.getData('application/reactflow');
		if (type=='num' && inp==0){ 
			alert('Empty node '+inp)
			return
		}
		const position=reactFlowInstance?.screenToFlowPosition({x:e.clientX,y:e.clientY})
		const node={
			id: getNewID(),
			type: type,
			position,
			data: { val:inp },
		}
		setNodes((nds) => nds.concat(node));
	},[reactFlowInstance])

	const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);
	
	return (
		<>
		 	<ReactFlowProvider>
			<div style={{ width: '80vw', }}>
				<input type="number" className="p-2 outline-none rounded-md text-center w-full my-2" value={String(inp)} onChange={(e)=>setInp(Number(e.target.value))} id="" />
				<Options></Options>
				{/* <div className="container">
					<div onClick={()=>handleSelection('num')}>num</div>
				</div> */}
			</div>
			<div style={{ width: '80vw', height: '50vh' }} className="rounded-lg">
				<ReactFlow
					nodes={nodes}
					// edgeTypes={edgeTypes}
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
			</ReactFlowProvider>
		</>
	)
}