import { FC, PropsWithChildren } from "react"
import styles from "./styles.module.scss";
import { Sidebar } from "../sidebar";
import { Header } from "../header";

interface ILayout {
    sidebar?: boolean,
    header?: boolean,
}
const Layout:FC<ILayout & PropsWithChildren> = ({children, sidebar=true, header=true,}) => {
    return (
        <div className={styles.layout}>
            {header && <Header/>}

            <div className={styles.content}>
                {sidebar && <Sidebar/>}
                <main>{children}</main>
            </div>
        </div>
    )
}

export {Layout}