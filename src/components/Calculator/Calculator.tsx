import ReactFlow, { useEdgesState, useNodesState } from "reactflow";
// import { Options } from "./Options";
import './calculator.css';
import { useMemo, useState } from "react";
import { Add, Multiply, Subtract } from "../Nodes";
const getNewID=()=>(Math.random() + 1).toString(36).substring(7);
export function Calculator(){
	const [inp,setInp]=useState<Number>(0)
	const nodeTypes = useMemo(() => ({ add: Add, sub:Subtract, mul:Multiply }), []);
	const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

	const getNode=(typ:String,val:Number)=>{
		return {
			id: getNewID(),
			type: typ,
			position: { x: 0, y: 0 },
			data: { val },
		}
	}
	const handleSelection=(typ:string)=>{
		const newNode=getNode(typ,inp);
		setNodes((nds) => nds.concat(newNode));
	}
	return (
		<>
			<div style={{ width: '80vw', }}>
				<input type="number" value={String(inp)} onChange={(e)=>setInp(Number(e.target.value))} id="" />
				{/* <Options></Options> */}
				<div className="container">
					<div onClick={()=>handleSelection('add')}>Add</div>
					<div onClick={()=>handleSelection('sub')}>Subtract</div>
					<div onClick={()=>handleSelection('mul')}>Multiply</div>
					{/* <div onClick={()=>handleSelection('num')}>Number</div> */}
				</div>
			</div>
			<div style={{ width: '80vw', height: '50vh' }}>
				<ReactFlow
					nodes={nodes}
					edges={edges}
					nodeTypes={nodeTypes}
					onNodesChange={onNodesChange}
					onEdgesChange={onEdgesChange}
				>
				</ReactFlow>
			</div>
		</>
	)
}