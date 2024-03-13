import { FlowData } from "../../store/slices/flowManagement/flowManagementSlice";
import { useFlowContext } from "./context/FlowContext";
import { FaRegTrashCan } from "react-icons/fa6";
import { MdOutlineSaveAlt } from "react-icons/md";
import { BiSolidAddToQueue } from "react-icons/bi";
interface FlowCrudOptionsProps {
	selectedFlow: FlowData | null;
}
export function FlowCrudOptions({selectedFlow }: FlowCrudOptionsProps){
	const {updateFlow,deleteFlow,addNewFlow}=useFlowContext()
	return (
		<div className="flex justify-end md:justify-between space-x-1">
		{selectedFlow && <><abbr title="Save">
			<button className="hover:scale-95 duration-100 md:m-0 rounded-lg p-2 text-lg text-gray-500 font-bold" onClick={() => { updateFlow() }}>
				<MdOutlineSaveAlt/>
			</button>
		</abbr>
			<abbr title='Delete'>
				<button className="hover:scale-95 duration-100 md:m-0 rounded-lg p-2 text-lg text-gray-500 font-bold" onClick={() => { deleteFlow() }}>
					<FaRegTrashCan/>
				</button>
			</abbr>
		</>}
		<abbr title='Add Flow'>
			<button className="hover:scale-95 duration-100 md:m-0 rounded-lg p-2 text-lg text-gray-500 font-bold" onClick={() => { addNewFlow() }}>
				<BiSolidAddToQueue/>
			</button>
		</abbr>
	</div>
	)
}