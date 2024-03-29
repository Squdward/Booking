import { createEffect, createEvent, createStore, sample } from "effector";
import { IUserStore, IUserView } from "../../types/user";
import { refreshToken } from "../../shared/api/request/refresh";
import { Token } from "../../shared/api/tokens";

export const touchFX = createEffect(async () => {
    const tokenResponse = await refreshToken();

    Token.setToken(tokenResponse.data.accesToken);

    return tokenResponse.data.user
})

export const userLogin = createEvent<IUserView>();
export const userLogout = createEvent();
export const checkAuth = createEvent();
export const unauthUser = createEvent();

export const $user = createStore<IUserStore | null>(null)
.on(userLogin, (_, payload) => ({...payload, isAuth: true}))
.on(touchFX.doneData, (_, payload) => ({...payload, isAuth: true}))

$user.reset(unauthUser);

sample({
    clock: checkAuth,
    target: touchFX,
})