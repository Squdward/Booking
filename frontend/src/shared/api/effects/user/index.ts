import { createEffect } from "effector";
import { UserRequest } from "../../request/user";
import { IUser } from "../../../../types/user";

const UserEffects = {
    get: createEffect(async () => {
        const request = await UserRequest.get();

        return request.data;
    }),
    patch: createEffect(async (body: Partial<IUser>) => {
        const request = await UserRequest.patch(body);

        return request.data;
    }),
}

export {UserEffects}