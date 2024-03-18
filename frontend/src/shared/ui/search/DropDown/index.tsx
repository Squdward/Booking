import { Combobox } from "@mantine/core"
import { Link } from "react-router-dom";

const ComboboxDropDown = ({options}) => {
    const isEmpty = options;

    return (
        <Combobox.Dropdown hidden={options.length === 0}>
            <Combobox.Options mih={200} mah={200}>
                {isEmpty ? <NothingFound/> : <CustomOptions options={options}/>}
            </Combobox.Options>
        </Combobox.Dropdown>
    )
}

const NothingFound = () => {
    return (
        <Combobox.Empty>Nothing found</Combobox.Empty>
    )
}

const CustomOptions = (options) => {
    options.map( ({value, label}) => {
        return <Link to={`/book/${value}`}>{label}</Link>
    })
}

export {ComboboxDropDown};

