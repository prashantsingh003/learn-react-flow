// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { Flow,DragDrop, Calculator } from './components'
import './App.css'
import { ReactFlowProvider } from 'reactflow'
import { Provider } from 'react-redux'
import { store } from './store'

function App() {
  // const [count, setCount] = useState(0)
  
  return (
    <>
    {/* <div><Flow></Flow></div> */}
    <div>
      {/* <DragDrop></DragDrop> */}
      <Provider store={store}>
        <ReactFlowProvider>
          <Calculator></Calculator>
        </ReactFlowProvider>
      </Provider>
    </div>
    </>
  )
}

export default App
