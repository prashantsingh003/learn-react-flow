import { Outlet, useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import './layout.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/authSlice/authSlice';
import { RootState } from '../store';


export function Layout() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [isAccountOpen, setIsAccountOpen] = useState(false);
	const [expanded, setExpanded] = useState(false);
	const isAuthenticated = useSelector((state: RootState) => !!state.auth.user)

	const hideOptionsClass=` ${expanded?'':'hidden'} md:block `
	const listClass = "border border-gray-300 p-4 hover:bg-gray-100 transition duration-300 rounded-lg"
	const linkClass = "block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0"
	const logOutClass = "block py-2 pr-4 pl-3 text-red-700 duration-200 border-b border-gray-100 hover:text-red-400 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0"
	useEffect(() => navigate('/calculator'), [])
	return (
		<div>
			<header className='my-1'>
				<h1 className='p-2 font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center text-gray-500'>
					REACT FLOW
				</h1>
			</header>
			<div className="w-full flex flex-col sm:flex-row h-full flex-grow overflow-hidden" style={{ maxHeight: "980px" }}>
				<div className="sm:w-1/4 md:1/6 w-full flex-shrink flex-grow-0 p-4">
					<div className="sticky top-0 p-4 w-full">
						<ul className="flex flex-col space-y-4">
							<li className={listClass} onClick={() => setIsAccountOpen((prev: Boolean) => !prev)}>
								<button className={linkClass}>
									Account
								</button>
							</li>
							{isAccountOpen && (
								<div className="pl-4">
									{!isAuthenticated &&
										(<>
											<li className={listClass}>
												<NavLink
													to="/login"
													className={({ isActive }) =>
														` ${isActive ? 'text-orange-700' : 'text-gray-700'} ${linkClass}`
													}
												>
													Login
												</NavLink>
											</li>
											<li className={listClass}>
												<NavLink
													to="/signup"
													className={({ isActive }) =>
														` ${isActive ? 'text-orange-700' : 'text-gray-700'} ${linkClass}`
													}
												>
													Sign Up
												</NavLink>
											</li>
										</>)
									}
									{isAuthenticated && <li className={listClass}>
										<button
											onClick={() => {
												dispatch(logout());
												navigate('/login')
											}}
											className={`${logOutClass}`}
										>
											Log Out
										</button>
									</li>}
								</div>
							)}

							<li className={listClass + hideOptionsClass}>
								<NavLink
									to="/flow"
									className={({ isActive }) =>
										` ${isActive ? 'text-orange-700' : 'text-gray-700'} ${linkClass}`
									}
								>
									Flow
								</NavLink>
							</li>
							<li className={listClass + hideOptionsClass}>
								<NavLink
									to="/dragdrop"
									className={({ isActive }) =>
										` ${isActive ? 'text-orange-700' : 'text-gray-700'} ${linkClass}`
									}
								>
									Drag & Drop
								</NavLink>
							</li>
							<li className={listClass + hideOptionsClass}>
								<NavLink
									to="/flow-calculator"
									className={({ isActive }) =>
										` ${isActive ? 'text-orange-700' : 'text-gray-700'} ${linkClass}`
									}
								>
									Flow Calculator
								</NavLink>
							</li>
							<li className={listClass + hideOptionsClass}>
								<NavLink
									to="/mantine-form"
									className={({ isActive }) =>
										` ${isActive ? 'text-orange-700' : 'text-gray-700'} ${linkClass}`
									}
								>
									Mantine From
								</NavLink>
							</li>
							<li className={listClass + hideOptionsClass}>
								<NavLink
									to="/calculator"
									className={({ isActive }) =>
										` ${isActive ? 'text-orange-700' : 'text-gray-700'} ${linkClass}`
									}
								>
									Backend Calculator
								</NavLink>
							</li>
							<li className={listClass+" md:hidden"} onClick={() => setExpanded((prev: Boolean) => !prev)}>
								<button className={linkClass + ' text-center'}>
									{expanded ? 'Hide' : 'Show'} Options
								</button>
							</li>
						</ul>
					</div>
				</div>
				<main role="main" className="w-full h-full flex-grow p-3 overflow-auto">
					<Outlet></Outlet>
				</main>
			</div>
			<footer className="mt-auto">
				...
			</footer>
		</div>
	)
}