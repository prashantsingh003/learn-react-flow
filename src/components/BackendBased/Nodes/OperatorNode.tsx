import { useState } from "react"

export function OperatorNode(node){
	const [selectedOption,setSelectedOption]=useState()
	return (
		<select
			value={selectedOption}
			onChange={(e)=>setSelectedOption(e.target.value)}
			className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
		>
			<option value="">Select an operation</option>
			<option value="add">Add</option>
			<option value="subtract">Subtract</option>
			<option value="multiply">Multiply</option>
			<option value="divide">Divide</option>
		</select>
	)
}