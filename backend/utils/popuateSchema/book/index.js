const bookSchema = () => {
    return [
        {
            path: "author",
            select: ["fullName", "_id"],
        },
        {
            path: "genre",
        },
    ];
}

module.exports = {bookSchema}