import { FlowData } from "../../store/slices/flowManagement/flowManagementSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useFlowContext } from "./context/FlowContext";
interface FlowCrudOptionsProps {
	selectedFlow: FlowData | null;
}
export function FlowCrudOptions({selectedFlow }: FlowCrudOptionsProps){
	const {updateFlow,deleteFlow,addNewFlow}=useFlowContext()
	return (
		<div className="flex justify-end md:justify-between space-x-1">
		{selectedFlow && <><abbr title="Save">
			<button className="hover:scale-95 duration-100 md:m-0 rounded-lg p-2 text-lg text-gray-500 font-bold" onClick={() => { updateFlow() }}>
				<FontAwesomeIcon icon="fa-solid fa-circle-arrow-down" />
			</button>
		</abbr>
			<abbr title='Delete'>
				<button className="hover:scale-95 duration-100 md:m-0 rounded-lg p-2 text-lg text-gray-500 font-bold" onClick={() => { deleteFlow() }}>
					<FontAwesomeIcon icon="fa-regular fa-trash-can" />
				</button>
			</abbr>
		</>}
		<abbr title='Add Flow'>
			<button className="hover:scale-95 duration-100 md:m-0 rounded-lg p-2 text-lg text-gray-500 font-bold" onClick={() => { addNewFlow() }}>
				<FontAwesomeIcon icon="fa-regular fa-square-plus" />
			</button>
		</abbr>
	</div>
	)
}