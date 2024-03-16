import { useUnit } from "effector-react"
import { FC, PropsWithChildren } from "react"
import { Navigate } from "react-router-dom"
import { $user } from "../../../store/user/model"

const ProtectedRoute:FC<PropsWithChildren> = ({children}) => {
    const user = useUnit($user)

    if(!user?.isAuth) {
      console.error("You're is'nt authenificated")
      
      return <Navigate to={"/auth"}/>
    }
  
    return children
  }
  
  export {ProtectedRoute}