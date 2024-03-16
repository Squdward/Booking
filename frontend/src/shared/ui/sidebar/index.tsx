import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import { $sidebarLinks } from "./model";
import { useUnit } from "effector-react";

const Sidebar = () => {
    const [links] = useUnit([$sidebarLinks]);

    return (
        <aside className={styles.sidebar}>
            <nav className={styles.links}>
                {!!links &&
                    links.length > 0 &&
                    links.map((genre) => {
                        return (
                            <Link
                                key={genre._id}
                                className={styles.link}
                                to={`/books/${genre._id}`}
                            >
                                {genre.title}
                            </Link>
                        );
                    })}
            </nav>
        </aside>
    );
};

export { Sidebar };
