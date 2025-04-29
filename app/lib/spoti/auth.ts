import { Token } from "./schema";
import { getSavedToken, saveToken } from "./token";
import * as util from "./util"
import * as v from 'valibot';

const redirectUri = 'http://127.0.0.1:5173/pong';

export async function needsAuth() {
    if (!getSavedToken()) return await generateAuthURL()
}

export async function generateAuthURL() {
    const codeVerifier = util.generateRandomString(64);
    localStorage.setItem('code_verifier', codeVerifier);

    const scope = 'user-read-private user-read-email';
    const authUrl = new URL("https://accounts.spotify.com/authorize")

    const hashed = await util.sha256(codeVerifier)
    const codeChallenge = util.base64encode(hashed);
    
    authUrl.search = util.params({
        response_type: 'code',
        client_id: import.meta.env.VITE_CLIENT_ID,
        scope,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge,
        redirect_uri: redirectUri,
    })

    return authUrl.toString();
}

export async function finishAuth(code: string) {
    const codeVerifier = localStorage.getItem('code_verifier');

    const res = await fetch("https://accounts.spotify.com/api/token", {
        method: "post",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: util.params({
            client_id: import.meta.env.VITE_CLIENT_ID,
            grant_type: "authorization_code",
            code,
            redirect_uri: redirectUri,
            code_verifier: codeVerifier!,
        })
    }).then((res) => res.json())

    const token = v.parse(Token, res)

    saveToken(token)

    return getReturnURL()
}

export function setReturnHref(href: string) {
    localStorage.setItem('return', href);
}

export function getReturnURL() {
    return localStorage.getItem('return') ?? "/";
}
