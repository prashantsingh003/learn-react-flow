import { MdOutlineInput } from "react-icons/md";
import { FaFileCode } from "react-icons/fa";
import { IoIosCheckboxOutline } from "react-icons/io";

const onDragStart=(event:any,nodeType:string)=>{	
	event.dataTransfer.setData('application/reactflow', nodeType);
	event.dataTransfer.effectAllowed = 'move';
}
export function NodeOptions({}){
	return (
		<div className="px-1 py-2 space-y-2 flex flex-col justify-start items-center">
			<abbr title="Input Node">
				<div
				 onDragStart={(event) => onDragStart(event, 'inp')} 
				 draggable 
				 className="p-1 rounded-lg border border-gray-400 duration-100 scale-95 text-gray-600 flex items center justify-center">
					<MdOutlineInput/>
				</div>
			</abbr>
			<abbr title="File Operation Node">
				<div
				 onDragStart={(event) => onDragStart(event, 'fileOp')} 
				 draggable 
				 className="p-1 rounded-lg border border-gray-400 duration-100 scale-95 text-gray-600 flex items center justify-center">
					<FaFileCode/>
				</div>
			</abbr>
			{/* <abbr title="Node">
				<div
				 onDragStart={(event) => onDragStart(event, 'inp')} 
				 draggable 
				 className="p-1 rounded-lg border border-gray-400 duration-100 scale-95 text-gray-600 flex items center justify-center">
					<IoIosCheckboxOutline/>
				</div>
			</abbr> */}
		</div>
	)
}