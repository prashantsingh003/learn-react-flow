import ReactFlow, { Connection, Edge, Node, ReactFlowInstance, addEdge, applyEdgeChanges, applyNodeChanges, getOutgoers, useEdgesState, useNodesState, useReactFlow } from "reactflow";
import { Options } from "./Options";
import './calculator.css';
// import '../flow.css';
import 'reactflow/dist/style.css';
import 'reactflow/dist/base.css';
import { useCallback, useMemo, useState } from "react";
import { Add, Multiply, NumNode, Result, Subtract } from "../Nodes";
import { ColoredEdge } from "../Edges";
// import { CustomEdge } from "../Edges";
const getNewID=()=>(Math.random() + 1).toString(36).substring(7);
export function Calculator(){
	const [inp,setInp]=useState<Number>(3)
	const [numNodeInUse,setNumNodeInUse]=useState<Boolean>(false)
	const nodeTypes = useMemo(() => ({ add: Add, sub:Subtract, mul:Multiply, num: NumNode, result:Result }), []);
	const edgeTypes = useMemo(()=>({ 'custom-edge': ColoredEdge }),[])
	const defaultEdgeOptions = useMemo(()=>({ type: 'edgeTypes'}),[])
	
	const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
	const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance>();
  const { getNodes, getEdges } = useReactFlow();

	const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
	const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

	// Edge connect feature
	const onConnect = useCallback(
    (connection) => setEdges((eds) => {
			connection={...connection,type:'custom-edge'}
			return addEdge(connection, eds)
		}),
    [setEdges],
  );

	// Edge connect prevent self refrence
	const isValidConnection = useCallback(
    (connection:Connection) => {
			const nodes=getNodes()
			const res=connection.target==connection.source;
      return !res;
    },
    [getNodes, getEdges],
  );

	//  DRag and drop feature
	const onDrop=useCallback((e)=>{
		e.preventDefault()
		const type = e.dataTransfer.getData('application/reactflow');
		if (type=='num'){
			if(inp==0) {
				alert('Empty node '+inp)
				return
			}
			const currNodes=getNodes();
			if( currNodes.some(el=>el.type=='num')){
				alert('Number Node already exists ')
				return
			}
			setNumNodeInUse(true)
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

	const onNodesDelete=useCallback((nodes:Node[])=>{
		if (nodes.some((el:Node)=>el.type=='num')) setNumNodeInUse(false);
	},[setNodes])
	const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);
	
	return (
		<>
			<div style={{ width: '80vw', }}>
				<input type="number" disabled className="p-2 outline-none rounded-md text-center w-full my-2" value={String(inp)} onChange={(e)=>setInp(Number(e.target.value))} id="" />
				<Options disableNum={numNodeInUse}></Options>
				{/* <div className="container">
					<div onClick={()=>handleSelection('num')}>num</div>
				</div> */}
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
					defaultEdgeOptions={defaultEdgeOptions}
					onConnect={onConnect}
					onNodesDelete={onNodesDelete}
				>
				</ReactFlow>
			</div>
		</>
	)
}