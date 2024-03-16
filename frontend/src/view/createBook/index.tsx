import { Button, FileInput, Input, Stack, Textarea } from "@mantine/core";
import { AuthorSelect } from "./authorSelect";
import { GenreSelect } from "./genreSelect";
import { BookRequest } from "../../shared/api/request/book";

interface FormElements extends HTMLFormControlsCollection {
    title: HTMLInputElement;
    description: HTMLTextAreaElement;
    img: HTMLInputElement;
    price: HTMLInputElement;
    authors: HTMLInputElement;
    genres: HTMLInputElement;
}

interface CreateBookFoorm extends HTMLFormElement {
    readonly elements: FormElements;
}

const CreateBook = () => {
    const onSubmitHandler = async function (
        event: React.FormEvent<CreateBookFoorm>
    ) {
        event.preventDefault();

        const elements = event.currentTarget.elements;
        const files = elements.img.files;

        if (!files || files?.length === 0 || files[0] == null) {
            return;
        }

        const body = {
            title: elements.title.value.trim(),
            description: elements.description.value.trim(),
            img: files[0],
            price: Number(elements.price.value),
            author: elements.authors.value.trim(),
            genre: elements.genres.value.trim(),
        };

        // Внутри body не должно быть falsy значений
        if (!Object.values(body).every((v) => v)) {
            console.error("Данные заполнены неправильно");
            return;
        }

        const formatBody = new FormData();

        for (const [key, value] of Object.entries(body)) {
            formatBody.append(key, value.toString());
        }

        try {
            const book = await BookRequest.create(body);

            console.log(book);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={onSubmitHandler}>
            <Stack h={600} gap={"lg"}>
                <Input placeholder="Title" name="title" />
                <Textarea placeholder="Description" name="description" />
                <FileInput placeholder="Cover" name="img" />
                <Input placeholder="Price" type="number" name="price" />
                <AuthorSelect name={"authors"} placeholder="Authors" />
                <GenreSelect name="genres" placeholder="genres" />

                <Button type="submit">Send</Button>
            </Stack>
        </form>
    );
};

export { CreateBook };
