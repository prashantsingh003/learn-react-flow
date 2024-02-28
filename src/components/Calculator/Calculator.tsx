import ReactFlow, { Connection, Edge, Node, ReactFlowInstance, addEdge, getOutgoers, useEdgesState, useNodesState, useReactFlow } from "reactflow";
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
  const { getNodes, getEdges } = useReactFlow();
	// Edge connect feature
	const onConnect = useCallback(
    (params) => setEdges((eds) => {
			return addEdge(params, eds)
		}),
    [setEdges],
  );

	// Edge connect prevent cycle / self refrence
	const isValidConnection = useCallback(
    (connection:Connection) => {
      // we are using getNodes and getEdges helpers here
      // to make sure we create isValidConnection function only once
      const nodes = getNodes();
      const edges = getEdges();
      const target = nodes.find((node) => node.id === connection.target);
      const hasCycle = (node:Node, visited = new Set()) => {
        if (visited.has(node.id)) return false;

        visited.add(node.id);

        for (const outgoer of getOutgoers(node, nodes, edges)) {
          if (outgoer.id === connection.source) return true;
          if (hasCycle(outgoer, visited)) return true;
        }
      };

      if (target.id === connection.source) return false;
      return !hasCycle(target);
    },
    [getNodes, getEdges],
  );

	//  DRag and drop feature
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
					isValidConnection={isValidConnection}
					edges={edges}
					nodeTypes={nodeTypes}
					onNodesChange={onNodesChange}
					onEdgesChange={onEdgesChange}
					onDrop={onDrop}
					onDragOver={onDragOver}
					onInit={setReactFlowInstance}
					onConnectStart={onConnectStart}
					// defaultEdgeOptions={defaultEdgeOptions}
					onConnect={onConnect}
				>
				</ReactFlow>
			</div>
		</>
	)
}