import { Calculator } from "./Calculator"
import { ReactFlowProvider } from 'reactflow'
export function CalculatorParent(){
	return (
		<ReactFlowProvider>
			<Calculator></Calculator>
		</ReactFlowProvider>
	)
}