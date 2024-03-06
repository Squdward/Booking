import { createEffect } from "effector";
import { AuthController } from "../../request/login";
import { Token } from "../../../tokens";
import { notifications } from "@mantine/notifications";
import { loginType } from "../../../../types/auth";

export const loginFx = createEffect(async (body: loginType) => {
    console.log(body)
    try {
        const response = await AuthController.login(body);

        Token.setToken(response.data.accesToken);

        notifications.show({
            title: 'Default notification',
            message: 'goood',
        })
    } catch (error) {
        console.error(error)

        notifications.show({
            title: 'Default notification',
            message: 'error',
          })
    }
})