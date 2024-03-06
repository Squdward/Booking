import { TextInput, PasswordInput, Text, Paper, Group, Anchor, Stack, Button,} from "@mantine/core";
import { Link } from "react-router-dom";
import { TextContent } from "./config";
import styles from "./styles.module.scss";
import { useUnit } from "effector-react";
import { $errors, $form, changeFieldEvent, changeType, clearError, onSubmitEvent } from "./model";
import { IAuthForm, IForm, changeFieldType } from "./authForm";
import { FC, useEffect } from "react";

const AuthForm: FC<IAuthForm> = ({ type }) => {
    const [form, onChange, onSubmit, formErrors, onFocus, setType] = useUnit([
        $form,
        changeFieldEvent,
        onSubmitEvent,
        $errors,
        clearError,
        changeType,
    ]);

    useEffect(() => {
        setType(type)
    },[]);

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
                                error={formErrors.name}
                                onFocus={() => onFocus('name')}
                            />
                        )}

                        <TextInput
                            value={form.email}
                            onChange={onChangeHandler}
                            required
                            label="Email"
                            placeholder="Введите email"
                            name="email"
                            radius="md"
                            error={formErrors.email}
                            onFocus={() => onFocus('email')}
                        />

                        <PasswordInput
                            value={form.password}
                            onChange={onChangeHandler}
                            required
                            label="Пароль"
                            placeholder="Введите пароль"
                            name={"password"}
                            radius="md"
                            error={formErrors.password}
                            onFocus={() => onFocus('password')}

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

                        <Button onClick={() => onSubmit(type)} type="button">
                            Отправить
                        </Button>
                    </Group>
                </form>
            </Paper>
        </div>
    );
};

export { AuthForm };
