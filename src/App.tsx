
import '@mantine/core/styles.css';
import axios from 'axios';
import { MantineProvider } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux'
import { RootState,AppDispatch } from './store'
import { Router } from './router';
import { RouterProvider } from 'react-router-dom';
import { useEffect } from 'react';
import { clearUserFlows, getUserFlows } from './store/slices/flowManagement/flowManagementSlice';

function App() {
  const dispatch=useDispatch<AppDispatch>()
  const user=useSelector((state:RootState)=>state.auth.user)
  useEffect(()=>{
    if(user){
      dispatch(getUserFlows(user.id))
    }
    else{
      dispatch(clearUserFlows())
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
