import { memo, useEffect, useState } from "react";
import { Handle, Position, Node } from "reactflow";
import { v4 as uuid } from "uuid";
export const NumNode=memo(({data}:Node)=>{
	const [handleId,setHandleId]=useState<string>()
	useEffect(()=>{
		setHandleId(uuid())
	},[])
	return (
		<>
		<div className="cal-nodes cal-nodes space-y-5 bg-gray-600 text-center rounded-lg " style={{width:'100px'}}>
			<div className="p-3 shadow rounded-lg">
				<h3 className="text-lg text-white font-bold">{data.val}</h3>
			</div>
			<Handle type="source" id={handleId} position={Position.Right}/>
		</div>
		</>
	)
})