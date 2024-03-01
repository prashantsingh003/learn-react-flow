import { memo, useEffect, useState } from "react";
import { Handle, Node, Position } from "reactflow";
import { v4 as uuid } from "uuid";
export const Result=memo(({data}:Node)=>{
	const [handleId,setHandleId]=useState<string>()
	useEffect(()=>{
		const id=uuid()
		setHandleId(id)
	},[])
	return (
		<>
		<div className="cal-nodes cal-nodes space-y-5 bg-gray-600 text-center rounded-lg " style={{width:'100px'}}>
			<div className="p-3 shadow rounded-lg">
				<h3 className="text-lg text-white font-bold">Result</h3>
			</div>
			<Handle type="target" id={handleId} position={Position.Left}/>
		</div>
		</>
	)
})