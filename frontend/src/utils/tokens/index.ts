const BASE_TOKEN_NAME = `booking_acces_token`;

class Token {
    static getToken() {
        const token = localStorage.getItem(BASE_TOKEN_NAME);

        return token
    }

    static setToken(payload: string) {
        const token = localStorage.setItem(BASE_TOKEN_NAME, payload)
        
        return token
    }
}

export {Token}