import { ReactNode } from "react"

export type AppToolTipProps={
	children:ReactNode,
	text?:String|null
}
export function AppToolTip({children,text=null}:AppToolTipProps){
	return (
		<div className="relative">
			{children}
		</div>
	)
}