import { useState, useEffect } from 'react';
import { User } from '../redux/stateTypes';
import { userAPI } from '../firebase/api/user';

export const useFetchAllUsers = (deps: any[] = [], isAnonymously: boolean = false): User[] => {
    const [users, setUsers] = useState<User[]>([]);
    useEffect(() => {
        (async () => {
            try {
                let users: User[];
                if (isAnonymously) {
                    users = await userAPI.fetchAllUsersAnonymously();
                } else {
                    users = await userAPI.fetchAllUsers();
                }
                setUsers(users);
            } catch (e) {
                console.error(e);
            }
        })();
    }, deps);

    return users;
}
