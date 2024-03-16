import { createEffect } from "effector";
import { AuthController } from "../../request/login";
import { Token } from "../../tokens";
import { loginType, registerType } from "../../../../types/auth";

export const loginFx = createEffect(async (body: loginType) => {
    const response = await AuthController.login(body);

    Token.setToken(response.data.accesToken);

    return response.data.user;
});

export const registerFx = createEffect(async (body: registerType) => {
    const response = await AuthController.register(body);

    Token.setToken(response.data.accesToken);

    return response.data.user;
});
