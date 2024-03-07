import { useSelector } from "react-redux";
import {NavLink} from "react-router-dom";
import { RootState } from "../../store";
import { FlowCalculator } from "./FlowCalculator";

export function FastapoiCalculator(){
	const isAuthenticated=useSelector((state:RootState)=>!!state.auth.user)
	if(isAuthenticated){
		return (<FlowCalculator/>)
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