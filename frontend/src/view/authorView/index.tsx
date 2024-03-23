import { FC } from "react";
import { IAuthor } from "../../types/author";
import styles from "./styles.module.scss";
import { BookCard } from "../../shared/bookCard";
import { softDate } from "../../shared/functions/softDate";
import { BASE_FILE_URL } from "../../shared/constant";

const AuthorView:FC<IAuthor> = (props) => {
    return (
        <div className={styles.section}>
        <div className={styles.header}>
            <div className={styles.container}>
                <img
                    src={`${BASE_FILE_URL}${props.img}`}
                    className={styles.image}
                />
            </div>

            <div className={styles.info}>
                <h1 className={styles.title}>{props.fullName}</h1>
                <div className={styles.dates}>
                    <span>{softDate(props.dateOfBirth)}</span>
                    {props.dateOfDeath && <span>{softDate(props.dateOfDeath)}</span>}
                </div>
                <p className={styles.description}>{props.description}</p>
            </div>
        </div>

        <div className={styles.content}>
            <div className={styles.books}>
                {props.books && props.books.map( item => {
                    return <BookCard className={styles.book} onIconClick={() => {}} key={item._id} {...item}/>
                })}
            </div>
        </div>
    </div>
    )
}

export {AuthorView}