import { useUnit } from "effector-react";
import { AuthForm } from "../../view/authForm"
import { AuthTypes } from "../../view/authForm/config"
import styles from "./styles.module.scss";
import { $user } from "../../store/user/model";
import { Navigate } from "react-router-dom";

const RegisterPage = () => {
    const user = useUnit($user);

    if(user?.isAuth) {
        return <Navigate to={'/'}/>
    }

    return (
        <div className={styles.page}>
            <AuthForm type={AuthTypes.register}/>
        </div>
    )
}

export {RegisterPage}