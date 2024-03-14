import { ReactNode } from "react";
import { IoMdCheckmark } from "react-icons/io";
export type AppChipProps={
	children:ReactNode|null,
	uppercase?:boolean,
	selected?:boolean,
	customClickEvent:Function,
}
export function AppChip({children=null,uppercase=false,selected=false,customClickEvent=()=>{}}:AppChipProps){
	return (
		<div className="inline-block" onClick={()=>customClickEvent()}>
			<div className={`
			${uppercase?'uppercase':''}
			${selected?'bg-blue-500':'bg-gray-700'} 
			relative flex select-none items-center whitespace-nowrap rounded-full text-xs font-bold text-white py-1 px-2`}>
				{selected && <span className="mr-1"><IoMdCheckmark/></span>}
				{children}
			</div>
		</div>
	)
}