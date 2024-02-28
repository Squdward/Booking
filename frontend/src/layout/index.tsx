import { FC, PropsWithChildren } from "react"
import styles from "./styles.module.scss";
import { Header } from "../view/header";
import { Sidebar } from "../view/sidebar";

const Layout:FC<PropsWithChildren> = ({children}) => {
    return (
        <div className={styles.layout}>
            <Header/>

            <div className={styles.content}>
                <Sidebar/>
                <main>{children}</main>
            </div>
        </div>
    )
}

export {Layout}