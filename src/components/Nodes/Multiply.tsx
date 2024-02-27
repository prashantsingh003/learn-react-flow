
import { memo, useId, useState } from 'react';
import { Handle, Position } from 'reactflow';


export const Multiply = memo(({data,isConnectable})=>{
	const [num,setNum]=useState<Number>(data.val)
	return (
		<div className="cal-nodes space-y-5 bg-blue-300 opacity-80 text-center rounded-lg ">
			<div className="p-3 shadow rounded-lg">
				<h3 className="text-lg border-b text-slate-600 font-bold">Multiply With Input (x)</h3>
				<p className="font-sans">
					<input 
						type="number" 
						className="text-center text-slate-600 bg-transparent focus:outline-none focus:ring-2 border border-gray-700 rounded-md py-2 px-4"
						value={String(num)} id="" onChange={(e)=>setNum(Number(e.target.value))}
					/>
				</p>
			</div>
      <Handle type="source" position={Position.Left} id={useId()} isConnectable={isConnectable} />
			<Handle type="target" position={Position.Right} id={useId()} isConnectable={isConnectable}/>
		</div>
	)
})
