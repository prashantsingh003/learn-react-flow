// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { Flow,DragDrop } from './components'
import './App.css'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
    {/* <div><Flow></Flow></div> */}
    <div className='' style={{width: '80vw', height: '80vh'}}>
      <DragDrop></DragDrop>
    </div>
    </>
  )
}

export default App
