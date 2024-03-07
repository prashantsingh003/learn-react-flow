import { createSlice } from "@reduxjs/toolkit";
export type User={
	email:string,
	name:string,
	id:string
}
export type AuthState={user:User|null}
const getUser=()=>{
	const data:string|null=localStorage.getItem('user') ;
	const user:User|null=data && JSON.parse(data)
	return user;
}
const initialState:AuthState={user:getUser()}
const authSlice=createSlice({
	name:'authSlice',
	initialState,
	reducers:{
		setUser(state,{payload}:{payload:User|null}){
			state.user=payload;
			localStorage.setItem('user',JSON.stringify(payload))
		},
		logout(state){
			state.user=null
		}
	}
})

export const {setUser,logout}=authSlice.actions
export default authSlice.reducer