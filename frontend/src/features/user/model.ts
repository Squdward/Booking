import { createEvent, createStore } from "effector";
import { IUser } from "../../types/user";

export const userLogin = createEvent<IUser>();
export const userLogout = createEvent();

export const $user = createStore<IUser | null>(null)
.on(userLogin, (_, payload) => ({...payload, isLogin: true}))


$user.reset(userLogout);


$user.watch(store => {
    console.log(store)
})