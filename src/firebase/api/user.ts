import { db } from '../firestore';
import { getDoc, getDocs, setDoc, doc, updateDoc, collection } from 'firebase/firestore';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { User } from '../../redux/stateTypes';

const rootCollection = 'users';


const addUser = async (id: string, user: Omit<User, 'id'>): Promise<void> => {
    try {
        const ref = doc(db, rootCollection, id);
        await setDoc(ref, { ...user, id });
        console.log('Add user to firestore');
    } catch (e) {
        throw (`Error adding user to firestore because:${e}`);
    }
};

const fetchUser = async (id: string): Promise<User> => {
    try {
        const ref = doc(db, rootCollection, id);
        const user = (await getDoc(ref)).data() as User;
        console.log('Fetch user from firestore');
        return user;
    } catch (e) {
        throw (`Error fetching user from firestore because:${e}`);
    }
};

const fetchAllUsers = async (): Promise<User[]> => {
    const users: User[] = [];
    const ref = collection(db, rootCollection);
    try {
        (await getDocs(ref)).docs.forEach(doc => {
            users.push(doc.data() as User);
        });
        console.log('Fetch all users from firestore');
    } catch (e) {
        throw (`Error fetching all users from firestore because:${e}`);
    }

    return users;
}

const fetchAllUsersAnonymously = async (): Promise<User[]> => {
    const ref = collection(db, rootCollection);
    const auth = getAuth();
    return await signInAnonymously(auth)
        .then(() => {
            const users: User[] = [];
            getDocs(ref).then(res => {
                res.docs.forEach(doc => {
                    users.push(doc.data() as User);
                });
            });
            console.log('Fetch all users from firestore');
            return users;
        })
        .catch(e => {
            throw (`Error fetching all users from firestore because:${e}`);
        });
}

const updateUser = async (id: string, user: User): Promise<void> => {
    try {
        const ref = doc(db, rootCollection, id);
        await updateDoc(ref, user);
        console.log('Update user of firestore');
    } catch (e) {
        throw (`Error updating user of firestore because:${e}`);
    }
};

const getUid = (): string | null => {
    const auth = getAuth();
    return auth.currentUser ? auth.currentUser.uid : null;
}


export const userAPI = { addUser, fetchUser, updateUser, fetchAllUsers, fetchAllUsersAnonymously, getUid };
