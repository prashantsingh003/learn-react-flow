import React, { useState } from "react"
import { useDispatch } from "react-redux";
import { Handle, Node, Position } from "reactflow"
import { AppDispatch } from "../../../store";
import { updateNodeVal } from "../../../store/slices/flowManagement/flowManagementSlice";

export function OperatorNode(node:Node){
	const dispatch=useDispatch<AppDispatch>()
	const {data,id:nodeId}=node;
	const {sourceHandle,targetHandle,val}=data;
	const handleValChange=((e:React.ChangeEvent<HTMLInputElement>)=>
	{
		dispatch(updateNodeVal({nodeId,val:String(e.currentTarget.value)}))
	})
	return (
		
	<div className="text-slate-900 p-3 bg-red-300">
		<select
			onChange={handleValChange}
			value={val?val:'add'}
			className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
		>
			<option value="">Select an operation</option>
			<option value="add">Add</option>
			<option value="subtract">Subtract</option>
			<option value="multiply">Multiply</option>
			<option value="divide">Divide</option>
		</select>
		<Handle type="target" className="bg-white rounded-full" id={''+targetHandle} position={Position.Left}/>
		<Handle type="source" className="bg-white rounded-full" id={''+sourceHandle} position={Position.Right}/>
	</div>
	)
}