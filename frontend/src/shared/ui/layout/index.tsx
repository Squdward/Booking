import { FC, PropsWithChildren } from "react"
import styles from "./styles.module.scss";
import { Sidebar } from "../sidebar";
import { Header } from "../header";

interface ILayout {
    sidebar?: boolean,
}
const Layout:FC<ILayout & PropsWithChildren> = ({children, sidebar=true}) => {
    return (
        <div className={styles.layout}>
            <Header/>

            <div className={styles.content}>
                {sidebar && <Sidebar/>}
                <main>{children}</main>
            </div>
        </div>
    )
}

export {Layout}