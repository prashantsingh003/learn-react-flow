import { Outlet, useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import './layout.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/authSlice/authSlice';
import { RootState } from '../store';
import {ClickOutside} from '../hooks'


export function Layout() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [expanded, setExpanded] = useState(false);
	const isAuthenticated = useSelector((state: RootState) => !!state.auth.user)
	useEffect(() => navigate('/file'), [])
	return (
		<div className='sm:rounded-2xl flex flex-col h-screen sm:h-auto pt-3 px-3 sm:px-16 bg-white drop-shadow-2xl sm:my-8'>
			<nav className=''>
				<div className="mx-auto">
					<div className="relative h-16 items-center flex justify-between">
						<div className="absolute left-0 flex items-center md:hidden">
							<button onClick={() => setExpanded(prev => !prev)} className='flex items-center justify-center rounded-md p-1 text-gray-400 hover:bg-gray-700 hover:text-white'>
								<svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
									<path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
								</svg>
								<svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
									<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
								</svg>
							</button>
						</div>
						<div className="flex flex-1 items-center justify-center md:justify-start">
							<div className="flex flex-shrink-0">
								<NavLink
									to="/landing"
									className={({ isActive }) =>
										` ${isActive ? 'text-blue-500' : 'text-blue-500'}
										text-center text-2xl font-bold rounded-lg`
									}
								>
									Logo
								</NavLink>
								{/* <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company"/> */}
							</div>
							<div className="hidden md:block mx-3">
								<div className="flex space-x-3">
									<NavLink
										to="/flow"
										className={({ isActive }) =>
											` ${isActive ? 'text-blue-500' : 'text-gray-600'}
										hover:text-blue-600 font-medium py-2 px-3 text-md hover:scale-95 duration-100 rounded-lg`
										}
									>
										Flow
									</NavLink>
									<NavLink
										to="/dragdrop"
										className={({ isActive }) =>
											` ${isActive ? 'text-blue-500' : 'text-gray-600'}
										hover:text-blue-600 font-medium py-2 px-3 text-md hover:scale-95 duration-100 rounded-lg`
										}
									>
										Drag&Drop
									</NavLink>
									<NavLink
										to="/flow-calculator"
										className={({ isActive }) =>
											` ${isActive ? 'text-blue-500' : 'text-gray-600'}
										hover:text-blue-600 font-medium py-2 px-3 text-md hover:scale-95 duration-100 rounded-lg`
										}
									>
										Calculator
									</NavLink>
									<NavLink
										to="/mantine-form"
										className={({ isActive }) =>
											` ${isActive ? 'text-blue-500' : 'text-gray-600'}
										hover:text-blue-600 font-medium py-2 px-3 text-md hover:scale-95 duration-100 rounded-lg`
										}
									>
										Mantine Form
									</NavLink>
									<NavLink
										to="/calculator"
										className={({ isActive }) =>
											` ${isActive ? 'text-blue-500' : 'text-gray-600'}
										hover:text-blue-600 font-medium py-2 px-3 text-md hover:scale-95 duration-100 rounded-lg`
										}
									>
										User Calculator
									</NavLink>
									<NavLink
										to="/file"
										className={({ isActive }) =>
											` ${isActive ? 'text-blue-500' : 'text-gray-600'}
										hover:text-blue-600 font-medium py-2 px-3 text-md hover:scale-95 duration-100 rounded-lg`
										}
									>
										File Op
									</NavLink>
								</div>
							</div>
						</div>
						<div className="relative flex items-center">
							{isAuthenticated ?
								<>
									<button
										onClick={() => {
											dispatch(logout());
											navigate('/login')
										}} className="py-2 px-3 rounded-lg text-white bg-blue-500 font-medium w-21 hover:scale-95">Log Out</button>
								</> :
								<>
									<NavLink to="/login" className="py-2 px-3 rounded-lg text-gray-700 font-medium w-20 hover:scale-95 duration-100">Login</NavLink>
									<NavLink to="/signup" className="py-2 px-3 rounded-lg text-white bg-blue-500 font-medium w-21 hover:scale-95 duration-100">Sign up</NavLink>
								</>
							}
						</div>
					</div>
				</div>
				<ClickOutside onClickOutside={()=>{setExpanded(false)}}>
					<div className={`sm:hidden ${expanded ? '' : 'hidden'} absolute z-10 bg-white drop-shadow-lg`}>
						<div className="space-y-1 p-2">
							<NavLink
								to="/flow"
								className={({ isActive }) =>
									` ${isActive ? 'text-blue-500' : 'text-gray-600'}
								hover:text-blue-600 px-3 py-2 text-md block rounded-lg text-base font-medium`
								}
							>
								Flow
							</NavLink>
							<NavLink
								to="/dragdrop"
								className={({ isActive }) =>
									` ${isActive ? 'text-blue-500' : 'text-gray-600'}
								hover:text-blue-600 px-3 py-2 text-md block rounded-lg text-base font-medium`
								}
							>
								Drag&Drop
							</NavLink>
							<NavLink
								to="/flow-calculator"
								className={({ isActive }) =>
									` ${isActive ? 'text-blue-500' : 'text-gray-600'}
								hover:text-blue-600 px-3 py-2 text-md block rounded-lg text-base font-medium`
								}
							>
								Calculator
							</NavLink>
							<NavLink
								to="/mantine-form"
								className={({ isActive }) =>
									` ${isActive ? 'text-blue-500' : 'text-gray-600'}
								hover:text-blue-600 px-3 py-2 text-md block rounded-lg text-base font-medium`
								}
							>
								Mantine Form
							</NavLink>
							<NavLink
								to="/calculator"
								className={({ isActive }) =>
									` ${isActive ? 'text-blue-500' : 'text-gray-600'}
								hover:text-blue-600 px-3 py-2 text-md block rounded-lg text-base font-medium`
								}
							>
								User Calculator
							</NavLink>
							<NavLink
								to="/file"
								className={({ isActive }) =>
									` ${isActive ? 'text-blue-500' : 'text-gray-600'}
								hover:text-blue-600 px-3 py-2 text-md block rounded-lg text-base font-medium`
								}
							>
								File Op
							</NavLink>
						</div>
					</div>
				</ClickOutside>
			</nav>
			<div className="w-full flex flex-col sm:flex-row h-full flex-grow overflow-hidden" style={{ maxHeight: "980px" }}>
				<main role="main" className="w-full flex-grow my-3 overflow-auto">
					<Outlet></Outlet>
				</main>
			</div>
			<footer className="">
				<div className="text-center text-sm text-gray-400 font-medium">
					Trusted by individuals and teams at the world's <br/>
					best companies.
				</div>
				<div className='flex flex-wrap-space-x-3 items-center justify-center'>
					<div className="text-gray-400 font-bold p-2 text-xl">Logo</div>
					<div className="text-gray-400 font-bold p-2 text-xl">Logo</div>
					<div className="text-gray-400 font-bold p-2 text-xl">Logo</div>
					<div className="text-gray-400 font-bold p-2 text-xl">Logo</div>
					<div className="text-gray-400 font-bold p-2 text-xl">Logo</div>
				</div>
			</footer>
		</div>
	)
}