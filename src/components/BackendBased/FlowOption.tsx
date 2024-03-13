import React, { useEffect, useState } from "react";
import { FlowData } from "../../store/slices/flowManagement/flowManagementSlice"
import { BiSolidAddToQueue } from "react-icons/bi";
import { useFlowContext } from "./context/FlowContext";
interface FlowOptionProps {
	flowOptions: FlowData[];
	selectedFlow: FlowData | null;
	setSelectedFlow: React.Dispatch<React.SetStateAction<FlowData | null>>
	onFlowRename: Function;
}

export function FlowOption({ flowOptions, selectedFlow, setSelectedFlow, onFlowRename }: FlowOptionProps) {
	const [flowName, setFlowname] = useState<String>()
	const {addNewFlow} =useFlowContext()
	const handleSelectFlow = ((e: React.ChangeEvent<HTMLSelectElement>) => {
		const flow = flowOptions.find(el => el.id == e.currentTarget.value)
		if (flow) setSelectedFlow(prev => {
			// if(prev && confirm('Make sure to save changes made to current flow')) return flow;
			return flow
		});
		else setSelectedFlow(null)
	})
	useEffect(() => {
		setFlowname('' + (selectedFlow && selectedFlow.name))
	}
	,[selectedFlow])
	return (
		<div className="flex flex-col md:flex-row justify-between align-middle">
			{Boolean(flowOptions.length) &&
				<div className="my-2 md:m-0 flex">
					<label htmlFor="selectFlow" className="p-1 flex items-center text-nowrap">Select Flow</label>
					<select
						name="selectFlow"
						// value={''+selectedFlow?.name}
						className="my-1 w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
					<div className="my-1 md:m-0 flex justify-center">
						<input
							type="text"
							value={'' + flowName}
							onChange={(e) => setFlowname(e.target.value)}
							placeholder="Enter text"
							className="border w-full border-gray-300 bg-white rounded-md shadow-sm p-2 mx-1 focus:outline-none focus:border-blue-500"
						/>
						<button className="hover:scale-95 duration-100 font-bold bg-blue-500 rounded-lg p-2 border-gray-400 text-white" onClick={() => { onFlowRename(flowName) }}>Rename</button>
					</div>
				</>
			}

			{!selectedFlow && <abbr title='Add Flow'>
				<button className="hover:scale-95 duration-100 md:m-0 rounded-lg p-2 text-lg text-gray-500 font-bold" onClick={() => { addNewFlow() }}>
					<BiSolidAddToQueue/>
				</button>
			</abbr>}
		</div>
	)
}