import { Button, Input, Select, Stack, Textarea } from "@mantine/core"
import { AuthorSelect } from "./authorSelect";
import { BookRequest } from "../../utils/api/request/book";
import { GenreSelect } from "./genreSelect";



interface FormElements extends HTMLFormControlsCollection {
    title: HTMLInputElement,
    description: HTMLTextAreaElement,
    img: HTMLInputElement,
    price: HTMLInputElement,
    authors: HTMLInputElement,
    genres: H
}

interface CreateBookFoorm extends HTMLFormElement {
    readonly elements: FormElements
}

const CreateBook = () => {
    const onSubmitHandler = async (event: React.FormEvent<CreateBookFoorm>) => {
        event.preventDefault();
        
        const elements = event.currentTarget.elements;

        const body = {
            title: elements.title.value,
            description: elements.description.value,
            img: elements.img.value,
            price: Number(elements.price.value),
            author: elements.authors.value,
            genre: elements.genres.value.split(","),
        }

        if (!Object.values(body).every((v) => Array.isArray(v) ? v.every( g => g == true) :  v == true)) {
            console.error('Данные заполнены неправильно')
            return       
        }
        try {
            const Book = await BookRequest.create(body)

            console.log(Book)
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <form onSubmit={onSubmitHandler}>
            <Stack h={600} gap={'lg'}>
                <Input placeholder="Title" name="title"/>
                <Textarea placeholder="Description" name="description"/>
                <Input placeholder="Cover" name="img"/>
                <Input placeholder="Price" type="number" name="price"/>
                <AuthorSelect name={'authors'} placeholder="Authors" />
                <GenreSelect name="genres" placeholder="genres"/>

                <Button type="submit">Send</Button>
            </Stack>
        </form>
    )
}

export {CreateBook}