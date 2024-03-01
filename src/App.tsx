
import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';

import { Flow,DragDrop, Calculator,AppForm } from './components'
import './App.css'
import { ReactFlowProvider } from 'reactflow'
import { Provider } from 'react-redux'
import { store } from './store'
import { useState } from 'react';

function App() {
  const [tab, setTab] = useState<String>('calculator')
  const conditionalRender=()=>{
    switch(tab){
      case 'turboflow':
        return (<div><Flow></Flow></div>)
      case 'dnd':
        return (<DragDrop></DragDrop>)
      case 'mantine':
        return (<AppForm/>)
      default:
        return (
          <div style={{width:'clamp("min-content",50%,100%)',margin:'auto'}}>
            <Provider store={store}>
              <ReactFlowProvider>
                <Calculator></Calculator>
              </ReactFlowProvider>
            </Provider>
          </div>
        )
    }
  }
  return (
    <MantineProvider>
      <header>
        <div className="flex">
          
          <div className={`flex-1`} onClick={()=>setTab('turboflow')} draggable>
            <button className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4">
              TurboFlow
            </button>
          </div>
          <div className="flex-1" onClick={()=>setTab('dnd')} draggable>
            <button className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4">
              Simple drag and drop
            </button>
          </div>
          <div className="flex-1" onClick={()=>setTab('calculator')} draggable>
            <button className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4">
            React Flow Calculator
            </button>
          </div>
          <div className="flex-1" onClick={()=>setTab('mantine')} draggable>
            <button className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4">
              Mantime
            </button>
          </div>
        </div>
      </header>
      <div className='d-flex justify-center align-middle'>
        {conditionalRender()}
      </div>
    </MantineProvider>
  )
}

export default App
