import {
    TextInput,
    PasswordInput,
    Text,
    Paper,
    Group,
    Checkbox,
    Anchor,
    Stack,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { TextContent, AuthTypes } from "./config";
import styles from "./styles.module.scss";

const AuthForm = ({type}: {type: keyof typeof AuthTypes}) => {
    return (
        <div className={styles.wrapper}>
            <Paper className={styles.inner} radius="lg" p="lg">
                <Text size="lg" fw={500}>
                    Welcome to Booking, <span className="accent">{type}</span> with
                </Text>

                <form className={styles.form}>
                    <Stack>
                        {type === "register" && (
                            <TextInput
                                label="Name"
                                placeholder="Your name"
                                value={''}
                                onChange={console.log}
                                radius="md"
                            />
                        )}

                        <TextInput
                            required
                            label="Email"
                            placeholder="hello@mantine.dev"
                            value={''}
                            onChange={console.log}
                            error={null}
                            radius="md"
                        />

                        <PasswordInput
                            required
                            label="Password"
                            placeholder="Your password"
                            value={''}
                            onChange={console.log}
                            error={null}
                            radius="md"
                        />

                        {type === "register" && (
                            <Checkbox
                                label="I accept terms and conditions"
                                checked={false}
                                onChange={console.log}
                            />
                        )}
                    </Stack>

                    <Group justify="space-between" mt="xl">
                        <Anchor
                            component="button"
                            type="button"
                            c="dimmed"
                            onClick={null}
                            size="xs"
                        >

                            <Link to={TextContent.links[type]}>
                                {TextContent.content[type]}
                            </Link>
                        </Anchor>
                    </Group>
                </form>
            </Paper>
        </div>
    );
};

export { AuthForm };
