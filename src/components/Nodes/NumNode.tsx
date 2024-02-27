import { memo, useId } from "react";
import { Handle, Position } from "reactflow";

export const NumNode=memo(({data,isConnectable})=>{
	return (
		<>
		<div className="cal-nodes cal-nodes space-y-5 bg-gray-600 text-center rounded-lg " style={{width:'100px'}}>
			<div className="p-3 shadow rounded-lg">
				<h3 className="text-lg text-white font-bold">{data.val}</h3>
			</div>
			<Handle type="source" id={useId()} position={Position.Right}/>
		</div>
		</>
	)
})