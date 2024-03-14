import { Handle, Node, NodeProps, Position } from "reactflow";
import { BiExpandAlt ,BiCollapseAlt} from "react-icons/bi";
import { MdOutlineInput } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { createFlowVariable, toggleExpandedNode } from "../../../store/slices/fileOpFlow/fileOpFlowSlice";
import { useEffect, useState } from "react";
export type InputNodeProps={
	expanded:Boolean;
}
export function CodeNode(node:NodeProps<InputNodeProps>){
	const [codeImp,setCodeImp]=useState<String>('')
	const {flowVariables:flowVars}=useSelector((state:RootState)=>state.tsk4)
	const {data,id:nodeId}=node;
	const {expanded}=data;
	const dispatch=useDispatch<AppDispatch>()
	useEffect(()=>{
		const vars=[{
			name:"code",
			value:null,
			editable:false
		},{
			name:"output",
			value:null,
			editable:false
		}]
		const nameSet=new Set(flowVars.map(v=>v.name))
		vars.forEach(v=>{
			if(!nameSet.has(v.name)){
				dispatch(createFlowVariable(v))
			}
		})
	},[])
	const getNodeBody=()=>{
		if (expanded){
			return(
				<>
					<div className="icon"><MdOutlineInput/></div>
					<div>
						<div className="title">Code Block</div>
						<div className="relative h-10 w-full my-2">
							<select
								name="fileData"
								value={''+codeImp}
								onChange={e=>setCodeImp(e.target.value)}
								className="peer w-full min-w-40 rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-300 focus:border-2 focus:border-gray-300 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50">
								{flowVars.map(v=>(
									<option className="bg-[var(--bg-color)] text-white" key={''+v.name} value={v.value}>{v.name}</option>
								))}
							</select>
							<label
								className="my-1 before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-300 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-300 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-300 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
								File Data
							</label>
						</div>
					</div>
				</>
			)
		}
		else{
			return (
				<>
					<div className="icon"><MdOutlineInput/></div>
					<div>
						<div className="title">Input</div>
					</div>
				</>
			)
		}
	}
	return (
		<>
			<div className="cloud gradient">
				<div onClick={()=>dispatch(toggleExpandedNode(nodeId))}>
					{expanded?<BiCollapseAlt/>:<BiExpandAlt/>}
				</div>
			</div>
			<div className="wrapper gradient">
				<div className="inner">
					<div className="body">
						{getNodeBody()}
					</div>
					<Handle type="target" position={Position.Left}/>
					<Handle type="source" position={Position.Right}/>
				</div>
			</div>
		</>
	)
}