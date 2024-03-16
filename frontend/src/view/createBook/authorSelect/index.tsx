import { ComboboxData, Select, SelectProps } from "@mantine/core"
import { FC, useEffect, useState } from "react"
import { AuthorRequest } from "../../../shared/api/request/author";

const AuthorSelect:FC<SelectProps> = (props) => {
    const [options, setOptions] = useState<ComboboxData>();

    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        try {
            const authors = await AuthorRequest.getAll()

            const AuthorsOptions = authors.data.map( item => ({label: item.fullName, value: item._id}))

            setOptions(AuthorsOptions)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Select 
            data={options}
            {...props}
        />
    )
}

export {AuthorSelect}