import { createEffect } from "effector";
import { AuthController } from "../../request/login";
import { Token } from "../../../tokens";
import { notifications } from "@mantine/notifications";
import { loginType, registerType } from "../../../../types/auth";

export const loginFx = createEffect(async (body: loginType) => {
    try {
        const response = await AuthController.login(body);

        Token.setToken(response.data.accesToken);

        return response.data.user;
    } catch (error) {
        console.error(error);

        notifications.show({
            title: "Error",
            message: error.response.data.message,
        });
    }
});

export const registerFx = createEffect(async (body: registerType) => {
    try {
        const response = await AuthController.register(body);

        Token.setToken(response.data.accesToken);

        return response.data.user;
    } catch (error) {
        console.error(error);

        notifications.show({
            title: "Error",
            message: error.response.data.message,
        });
    }
});
