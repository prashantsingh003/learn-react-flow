
import { memo, useEffect, useId, useState } from 'react';
import { Handle, Position } from 'reactflow';
import { v4 as uuid } from "uuid";

export const Subtract =  memo(({data,isConnectable})=>{
	const [num,setNum]=useState<Number>(data.val)
	const [handleIDs,setHandleIDs]=useState<string[]>([])
	useEffect(()=>{
		const arr=[uuid(),uuid()]
		setHandleIDs(arr)
	},[])
	return (
		<div className="cal-nodes space-y-5 bg-rose-300 opacity-80 text-center rounded-lg ">
			<div className="p-3 shadow rounded-lg">
				<h3 className="text-lg border-b text-slate-600 font-bold">Subtract (-)</h3>
				<p className="font-sans">
					<input 
						type="number" disabled className="text-center text-slate-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-700 rounded-md py-2 px-4" 
						value={String(num)} id="" onChange={(e)=>setNum(Number(e.target.value))}
					/>
				</p>
			</div>
      <Handle type="source" position={Position.Right} id={handleIDs[0]}/>
			<Handle type="target" position={Position.Left} id={handleIDs[1]}/>
		</div>
	)
})