const userDTO = (user) => {
    return {
        email: user.email,
        id: user.id
    }
}

module.exports = userDTO