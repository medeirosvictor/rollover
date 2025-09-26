import { useEffect, useState } from 'react';
import { type FormEvent } from 'react';
import {
    getUserFromLocalStorage,
    saveUserToLocalStorage,
} from '../utils/localStorage';
import { type UnregisteredUser } from '../shared/types';
import { useUserContext } from '../context/useUser';
// import axios from 'axios';

type Props = {};

function Profile({}: Props) {
    const styles = {
        input: 'w-full border border-gray-300 rounded-md p-2 m-1 focus:outline-none focus:ring-2 focus:ring-blue-500',
    };
    const { user, setUser } = useUserContext();
    const { clientId, name, colorTheme, avatarUrl } = user || {};

    useEffect(() => {
        setUser(getUserFromLocalStorage());
    }, []);

    const handleProfileUpdate = (e: FormEvent) => {
        e.preventDefault();
        saveUserToLocalStorage(user, false);
        // Optionally, send updated info to backend
        // axios
        //     .post('/api/updateProfile', user)
        //     .then((response) => {
        //         console.log('Profile updated:', response.data);
        //     })
        //     .catch((error) => {
        //         console.error('Error updating profile:', error);
        //     });
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto mt-10">
            <h2>Hey! {clientId}</h2>
            <form
                onSubmit={handleProfileUpdate}
                className="mt-4 flex flex-col justify-center items-center gap-2"
            >
                <div className="w-full">
                    <input
                        className={styles.input}
                        type="text"
                        id="name"
                        name="name"
                        value={name || ''}
                        placeholder={'Name (e.g., "John Doe")'}
                        onChange={(e) =>
                            setUser({
                                ...user,
                                name: e.target.value,
                            } as UnregisteredUser)
                        }
                    />
                    <input
                        className={styles.input}
                        type="text"
                        id="colorTheme"
                        name="colorTheme"
                        value={colorTheme || ''}
                        placeholder='Color Theme (e.g., "dark" or "light")'
                        onChange={(e) =>
                            setUser({
                                ...user,
                                colorTheme: e.target.value,
                            } as UnregisteredUser)
                        }
                    />
                    <input
                        className={styles.input}
                        type="text"
                        id="avatarUrl"
                        name="avatarUrl"
                        value={avatarUrl || ''}
                        placeholder='Avatar URL (e.g., "https://example.com/avatar.png")'
                        onChange={(e) =>
                            setUser({
                                ...user,
                                avatarUrl: e.target.value,
                            } as UnregisteredUser)
                        }
                    />
                    <br />
                </div>
                <button
                    type="submit"
                    className=" cursor-pointer rounded-md border-1 p-2 bg-violet-700 text-white border-amber-100"
                >
                    Save
                </button>
            </form>
        </div>
    );
}

export default Profile;
