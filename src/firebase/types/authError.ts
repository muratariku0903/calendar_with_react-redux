export type AuthError = {
    msg: string;
    code: string;
}

export const isAuthError = (item: any): item is AuthError => {
    return Boolean((item as AuthError).msg && (item as AuthError).code);
}
