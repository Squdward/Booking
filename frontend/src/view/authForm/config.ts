export const AuthTypes = {
    register: 'register',
    login: 'login'
} as const;


export const TextContent = {
    links: {
        [AuthTypes.register]: '/auth',
        [AuthTypes.login]: '/register',
    },
    content: {
        [AuthTypes.register]: 'Already have an account? Login',
        [AuthTypes.login]: "Don't have an account? Register",
    }
}

