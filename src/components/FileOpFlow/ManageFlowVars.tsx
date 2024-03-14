import { useDispatch, useSelector } from "react-redux"
import { BiSolidAddToQueue } from "react-icons/bi";
import { FaRegTrashCan } from "react-icons/fa6";
import styles from './fileOpFlow.module.scss'
import { MdCancel } from "react-icons/md";
import { AppDispatch, RootState } from "../../store";
import React, { useState } from "react";
import { createFlowVariable, removeFlowVariable } from "../../store/slices/fileOpFlow/fileOpFlowSlice";
export function ManageFlowVars(){
	const dispatch=useDispatch<AppDispatch>()
	const {flowVariables:flowVars}=useSelector((state:RootState)=>state.tsk4)
	const [formData, setFormData] = useState({
    name: '',
    value: '',
		editable:false
  });
	const [addingVar,setAddingVar]=useState<Boolean>(false)
	const handleFormSumbit=(e:React.FormEvent)=>{
		e.preventDefault();
		dispatch(createFlowVariable(formData))
		setFormData({
			name: '',
			value: '',
			editable:false
		})
	}
	const deleteVar=(varName:String)=>{
		dispatch(removeFlowVariable(varName))
	}

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
	return (
		<div className="p-2">
			<div className="flex justify-between">
				<div className="text-xl">Flow Variables</div>
				<div>
					<abbr title={!addingVar?'Add variable':'Cancel'}>
						<button className="hover:scale-95 duration-100 md:m-0 rounded-lg p-2 text-lg text-gray-500 font-bold" onClick={() => { setAddingVar(prev=>!prev) }}>
							{addingVar?<MdCancel/>:<BiSolidAddToQueue/>}
						</button>
					</abbr>
				</div>
			</div>
			<div className={`${addingVar?'':'hidden'} my-2`}>
				<form onSubmit={handleFormSumbit} className="flex justify-between space-x-3 flex-wrap">
					<input type="text" className="p-1 text-gray-700 rounded-lg border border-gray-500" placeholder="Name" name="name" value={formData.name} onChange={handleFormChange}/>
					<input type="text" className="p-1 text-gray-700 rounded-lg border border-gray-500" placeholder="Value" name="value" value={formData.value} onChange={handleFormChange}/>
					<label>
						<input type="checkbox" name="editable" onChange={()=>setFormData(prev=>({ ...formData, editable: !prev.editable }))}/>
						Editable
					</label>
					<button type="submit" className="bg-blue-500 p-1 text-sm rounded-md text-white">Add</button>
				</form>
			</div>
			<div className={`${flowVars.length?'':'hidden'}`}>
				<table className={`table-auto w-full `+styles.varsTable}>
					<thead className="bg-gray-200 text-lg">
						<tr>
							<th>Name</th>
							<th>Value</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody className="">
						{flowVars.map(v=>{
							return (
								<tr key={''+v.name} className="bg-gray-100 hover:bg-color-white">
									<td>{v.name}</td>
									<td>{v.value}</td>
									<td>
										<div className="flex justify-around items-centers space-x-2">
											<button className="p-1 border border-gray-500 rounded-md duration-100 scale-95" onClick={()=>deleteVar(v.name)}><FaRegTrashCan/></button>
										</div>
									</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
		</div>
	)
}