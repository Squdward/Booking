import { useState } from "react"
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

const Sidebar = () => {
    const [list] = useState([
        {
            "title": "Классика"
        },
        {
            "title": "Наука"
        },
        {
            "title": "Историческая проза"
        },
        {
            "title": "Драма"
        },
        {
            "title": "Фантастика"
        },
        {
            "title": "Художественная литература"
        },
        {
            "title": "Антиутопия"
        },
    ]);

    return (
        <aside className={styles.sidebar}>
            <nav className={styles.links}>
                {!!list.length && list.map( genre => {
                    return <Link className={styles.link} to="/123h1y7826y78y1872">{genre.title}</Link>
                })}
            </nav>
        </aside>
    )
}

export {Sidebar}