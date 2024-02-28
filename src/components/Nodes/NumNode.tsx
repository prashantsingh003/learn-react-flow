import { memo, useEffect, useId, useState } from "react";
import { Handle, Position, useEdges } from "reactflow";
import { v4 as uuid } from "uuid";
export const NumNode=memo(({data,isConnectable})=>{
	const [handleId,setHandleId]=useState<string>()
	useEffect(()=>{
		setHandleId(uuid())
		console.log(handleId)
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