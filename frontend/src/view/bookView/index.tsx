import { ActionIcon, Pill, Text } from "@mantine/core";
import styles from "./index.module.scss";
import { Link } from "react-router-dom";
import { FC } from "react";
import { IBook } from "../../types/book";
import { CURRENCY } from "../../shared/constant";
import { IconHeart } from "@tabler/icons-react";
import { AddToCartButton } from "../../features/cart/ui/addToCartButton";

const BookView: FC<IBook> = (props) => {
    return (
        <div className={styles.section}>
            <div className={styles.header}>
                <div className={styles.container}>
                    <img
                        src={`https://raw.githubusercontent.com/Squdward/Booking/main/backend/uploads/${props.img}`}
                        className={styles.image}
                    />
                </div>

                <div className={styles.info}>
                    <h1 className={styles.title}>{props.title}</h1>
                    <Link
                        to={`/author/${props.author._id}`}
                        className={styles.author}
                    >
                        <Text gradient={{ from: 'pink', to: 'violet', deg: 90 }} variant="gradient">
                            {props.author.fullName}
                        </Text>
                    </Link>
                    
                    <p className={styles.description}>{props.description}</p>

                    <div className={styles.genres}>
                        {props.genre.map((item) => {
                            return <Pill key={item._id}>{item.title}</Pill>;
                        })}
                    </div>

                    <span className={styles.price}>
                        {props.price} {CURRENCY}
                    </span>

                    <div className={styles.actions}>
                        <AddToCartButton inCart={props?.inCart} className={styles.buy} id={props._id}/>
                        <ActionIcon variant="default" radius="md" size={36}>
                            <IconHeart className={styles.like} stroke={1.5} />
                        </ActionIcon>
                    </div>
                </div>
            </div>

            <div className={styles.content}>
                <div className={styles.tags}>
                  
                </div>
            </div>
        </div>
    );
};

export { BookView };
