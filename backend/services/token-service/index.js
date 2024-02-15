const jwt = require('jsonwebtoken');
const TokenSchema = require("../../models/token-model");

class TokenService {
    static generate(userId) {
        const accesToken = jwt.sign({userId}, process.env.ACCCES_SECRET, {
            expiresIn: "30m"
        })

        const refreshToken = jwt.sign({userId}, process.env.REFRESH_SECRET, {
            expiresIn: "30d"
        })

        return {
            accesToken,
            refreshToken
        }
    }

    static async save(userId, refreshToken) {
        const tokenData = await TokenSchema.findOne({user: userId});

        if(tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }

        const token = TokenSchema.create({user: userId, refreshToken})

        return token
    }

    static async validateToken(refreshToken) {
        try {
            const data = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
            return data
        } catch (error) {
            return null
        }
    }

    static async findToken(refreshToken) {
        const token = await TokenSchema.findOne({refreshToken})
        return token
    }

    static async removeToken(refreshToken) {
        const token = await TokenSchema.findOneAndDelete({refreshToken})
        return token
    }
}

module.exports = TokenService