import { BookView } from "../../view/bookView";
import { useUnit } from "effector-react";
import { LoadingOverlay } from "@mantine/core";
import { $bookData, $isLoading } from "../../features/book/model";
import styles from "./index.module.scss"

const BookPage = () => {
    const [isLoading, bookData] = useUnit([$isLoading, $bookData])

    return (
        <section className={styles.page}>
            <LoadingOverlay visible={isLoading}/>
            {bookData && <BookView {...bookData}/>}
        </section>
    )
}

export {BookPage}