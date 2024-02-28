import { AuthForm } from "../../view/authForm"
import { AuthTypes } from "../../view/authForm/config"
import styles from "./styles.module.scss";

const RegisterPage = () => {
    return (
        <div className={styles.page}>
            <AuthForm type={AuthTypes.register}/>
        </div>
    )
}

export {RegisterPage}