import './App.css'
import { RouterProvider } from 'react-router-dom';
import { RouterConfig } from './pages';
import { useAppInit } from './shared/hooks/useAppInit';


function App() {
  useAppInit();

  return (
    <RouterProvider router={RouterConfig}/>
  )
}

export default App
