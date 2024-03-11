import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Handle, Node, Position } from "reactflow";
import { AppDispatch } from "../../../store";
import { updateNodeVal } from "../../../store/slices/flowManagement/flowManagementSlice";
export function NumNode(node:Node){
	const {data,id:nodeId}=node;
	const dispatch=useDispatch<AppDispatch>()
	const{sourceHandle,targetHandle,val}=data;
	const handleValChange=((e:React.ChangeEvent<HTMLInputElement>)=>
	{
		dispatch(updateNodeVal({nodeId,val:Number(e.currentTarget.value)}))
	})
	return (
		<>
		<div className="text-slate-900 cal-nodes cal-nodes space-y-5 bg-gray-600 text-center rounded-lg " style={{width:'100px'}}>
			<div className="p-3 shadow rounded-lg">
				<h3 className="text-lg text-white font-bold">{val}</h3>
				<input type="number" className="w-full" value={+val} onChange={handleValChange} onFocus={(event) => event.target.select()}/>
			</div>
			<Handle type="target" className="bg-white rounded-full" id={''+targetHandle} position={Position.Left}/>
			<Handle type="source"  className="bg-white rounded-full"id={''+sourceHandle} position={Position.Right}/>
		</div>
		</>
	)
}