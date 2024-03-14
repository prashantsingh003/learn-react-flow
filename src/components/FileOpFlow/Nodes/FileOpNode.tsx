import { Handle, Node, NodeProps, Position } from "reactflow";
import { FaFileCode } from "react-icons/fa";
import { BiExpandAlt, BiCollapseAlt } from "react-icons/bi";
import { toggleExpandedNode } from "../../../store/slices/fileOpFlow/fileOpFlowSlice";
import { AppDispatch, RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { AppChip } from "../..";
import React, { useState } from "react";
export type FileOpNodeProps = {
	expanded: Boolean;
}
export function FileOpNode(node: NodeProps<FileOpNodeProps>) {
	const [formData, setFormData] = useState({
    fileName: '',
    savePath: '',
		fileType:'',
		fileData:''
  });
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
	const {flowVariables:flowVars}=useSelector((state:RootState)=>state.tsk4)
	const { data, id: nodeId } = node;
	const [writeInp, setWriteInp] = useState<String>('')
	const { expanded } = data;
	const [selectedChip, setSelectedChip] = useState<String | null>(null)
	const dispatch = useDispatch<AppDispatch>()
	const getNodeBody = () => {
		if (expanded) {
			return (
				<>
					<div className="icon"><FaFileCode /></div>
					<div>
						<div className="title text-lg">File Operation Node</div>
						<div className="my-2">
							<AppChip
								customClickEvent={() => setSelectedChip(prev => prev == 'read' ? null : 'read')}
								selected={selectedChip == 'read'}
							>Read</AppChip>
							<AppChip
								customClickEvent={() => setSelectedChip(prev => prev == 'write' ? null : 'write')}
								selected={selectedChip == 'write'}
							>Write</AppChip>
						</div>
						<div>
							<div className={`${selectedChip == 'read'?'':'hidden'}`}>
								<input
									type="text"
									name=""
									value={'' + writeInp}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWriteInp(e.target.value)}
									placeholder="Text"
									className={`w-full p-1 my-1 border border-gray-200 rounded-lg bg-[var(--bg-color)] text-gray-200`}
									id=""
								/>
							</div>

							<form action="" className={`${selectedChip == 'write'?'':'hidden'} flex flex-col justify-between space-y-2`}>
								<input
									type="text"
									name="fileName"
									value={formData.fileName}
									onChange={handleFormChange}
									placeholder="file name"
									className="w-full p-1 my-1 border border-gray-200 rounded-lg bg-[var(--bg-color)] text-gray-200"
									id=""
								/> 
								<input
									type="text"
									name="savePath"
									value={formData.savePath}
									onChange={handleFormChange}
									placeholder="save path"
									className="w-full p-1 my-1 border border-gray-200 rounded-lg bg-[var(--bg-color)] text-gray-200"
									id=""
								/>
								<input
									type="text"
									name="fileType"
									value={formData.fileType}
									onChange={handleFormChange}
									placeholder="file type"
									className="w-full p-1 my-1 border border-gray-200 rounded-lg bg-[var(--bg-color)] text-gray-200"
									id=""
								/>
								<div className="relative h-10 w-full">
									<select
										name="fileData"
										value={formData.fileData}
										onChange={handleFormChange}
										className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-300 focus:border-2 focus:border-gray-300 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50">
										{flowVars.map(v=>(
											<option className="bg-[var(--bg-color)] text-white" key={''+v.name} value={v.value}>{v.name}</option>
										))}
									</select>
									<label
										className="my-1 before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-300 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-300 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-300 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
										File Data
									</label>
								</div>
							</form>
						</div>
					</div>
				</>
			)
		}
		else {
			return (
				<>
					<div className="icon"><FaFileCode /></div>
					<div>
						<div className="title text-lg">File Op</div>
					</div>
				</>
			)
		}
	}
	return (
		<>
			<div className="cloud gradient">
				<div onClick={() => { dispatch(toggleExpandedNode(nodeId)) }}>
					{expanded ? <BiCollapseAlt /> : <BiExpandAlt />}
				</div>
			</div>
			<div className="wrapper gradient">
				<div className="inner">
					<div className="body">
						{getNodeBody()}
					</div>
					<Handle type="target" position={Position.Left} />
					<Handle type="source" position={Position.Right} />
				</div>
			</div>
		</>
	)
}