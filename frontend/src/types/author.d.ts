import { IBook } from "./book"

interface IAuthor {
    _id: string,
    fullName: string,
    description: string,
    dateOfBirth: string //ISO 8601
    dateOfDeath: string | undefined //ISO 8601
    img: string,
    books:IBook[]
}

export {IAuthor}