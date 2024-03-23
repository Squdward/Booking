import { createEffect } from "effector";
import { IAuthor } from "../../../../types/author";
import { AuthorRequest } from "../../request/author";

const AuthorEffects = {
    getOne: createEffect(async (id: IAuthor['_id']) => {
        const author = await AuthorRequest.getOne(id);

        return author.data;
    })
}

export {AuthorEffects};