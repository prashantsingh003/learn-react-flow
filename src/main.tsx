import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './flow.css'
import 'reactflow/dist/style.css';
import './config/fontAwesome.tsx'

// Poppins font
import "@fontsource/poppins"; // Defaults to weight 400
import "@fontsource/poppins/500.css"; // Specify weight
import "@fontsource/poppins/500-italic.css"; // Specify weight and style
import { Provider } from 'react-redux'
import { store } from './store/index.ts'
createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <App />
    </Provider>
)
