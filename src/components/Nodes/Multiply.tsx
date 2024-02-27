
import { memo, useState } from 'react';
import { Handle, Position } from 'reactflow';


export const Multiply = memo(({data,isConnectable})=>{
	const [num,setNum]=useState<Number>(data.val)
	return (
		<div>
			<Handle type="target" position={Position.Right}/>
			<h3>Multiply With Input (x)</h3>
			<input type="number" value={String(num)} id="" onChange={(e)=>setNum(Number(e.target.value))} />
      <Handle type="source" position={Position.Left} id="b" />
		</div>
	)
})
