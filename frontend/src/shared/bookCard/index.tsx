import { FC } from "react";
import { ActionIcon, Button, Card, Group, Image, Text } from "@mantine/core";
import styles from "./index.module.scss";
import { IconHeart } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { IBookCard } from "./bookCard";

const BookCard: FC<IBookCard> = (props) => {
    return (
        <Card withBorder radius="md" p="md" className={styles.card}>
            <Card.Section>
                <Image
                    src={`https://raw.githubusercontent.com/Squdward/Booking/main/backend/uploads/${props.img}`}
                    alt={props.title}
                    fit="contain"
                    height={180}
                />
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
            </Card.Section>

            <Group mt="xs">
                <Button onClick={props.onButtonClick} radius="md" style={{ flex: 1 }}>
                    Купить
                </Button>
                <ActionIcon variant="default" radius="md" size={36}>
                    <IconHeart onClick={props.onIconClick} className={styles.like} stroke={1.5} />
                </ActionIcon>
            </Group>
        </Card>
    );
};

export { BookCard };
