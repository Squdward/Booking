import { FC, PropsWithChildren } from "react"
import styles from "./styles.module.scss";
import { Sidebar } from "../sidebar";
import { Header } from "../header";

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