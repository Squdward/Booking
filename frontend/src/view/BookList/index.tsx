import { FC } from "react"
import { BookCard } from "../../shared/bookCard"
import styles from "./index.module.scss";
import { $books } from "../../pages/books/model";
import { useUnit } from "effector-react";


const BookList:FC = () => {
    const [books] = useUnit([$books])

    if(!books || books.length === 0) return

    return (
        <div className={styles.grid}>
            {books.map( item => (
                <BookCard key={item._id} onIconClick={() => console.log('Icon Click')} {...item}/>
            ))}
        </div>
    )
}

export {BookList}