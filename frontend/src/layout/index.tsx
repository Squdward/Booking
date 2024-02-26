import { FC, PropsWithChildren } from "react"
import styles from "./styles.module.scss";
import { Header } from "../view/header";

const Layout:FC<PropsWithChildren> = ({children}) => {
    return (
        <div className={styles.layout}>
            <Header/>

            <div className={styles.content}>
                <aside>aside</aside>
                <main>{children}</main>
            </div>

            <footer>footer</footer>
        </div>
    )
}

export {Layout}