
import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';

import { Flow,DragDrop, Calculator,AppForm } from './components'
import './App.css'
import { ReactFlowProvider } from 'reactflow'
import { Provider } from 'react-redux'
import { store } from './store'

function App() {
  // const [count, setCount] = useState(0)
  
  return (
    <MantineProvider>
      <div className='d-flex justify-center align-middle'>
        {/* <div><Flow></Flow></div> */}
        {/* <DragDrop></DragDrop> */}
        <div style={{width:'clamp("min-content",50%,100%)',margin:'auto'}}>
          <Provider store={store}>
            <ReactFlowProvider>
              <Calculator></Calculator>
            </ReactFlowProvider>
          </Provider>
        </div>
        {/* <AppForm/> */}
      </div>
    </MantineProvider>
  )
}

export default App
