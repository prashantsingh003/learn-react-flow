
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux'
import { RootState,AppDispatch } from './store'
import { Router } from './router';
import { RouterProvider } from 'react-router-dom';
import { useEffect } from 'react';
import { clearCurrentFlow, clearUserFlows, getUserFlows } from './store/slices/flowManagement/flowManagementSlice';
import 'reactflow/dist/style.css';
function App() {
  const dispatch=useDispatch<AppDispatch>()
  const user=useSelector((state:RootState)=>state.auth.user)
  useEffect(()=>{
    if(user){
      dispatch(getUserFlows(user.id))
    }
    else{
      dispatch(clearUserFlows())
      dispatch(clearCurrentFlow())
    }
  },[user])

  // On app Load
  useEffect(()=>{
  },[])
  return (
    <MantineProvider>
      <RouterProvider router={Router}></RouterProvider>
    </MantineProvider>
  )
}

export default App
