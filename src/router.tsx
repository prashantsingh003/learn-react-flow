import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import { BasicFlow,DragDrop, Calculator,AppForm,FastapoiCalculator, Login, Signup, LandingPage, FlowControl} from "./components/index.js"
import { Layout } from "./views/Layout.js"

const Router=createBrowserRouter(
  createRoutesFromElements(
		<Route path="/" element={<Layout/>}>
			<Route path="landing" element={<LandingPage/>}/>
			<Route path="flow" element={<BasicFlow/>}/>
			<Route path="dragdrop" element={<DragDrop/>}/>
			<Route path="flow-calculator" element={<Calculator/>}/>
			<Route path="mantine-form" element={<AppForm/>}/>
			<Route path="login" element={<Login/>}/>
			<Route path="signup" element={<Signup/>}/>
			<Route path="calculator" element={<FastapoiCalculator/>}/>
			<Route path="file" element={<FlowControl/>}/>
		</Route>
	)
)
export {Router}