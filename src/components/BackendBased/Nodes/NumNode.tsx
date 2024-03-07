import { Handle, Position } from "reactflow";

export function NumNode(nodeData){
	const{sourceHandle,targetHandle}=nodeData;
	
	const val=nodeData.data.val
	return (
		<>
		<div className="cal-nodes cal-nodes space-y-5 bg-gray-600 text-center rounded-lg " style={{width:'100px'}}>
			<div className="p-3 shadow rounded-lg">
				<h3 className="text-lg text-white font-bold">{val}</h3>
			</div>
			<Handle type="target" id={targetHandle} position={Position.Left}/>
			<Handle type="source" id={sourceHandle} position={Position.Right}/>
		</div>
		</>
	)
}