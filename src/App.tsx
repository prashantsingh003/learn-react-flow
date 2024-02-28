// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { Flow,DragDrop, CustomFlow, Calculator } from './components'
import './App.css'
import { ReactFlowProvider } from 'reactflow'

function App() {
  // const [count, setCount] = useState(0)
  
  return (
    <>
    {/* <div><Flow></Flow></div> */}
    <div>
      {/* <DragDrop></DragDrop> */}
      <ReactFlowProvider>
      <Calculator></Calculator>
      </ReactFlowProvider>
    </div>
    </>
  )
}

export default App
