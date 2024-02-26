import { FC, PropsWithChildren } from "react"
import styles from "./styles.module.scss";

const Layout:FC<PropsWithChildren> = ({children}) => {
    return (
        <div className={styles.layout}>
            <header>header</header>

            <div className={styles.content}>
                <aside>aside</aside>
                <main>{children}</main>
            </div>

            <footer>footer</footer>
        </div>
    )
}

export {Layout}