import { BookList } from "../../view/BookList"
import { BookPagination } from "../../view/bookPagination"
import styles from "./index.module.scss"

const Books = () => {
    return (
        <section className={styles.page}>
            {/* Sort & filters */}
            
            <BookList/>
            
            <div className={styles.pagination}>
                <BookPagination/>
            </div>
        </section>
    )
}

export {Books}