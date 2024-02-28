import { TextInput, PasswordInput, Text, Paper, Group, Anchor, Stack, Button,} from "@mantine/core";
import { Link } from "react-router-dom";
import { TextContent } from "./config";
import styles from "./styles.module.scss";
import { useUnit } from "effector-react";
import { $form, changeFieldEvent, onSubmitEvent } from "./model";
import { IAuthForm, IForm, changeFieldType } from "./authForm";
import { FC } from "react";

const AuthForm: FC<IAuthForm> = ({ type }) => {
    const [form, onChange, onSubmit] = useUnit([
        $form,
        changeFieldEvent,
        onSubmitEvent,
    ]);

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        const field: Partial<IForm> = { [name]: value };

        // TODO
        // Решения лучше не найдено
        onChange(field as changeFieldType);
    };

    return (
        <div className={styles.wrapper}>
            <Paper className={styles.inner} radius="lg" p="lg">
                <Text size="lg" fw={500}>
                    Welcome to Booking,{" "}
                    <span className={styles.type}>{type}</span> with
                </Text>

                <form className={styles.form}>
                    <Stack>
                        {type === "register" && (
                            <TextInput
                                value={form.name}
                                onChange={onChangeHandler}
                                label="Имя"
                                placeholder="Введите имя"
                                name="name"
                                radius="md"
                            />
                        )}

                        <TextInput
                            value={form.email}
                            onChange={onChangeHandler}
                            required
                            label="Email"
                            placeholder="Введите email"
                            name="email"
                            error={null}
                            radius="md"
                        />

                        <PasswordInput
                            value={form.password}
                            onChange={onChangeHandler}
                            required
                            label="Пароль"
                            placeholder="Введите пароль"
                            name={"password"}
                            error={null}
                            radius="md"
                        />
                    </Stack>

                    <Group justify="space-between" mt="xl">
                        <Anchor
                            component="button"
                            type="button"
                            c="dimmed"
                            size="xs"
                        >
                            <Link to={TextContent.links[type]}>
                                {TextContent.content[type]}
                            </Link>
                        </Anchor>

                        <Button onClick={onSubmit} type="button">
                            Отправить
                        </Button>
                    </Group>
                </form>
            </Paper>
        </div>
    );
};

export { AuthForm };
