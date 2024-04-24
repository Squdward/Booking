import { FC } from "react"
import { BookCard } from "../../shared/bookCard"
import styles from "./index.module.scss";
import { $books } from "../../pages/books/model";
import { useUnit } from "effector-react";
import { AddToCartButton } from "../../features/cart/ui/addToCartButton";
import { ActionIcon } from "@mantine/core";
import { IconHeart } from "@tabler/icons-react";


const BookList:FC = () => {
    const [books] = useUnit([$books])

    if(!books || books.length === 0) return

    return (
        <div className={styles.grid}>
            {books.map( item => (
                <BookCard 
                    key={item._id}
                    onIconClick={() => console.log('Icon Click')}
                    actions={
                        <>
                        <AddToCartButton inCart={item?.inCart} style={{ flex: 1 }} id={item._id}/>
                        <ActionIcon variant="default" radius="md" size={36}>
                            <IconHeart className={styles.like} stroke={1.5} />
                        </ActionIcon>
                        </>
                    }
                    {...item}

                />
            ))}
        </div>
    )
}

export {BookList}