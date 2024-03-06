import { IForm } from "../view/authForm/authForm";

export type accesToken = string
export type refreshToken = string

export type loginType = Omit<IForm, "name">;
export type registerType = Required<IForm>;