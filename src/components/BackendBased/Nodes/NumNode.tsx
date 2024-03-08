import React, { useState } from "react";
import { Handle, Position } from "reactflow";

export function NumNode(node:any){
	const{sourceHandle,targetHandle}=node;
	const [inp,setInp]=useState<number>(0)
	const val=node.data.val
	console.log(node)
	return (
		<>
		<div className="cal-nodes cal-nodes space-y-5 bg-gray-600 text-center rounded-lg " style={{width:'100px'}}>
			<div className="p-3 shadow rounded-lg">
				<h3 className="text-lg text-white font-bold">{val}</h3>
				<input type="number" className="w-full" value={inp} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setInp(Number(e.currentTarget.value))}/>
			</div>
			<Handle type="target" id={targetHandle} position={Position.Left}/>
			<Handle type="source" id={sourceHandle} position={Position.Right}/>
		</div>
		</>
	)
}