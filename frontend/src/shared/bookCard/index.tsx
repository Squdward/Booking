import { FC } from "react";
import { ActionIcon, Card, Group, Image, Text } from "@mantine/core";
import styles from "./index.module.scss";
import { IconHeart } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { IBookCard } from "./bookCard";
import { CURRENCY } from "../constant";
import { AddToCartButton } from "../../features/cart/ui/addToCartButton";

const BookCard: FC<IBookCard> = (props) => {

    const onIconClickHandler = () => {
        return props.onIconClick(props._id)
    }

    return (
        <Card withBorder radius="md" p="md" className={styles.card}>
            <Card.Section>
                <Link to={`/book/${props._id}`}>
                    <Image
                        src={`https://raw.githubusercontent.com/Squdward/Booking/main/backend/uploads/${props.img}`}
                        alt={props.title}
                        fit="contain"
                        height={180}
                    />
                </Link>
            </Card.Section>

            <Card.Section className={styles.section} mt="md">
                <Group justify="apart">
                    <Text fz="lg" fw={500}>
                        {props.title}
                    </Text>
                </Group>
                <Text fz="md" opacity={0.6} fw={400}>
                    <Link to={`/author/${props.author._id}`}>
                        {props.author.fullName}
                    </Link>
                </Text>
                <Text lineClamp={4} fz="sm" mt="xs">
                    {props.description}
                </Text>

                <Text lineClamp={4} fz="sm" mt="xs">
                    {props.price}{CURRENCY}
                </Text>
            </Card.Section>

            <Group mt="auto">
                <AddToCartButton style={{ flex: 1 }} id={props._id}/>
                <ActionIcon variant="default" radius="md" size={36}>
                    <IconHeart onClick={onIconClickHandler} className={styles.like} stroke={1.5} />
                </ActionIcon>
            </Group>
        </Card>
    );
};

export { BookCard };
