import { FC } from "react";
import { ActionIcon, Card, Group, Image, Text } from "@mantine/core";
import styles from "./index.module.scss";
import { IconHeart } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { IBookCard } from "./bookCard";
import { BASE_FILE_URL, CURRENCY } from "../constant";
import { AddToCartButton } from "../../features/cart/ui/addToCartButton";

const BookCard: FC<IBookCard> = (props) => {
    return (
        <Card withBorder radius="md" p="md" className={`${styles.card}, ${props.className}`}>
            <Card.Section>
                <Link to={`/book/${props._id}`}>
                    <Image
                        src={`${BASE_FILE_URL}${props.img}`}
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

            {props.actions && <Group mt="auto">{props.actions}</Group>}
        </Card>
    );
};

export { BookCard };
