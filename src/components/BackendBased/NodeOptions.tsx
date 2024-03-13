import { FlowData } from "../../store/slices/flowManagement/flowManagementSlice";
import { FlowCrudOptions } from "./FlowCrudOptions";

	
	const onDragStart=(event:any,nodeType:string)=>{	
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
	}
	export type NodeOptionsProps={
		selectedFlow:FlowData|null
	}
	export function NodeOptions({selectedFlow}:NodeOptionsProps) {
	return (
		<>
			<aside className="md:flex justify-between">
				<div className="flex my-1 justify-between md:justify-normal space-x-2 rounded  text-gray-700  text-xs md:text-md">
					<div className={`dndnode output p-2 border-2 border-gray-400 rounded-lg hover:text-blue-500 hover:border-blue-500`} onDragStart={(event) => onDragStart(event, 'num')} draggable>
						Number Node
					</div>
					<div className={`dndnode p-2 border-2 border-gray-400 rounded-lg hover:text-blue-500 hover:border-blue-500`} onDragStart={(event) => onDragStart(event, 'operation')} draggable>
						Operator Node
					</div>
					<div className={`dndnode output p-2 border-2 border-gray-400 rounded-lg hover:text-blue-500 hover:border-blue-500`} onDragStart={(event) => onDragStart(event, 'result')} draggable>
						Result Node
					</div>
				</div>
				<FlowCrudOptions selectedFlow={selectedFlow}></FlowCrudOptions>
			</aside>
		</>
	)
}