import { useSelector } from "react-redux";
import {NavLink} from "react-router-dom";
import { RootState } from "../../store";
import { FlowCalculator } from "./FlowCalculator";
import { ReactFlowProvider } from "reactflow";

export function FastapoiCalculator(){
	const isAuthenticated=useSelector((state:RootState)=>!!state.auth.user)
	const {userFlowList}=useSelector((state:RootState)=>state.userFlow)
	if(isAuthenticated){
		return (
			<div className="flex flex-col gap-y-2">
				<div className="flex justify-between">
					<div className="rounded-lg p-2 bg-gray-300 text-lg">Select Flow</div>
					<div>
						<select
							className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
							defaultValue="unnamed"
						>
							{userFlowList.map((option, index) => (
								<option key={index}>{option.name}</option>
							))}
						</select>
					</div>
				</div>
				<div className="grow">
					<ReactFlowProvider>
						<FlowCalculator></FlowCalculator>
					</ReactFlowProvider>
				</div>
			</div>
		)
	}
	else{
		return (
			<div className="flex flex-col items-center justify-center h-screen">
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