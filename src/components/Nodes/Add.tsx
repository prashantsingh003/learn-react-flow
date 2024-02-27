
import { memo, useState } from 'react';
import { Handle, Position } from 'reactflow';

export const Add=memo(({data,isConnectable})=>{
	const [num,setNum]=useState<Number>(data.val)
	console.log(data,isConnectable);
	return (
		<div>
			<Handle type="target" position={Position.Right} isConnectable={isConnectable}/>
			<h3>Add Input (+)</h3>
			<input type="number" value={String(num)} id="" onChange={(e)=>setNum(Number(e.target.value))} />
      <Handle type="source" position={Position.Left} id="b" isConnectable={isConnectable} />
		</div>
	)
})