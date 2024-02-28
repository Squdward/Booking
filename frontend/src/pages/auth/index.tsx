import { AuthForm } from "../../view/authForm";
import { AuthTypes } from "../../view/authForm/config";
import styles from "./styles.module.scss";

const AuthPage = () => {
    return (
        <div className={styles.page}>
          <AuthForm type={AuthTypes.login}/>
        </div>
    );
};

export { AuthPage };
