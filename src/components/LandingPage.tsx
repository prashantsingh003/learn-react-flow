export function LandingPage(){
	return(
		<>
		 <div className="h-full md:grid grid-cols-2">
			<div className="flex flex-col justify-center px-2 md:px-0">
				<div className="text-xs text-gray-400 font-medium tracking-wider">- FREE 30 DAYS TRIAL</div>
				<div className="text-4xl text-gray-800 font-semibold leading-tight my-2">
					The best way <br />
					to showcase<br/>
					your project.<br/>
				</div>
				<div className="text-gray-500 font-medium text-md">Here you can put short description about your project.</div>
				<div className="my-5 flex items-center gap-x-5 text-xs">
					<button className="py-2 px-3 bg-blue-500 rounded-lg text-white border-blue-500 border-2 hover:border-blue-300">Try for free</button>
					<button className="py-2 px-3 rounded-lg border-2 border-gray-500 hover:border-gray-700">See how it works</button>
				</div>
			</div>
			<div className="flex items-center justify-center">
				<img src="./brand-img.png" className='h-full max-h-80' alt="test" />
			</div>
		 </div>
		</>
	)
}