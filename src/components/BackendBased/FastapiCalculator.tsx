import { useDispatch, useSelector } from "react-redux";
import React, { useCallback, useEffect } from "react";
import axios from 'axios';
import { NavLink } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import { FlowCalculator } from "./FlowCalculator";
import { ReactFlowProvider } from "reactflow";
import { useState } from "react";
import { FlowData, getSelectedFlowData, getUserFlows } from "../../store/slices/flowManagement/flowManagementSlice";
import { FlowOption } from "./FlowOption";
import { createFlowApi, deleteFlowApi, flowApi, renameFlowApi, updateFlowApi } from "../../utils/api";
import { FlowContextProvider } from "./context/FlowContext";
import { NodeOptions } from "./NodeOptions";

export function FastapoiCalculator() {
	const isAuthenticated = useSelector((state: RootState) => !!state.auth.user)
	const dispatch = useDispatch<AppDispatch>();
	const { userFlowList: flowOptions } = useSelector((state: RootState) => state.userFlow)
	const { user } = useSelector((state: RootState) => state.auth)
	const {currentFlow}=useSelector((state:RootState)=>state.userFlow)

	const [selectedFlow, setSelectedFlow] = useState<FlowData | null>(null)
	const [msg, setMsg] = useState<{ msg: String, error:Boolean } | null>(null)

	const refreshFlowsList = () => user && dispatch(getUserFlows(user.id))

	const renameFlow = (flow_name: String) => {
		if (!selectedFlow) return;
		axios.put(renameFlowApi + selectedFlow.id, { flow_name })
			.then((res: any) => {
				refreshFlowsList()
				setMsg({ msg: 'Successfully Updated Name to ' + flow_name, error:false })
			})
			.catch((err: Error) => {
				console.log('unable to rename flow')
				console.error(err)
				setMsg({ msg: 'Oops!! Error occured while renaming, please try again', error:true })
			})
	}

	const deleteFlow = () => {
		if (!selectedFlow) return;
		if (!confirm("Delete flow: " + selectedFlow.name + " ?")) return;
		axios.delete(deleteFlowApi + selectedFlow.id)
			.then((res: any) => {
				refreshFlowsList()
				setSelectedFlow(null)
				setMsg({ msg: 'Successfully Deleted Flow : ' + selectedFlow.name, error:false })
			})
			.catch((err: Error) => {
				console.log('unable to delete flow')
				console.error(err)
				setMsg({ msg: 'Oops!! Error occured deleting flow', error:true })
			})
	}

	const updateFlow=()=>{
		if (!currentFlow || !selectedFlow) return;
		const flow={nodes:currentFlow.nodes,edges:currentFlow.edges}
		axios.put(updateFlowApi + selectedFlow.id,flow)
			.then((res: any) => {
				setMsg({ msg: 'Successfully Updated Flow : ' + selectedFlow.name, error:false })
			})
			.catch((err: Error) => {
				console.log('unable to delete flow')
				console.error(err)
				setMsg({ msg: 'Oops!! Error occured updateing flow', error:true })
			})
	}
	const addNewFlow = () => {
		const newFlow = {
			nodes: [],
			edges: [],
			owner_id: user?.id
		}
		axios.post(createFlowApi + user?.id, newFlow)
			.then(res => {
				refreshFlowsList()
				setMsg({ msg: 'Successfully Added Flow ', error:false })
			})
			.catch((err: Error) => {
				setMsg({ msg: 'Oops!! Error occured while adding flow, please try again', error:true })
			})
	}
	const refreshFlow=()=>{
		dispatch(getSelectedFlowData(selectedFlow?.id))
	}
	useEffect(() => {
		dispatch(getSelectedFlowData(selectedFlow?.id))
	}
		, [selectedFlow])

	useEffect(() => {
		setSelectedFlow(prev => {
			const updatedSelectedFlow = flowOptions.find(el => el.id == prev?.id)
			return updatedSelectedFlow ? updatedSelectedFlow : prev;
		})
	}
		, [flowOptions])

	if (isAuthenticated) {
		return (
			<FlowContextProvider value={{addNewFlow, updateFlow, deleteFlow, refreshFlow, renameFlow}}>
			<div className="flex flex-col gap-y-2">
				<div className="">
					<FlowOption
						flowOptions={flowOptions}
						selectedFlow={selectedFlow}
						setSelectedFlow={setSelectedFlow}
						onFlowRename={renameFlow}
					></FlowOption>
				</div>
				<div className="grow">
					{currentFlow ?
						<ReactFlowProvider>
							<NodeOptions selectedFlow={selectedFlow}></NodeOptions>
							<FlowCalculator onSaveFlow={updateFlow} refreshFlow={refreshFlow}></FlowCalculator>
						</ReactFlowProvider>
						:
						<div className="items-center flex justify-center p-2 h-20 md:h-56">
							<div className="text-white bg-blue-500 text-2xl p-3 rounded-lg drop-shadow-2xl hover:scale-105 duration-100">
								Please select a flow
							</div>
						</div>
					}
				</div>
				{msg &&
					<div>
						<div className={`${msg.error?'border-red-600 text-red-600 bg-red-100':'border-green-600 text-green-600 bg-green-100'}
						border rounded-lg w-full p-2 text-center relative`}>
							{msg.msg}
							<button onClick={() => { setMsg(null) }} className="border border-slate-600 text-slate-600 bg-slate-100 absolute h-full aspect-square p-1 rounded-lg right-0 top-0">X</button>
						</div>
					</div>
				}
			</div>
			</FlowContextProvider>
		)
	}
	else {
		return (
			<div className="flex flex-col items-center justify-center h-full">
				<div className="max-w-md p-6 bg-gray-100 border border-gray-300 rounded-lg text-center">
					<p className="mb-4">Please login to continue</p>
					<NavLink to="/login" className="mb-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
						Click here to login
					</NavLink>
					<p>Don't have an account? <NavLink to="/signup" className="text-blue-500 hover:underline" >Sign up</NavLink></p>
				</div>
			</div>
		)
	}
}