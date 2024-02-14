import { MIN_PASSWORD_LENGTH } from "../constant";

const isValidData = (email: string, password: string): boolean => {
    const emailCondition = !!email && email.trim() !== '' && email.includes("@");
    const passwordCondition = !!password  && password.trim() !== '' && password.length >= MIN_PASSWORD_LENGTH;

    return emailCondition && passwordCondition
}

export {isValidData}