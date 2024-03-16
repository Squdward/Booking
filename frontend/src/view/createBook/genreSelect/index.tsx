import { ComboboxData, MultiSelect, MultiSelectProps } from "@mantine/core"
import { FC, useEffect, useState } from "react"
import { GenreRequest } from "../../../shared/api/request/genre"

const GenreSelect:FC<MultiSelectProps> = (props) => {
    const [options, setOptions] = useState<ComboboxData>()

    useEffect(() => {
        getGenres()
    },[])

    const getGenres = async () => {
        try {
            const genres = await GenreRequest.getAll();

            const genresOptions = genres.data.map( item => ({value: item._id, label: item.title}));

            setOptions(genresOptions);
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <MultiSelect data={options} {...props}/>
    )
}

export {GenreSelect}