import { useEffect } from 'react'
import './App.css'
import { useUnit } from 'effector-react'
import { checkAuth } from './store/user/model';
import { RouterProvider } from 'react-router-dom';
import { RouterConfig } from './pages';


function App() {
  const touch = useUnit(checkAuth);

  useEffect(() => {
    touch()
  }, [])

  return (
    <RouterProvider router={RouterConfig}/>
  )
}

export default App
