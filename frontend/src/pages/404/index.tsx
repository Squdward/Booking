import { Link } from "react-router-dom"
import styles from "./styles.module.scss";

const NotFoundPage = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.inner}>
                <span className={styles.numbers}>404</span>
                <h2 className={styles.title}>Page not found</h2>
                <p className={styles.description}>Sorry the page you're looking for doesn't exist.</p>
                <Link to={'/'} className={styles.link}>Return home</Link>
            </div>
        </div>
    )
}

export {NotFoundPage}