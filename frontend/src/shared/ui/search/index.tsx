import {
    ActionIcon,
    Combobox,
    ComboboxProps,
    Input,
    InputBase,
    Loader,
    TextInput,
    rem,
    useCombobox,
} from "@mantine/core";
import { FC } from "react";
import { ComboboxDropDown } from "./DropDown";
import { ASDF } from "./Input";
import { IconArrowRight, IconSearch } from "@tabler/icons-react";

export interface ICustomCombobox extends ComboboxProps {
    options: any[];
    isLoading?: boolean;
    onInputChange: (value: string) => void;
}

const CustomCombobox: FC<ICustomCombobox> = ({
    isLoading,
    options,
    onInputChange,
    ...restProps
}) => {
    const comboboxStore = useCombobox({
        onDropdownClose: () => comboboxStore.resetSelectedOption(),
    });

    return (
        <Combobox size="lg" store={comboboxStore} {...restProps}>
            <Combobox.Target>
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
                    onChange={"onChangeHandler"}
                    onClick={() => comboboxStore.openDropdown()}
                    onFocus={() => comboboxStore.openDropdown()}
                    onBlurCapture={() => comboboxStore.closeDropdown()}
                />
            </Combobox.Target>
            <ComboboxDropDown options={options} />
        </Combobox>
    );
};

export { CustomCombobox };
