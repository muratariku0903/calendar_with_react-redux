import { db } from '../firestore';
import { collection, getDoc, setDoc, doc, updateDoc } from 'firebase/firestore';
import { User } from '../../redux/stateTypes';

const rootCollection = 'users';


const addUser = async (id: string, user: User): Promise<void> => {
    try {
        const ref = collection(db, rootCollection);
        await setDoc(doc(ref, id), user);
        console.log('Add user to firestore');
    } catch (e) {
        throw (`Error adding user to firestore because:${e}`);
    }
};

const fetchUser = async (id: string): Promise<User> => {
    try {
        const user = (await getDoc(doc(db, rootCollection, id))).data() as User;
        console.log('Fetch user from firestore');
        return user;
    } catch (e) {
        throw (`Error fetching user from firestore because:${e}`);
    }
};

const updateUser = async (id: string, user: User): Promise<void> => {
    try {
        const ref = doc(db, rootCollection, id);
        await updateDoc(ref, user);
        console.log('Update user of firestore');
    } catch (e) {
        throw (`Error updating user of firestore because:${e}`);
    }
};


export const userAPI = { addUser, fetchUser, updateUser };
