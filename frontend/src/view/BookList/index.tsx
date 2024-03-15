import { FC } from "react"
import { BookCard } from "../../shared/bookCard"
import styles from "./index.module.scss";
import { $books } from "../../pages/books/model";
import { useUnit } from "effector-react";
import { addToCart } from "../../store/cart/model";


const BookList:FC = () => {
    const [books, onAddToCart] = useUnit([$books, addToCart])

    if(!books || books.length === 0) return

    return (
        <div className={styles.grid}>
            {books.map( item => (
                <BookCard onButtonClick={onAddToCart} key={item._id} onIconClick={() => console.log('Icon Click')} {...item}/>
            ))}
        </div>
    )
}

export {BookList}