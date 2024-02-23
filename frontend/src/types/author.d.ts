interface IAuthor {
    _id: string,
    fullName: string,
    description: string,
    dateOfBirth: string //ISO 8601
    dateOfDeath: string //ISO 8601
    img: string,
}

export {IAuthor}