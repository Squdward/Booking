import { ActionIcon, TextInput, TextInputProps, rem } from "@mantine/core";
import { IconArrowRight, IconSearch } from "@tabler/icons-react";
import { FC } from "react";

const Search:FC<TextInputProps> = (props) => {
    return (
        <TextInput
            radius="sm"
            size="md"
            placeholder="Search questions"
            rightSectionWidth={42}
            leftSection={
                <IconSearch
                    style={{ width: rem(18), height: rem(18) }}
                    stroke={1.5}
                />
            }
            rightSection={
                <ActionIcon size={32} radius="sm" variant="filled">
                    <IconArrowRight
                        style={{ width: rem(18), height: rem(18) }}
                        stroke={1.5}
                    />
                </ActionIcon>
            }
            {...props}
        />
    );
};

export { Search };
