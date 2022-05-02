import { useState, useEffect } from 'react';
import { User } from '../redux/stateTypes';
import { userAPI } from '../firebase/api/user';

export const useFetchAllUsers = (): User[] => {
    const [users, setUsers] = useState<User[]>([]);
    useEffect(() => {
        (async () => {
            const users = await userAPI.fetchAllUsers();
            setUsers(users);
        })();
    }, []);
    return users;
}
