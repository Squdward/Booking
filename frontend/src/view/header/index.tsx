import { FC } from "react"
import { Link } from "react-router-dom"
import { Search } from "../../features/search"
import { IconShoppingBag, IconUserCircle } from "@tabler/icons-react";
import styles from "./styles.module.scss";

const Header:FC = () => {
    return (
        <header className={styles.header}>
            <Link className={styles.logo} to="/">Booking</Link>

            <Search className={styles.search}/>

            <nav className={styles.navigation}>
                <Link to="/profile">
                    <IconUserCircle size={27}/>
                </Link>

                <Link to="/cart">
                    <IconShoppingBag size={27}/>
                </Link>
            </nav>
        </header>
    )
}

export {Header}