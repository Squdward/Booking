const userDTO = (user) => {
    return {
        email: user.email,
        name: user.name,
        secondName: user.secondName,
        adres: user.adres,
        phone: user.phone,
        id: user.id
    }
}

module.exports = userDTO