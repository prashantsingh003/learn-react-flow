
import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';
import './App.css'
import { Provider } from 'react-redux'
import { store } from './store'
import { Router } from './router';
import { RouterProvider } from 'react-router-dom';

function App() {
  return (
    <Provider store={store}>
      <MantineProvider>
        <RouterProvider router={Router}></RouterProvider>
      </MantineProvider>
    </Provider>
  )
}

export default App
