const { default: mongoose } = require("mongoose");

class Database {
    static async connect() {
        mongoose
            .connect(
                `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.4yvof0g.mongodb.net/?retryWrites=true&w=majority`
            )
            .then(() => console.log("DB OK"))
            .catch((err) => console.log("DB ERROR", err));
    }
}

module.exports = Database
