import { ActionIcon, ComboboxStore, Loader, TextInput, rem } from "@mantine/core"
import { IconArrowRight, IconSearch } from "@tabler/icons-react"
import { ICustomCombobox } from "..";
import { FC } from "react";

interface IComboboxInput { 
    isLoading?: ICustomCombobox['isLoading'],
    onInputChange: ICustomCombobox['onInputChange'],
    combobox: ComboboxStore,
}

const ASDF:FC<IComboboxInput> = ({isLoading, onInputChange, combobox}) => {
    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value;

        onInputChange(value);
    };

    return (
        <TextInput
            size="md"
            leftSection={
                <IconSearch
                    style={{ width: rem(18), height: rem(18) }}
                    stroke={1.5}
                />
            }
            rightSection={
                isLoading ? (
                    <Loader size="1rem" />
                ) : (
                    <ActionIcon size={32} radius="sm" variant="filled">
                        <IconArrowRight
                            style={{ width: rem(18), height: rem(18) }}
                            stroke={1.5}
                        />
                    </ActionIcon>
                )
            }
            placeholder="Type anything"
            onChange={onChangeHandler}
            onClick={() => combobox.openDropdown()}
            onFocus={() => combobox.openDropdown()}
            onBlurCapture={() => combobox.closeDropdown()}
        />
    )
}

export {ASDF}