import { useDispatch, useSelector } from "react-redux";
import React, { useCallback, useEffect } from "react";
import axios from 'axios';
import {NavLink} from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import { FlowCalculator } from "./FlowCalculator";
import { ReactFlowProvider } from "reactflow";
import { useState } from "react";
import { FlowData, getSelectedFlowData, getUserFlows } from "../../store/slices/flowManagement/flowManagementSlice";
import { FlowOption } from "./FlowOption";
import { createFlowApi, deleteFlowApi, flowApi, renameFlowApi } from "../../utils/api";

export function FastapoiCalculator(){
	const isAuthenticated=useSelector((state:RootState)=>!!state.auth.user)
	const dispatch=useDispatch<AppDispatch>();
	const {userFlowList:flowOptions}=useSelector((state:RootState)=>state.userFlow)
	const {user}=useSelector((state:RootState)=>state.auth)

	const [selectedFlow,setSelectedFlow]=useState<FlowData|null>(null)
	const [msg,setMsg]=useState<{msg:String,type:String} | null>(null)

	const refreshFlowsList=()=>user && dispatch(getUserFlows(user.id))

	const renameFlow=(flow_name:String)=>{
		if(!selectedFlow) return;
		axios.put(renameFlowApi+selectedFlow.id,{flow_name})
		.then((res:any)=>{
			console.log(res)
			refreshFlowsList()
			setMsg({msg:'Successfully Updated Name to '+flow_name,type:'success'})
		})
		.catch((err:Error)=>{
			console.log('unable to rename flow')
			console.error(err)
			setMsg({msg:'Oops!! Error occured while renaming, please try again',type:'error'})
		})
	}

	const deleteFlow=()=>{
		if(!selectedFlow) return;
		if (!confirm("Delete flow: "+selectedFlow.name+" ?")) return;
		axios.delete(deleteFlowApi+selectedFlow.id)
		.then((res:any)=>{
			console.log(res)
			refreshFlowsList()
			setMsg({msg:'Successfully Deleted Flow : '+selectedFlow.name,type:'success'})
		})
		.catch((err:Error)=>{
			console.log('unable to delete flow')
			console.error(err)
			setMsg({msg:'Oops!! Error occured deleting flow',type:'error'})
		})
	}

	const addNewFlow=()=>{
		const newFlow={
			nodes:[],
			edges:[],
			owner_id:user?.id
		}
		axios.post(createFlowApi+user?.id,newFlow)
		.then(res=>{
			console.log(res)
			refreshFlowsList()
			setMsg({msg:'Successfully Added Flow ',type:'success'})
		})
		.catch((err:Error)=>{
			setMsg({msg:'Oops!! Error occured while adding flow, please try again',type:'error'})
		})
	}
	
	useEffect(()=>{
		dispatch(getSelectedFlowData(selectedFlow?.id))
	}
	,[selectedFlow])

	useEffect(()=>{
		setSelectedFlow(prev=>{
			const updatedSelectedFlow=flowOptions.find(el=>el.id==prev?.id)
			return updatedSelectedFlow?updatedSelectedFlow:prev;
		})
	}
	,[flowOptions])

	if(isAuthenticated){
		return (
			<div className="flex flex-col gap-y-2">
				<div className="">
					<FlowOption 
						flowOptions={flowOptions} 
						selectedFlow={selectedFlow} 
						setSelectedFlow={setSelectedFlow}
						onFlowRename={renameFlow}
						onDeleteFlow={deleteFlow}
						onAddNewFlow={addNewFlow}
					></FlowOption>
				</div>
				<div className="grow">
					<ReactFlowProvider>
						<FlowCalculator></FlowCalculator>
					</ReactFlowProvider>
				</div>
				{ msg &&
					<div>
						<div className={`border border-${msg.type=='success'?'green':'red'}-600 text-${msg.type=='success'?'green':'red'}-600 bg-${msg.type=='success'?'green':'red'}-100 rounded-lg w-full p-2 text-center relative`}>
							{msg.msg}
							<button onClick={()=>{setMsg(null)}} className="border border-slate-600 text-slate-600 bg-slate-100 absolute h-full aspect-square p-1 rounded-lg right-0 top-0">X</button>
						</div>
					</div>
				}
			</div>
		)
	}
	else{
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