import { type UnregisteredUser } from '../shared/types';

export function setItem(key: string, value: string) {
    localStorage.setItem(key, value);
}

export function getItem(key: string): string | null {
    return localStorage.getItem(key);
}

export function saveUserToLocalStorage(
    userInfo: UnregisteredUser | null,
    register?: boolean
) {
    if (!register) {
        setItem('UnregisteredUserInfo', JSON.stringify(userInfo));
    }
    setItem('userInfo', JSON.stringify(userInfo));
}

export function getUserFromLocalStorage(
    registered?: boolean
): UnregisteredUser | null {
    if (registered) {
        const data = getItem('userInfo');
        return data ? (JSON.parse(data) as UnregisteredUser) : null;
    }

    const data = getItem('UnregisteredUserInfo');
    return data ? (JSON.parse(data) as UnregisteredUser) : null;
}
