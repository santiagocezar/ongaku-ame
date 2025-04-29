import * as v from 'valibot';
import { Token } from "./schema";

export class NoTokenError extends Error {
    constructor(message: string) {
        super(message);

        this.name = "NoTokenError"
    }
}

export function getSavedToken(): Token | undefined {
    try {
        return mustGetSavedToken()
    } catch (e) {
        if (e instanceof NoTokenError) {
            return
        } else {
            throw e
        }
    }
}

export function mustGetSavedToken(): Token {
    const serialized = localStorage.getItem("spoti-token")

    if (!serialized) throw new NoTokenError("no token was saved")

    const coma = serialized.indexOf(",")

    if (coma < 0) throw new NoTokenError("wrong token format")

    const expira = parseInt(serialized.slice(0, coma))

    if (expira < new Date().valueOf()) throw new NoTokenError("token expired")

    // TODO: cubrir el error de parsing
    return v.parse(Token, JSON.parse(serialized.slice(coma + 1)))
}

export function saveToken(token: Token) {
    localStorage.setItem("spoti-token", `${new Date().valueOf() + token.expires_in * 1000},${JSON.stringify(token)}`)
}
