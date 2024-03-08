import React, { useEffect, useState } from "react";
import { FlowData } from "../../store/slices/flowManagement/flowManagementSlice"
interface FlowOptionProps {
	flowOptions: FlowData[];
	selectedFlow: FlowData | null;
	setSelectedFlow: React.Dispatch<React.SetStateAction<FlowData | null>>
	onFlowRename:Function;
	onDeleteFlow:Function;
	onAddNewFlow:Function;
}

export function FlowOption({ flowOptions, selectedFlow, setSelectedFlow, onFlowRename, onDeleteFlow, onAddNewFlow }: FlowOptionProps) {
	const [flowName,setFlowname]=useState<String>()
	const handleSelectFlow = ((e: React.ChangeEvent<HTMLSelectElement>) => {
		const flow = flowOptions.find(el => el.id == e.currentTarget.value)
		if (flow) setSelectedFlow(flow);
		else setSelectedFlow(null)
	})
	useEffect(()=>{
		setFlowname(''+(selectedFlow && selectedFlow.name))}
	,[selectedFlow])
	return (
		<div className="flex flex-col md:flex-row justify-between align-middle">
			{ Boolean(flowOptions.length) &&
				<div className="my-2 md:m-0 flex">
					<label htmlFor="selectFlow" className="p-1 flex items-center text-nowrap">Select Flow</label>
					<select
						name="selectFlow"
						// value={''+selectedFlow?.name}
						className="mt-1 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						onChange={(e) => handleSelectFlow(e)}
					>
						<option value="" className="text-gray-500">Select</option>
						{flowOptions.map(optn => (
							<option key={String(optn.id)} value={String(optn.id)}>{optn.name}</option>
						))}
					</select>
				</div>
			}
			{
				selectedFlow &&
					<>
						<div className="my-2 md:m-0 flex">
							<input
								type="text"
								value={'' + flowName}
								onChange={(e) => setFlowname(e.target.value)}
								placeholder="Enter text"
								className="border grow border-gray-300 bg-white rounded-md shadow-sm p-2 mx-1 focus:outline-none focus:border-blue-500"
							/>
							<button className="text-sm bg-green-400 rounded-lg p-2 border-gray-400 text-white" onClick={() => {onFlowRename(flowName)}}>Rename</button>
						</div>
						<button className="my-2 md:m-0 text-sm bg-red-400 rounded-lg p-2 border-gray-400 text-white" onClick={() => {onDeleteFlow()}}>Delete</button>
					</>
			}
			<button className="my-2 md:m-0 text-sm bg-blue-400 rounded-lg p-2 border-gray-400 text-white" onClick={() => { onAddNewFlow() }}>Add New Flow</button>
		</div>
	)
}