import { serialize } from 'cookie'

const TOKEN = "abcd1234"
const CSRF = "9876zyxw"

export const generateAuthToken = (username) => {
    return TOKEN
}

export const generateCSRFToken = (token) => {
    return CSRF
}

export const setAuthCookie = (res, token) => {
    res.setHeader("Set-Cookie", [
            serialize("auth", token, {
                path: "/",
                httpOnly: true,
                sameSite: true,
                expires: new Date(Date.now() + 1000 * 60 * 60 * 8)
            }),
            serialize("csrf", generateCSRFToken(token), {
                path: "/",
                expires: new Date(Date.now() + 1000 * 60 * 60 * 8)
            })
        ])
}

export const clearAuthCookie = (res) => {
    res.setHeader("Set-Cookie", serialize("auth", "", {
        path: "/",
        httpOnly: true
    }))
}

export const requireAuth = handler => (req, res) => {
    console.log("== req.cookies:", req.cookies)
    const validAuth = authTokenIsValid(req.cookies.auth)
    const validCsrf = csrfTokenIsValid(
        req.headers['x-csrf-token']
    )
    if (validAuth && validCsrf) {
        return handler(req, res)
    } else {
        res.status(401).send({ err: "Unauthorized!" })
    }
}

const authTokenIsValid = (token) => {
    return token === TOKEN
}

const csrfTokenIsValid = (csrf) => {
    return csrf === CSRF
}
