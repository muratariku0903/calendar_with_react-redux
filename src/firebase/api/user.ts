import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { db } from '../firestore';
import { collection, getDoc, setDoc, doc } from 'firebase/firestore';
import { User, SignupDialogState, LoginDialogState } from '../../redux/stateTypes';

const rootCollection = 'users';


const signup = async (user: SignupDialogState['dialog']): Promise<string> => {
    const { email, password } = user;
    const auth = getAuth();
    const uid = await createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            const signupUser = userCredential.user;
            console.log(`Signup with:${signupUser.uid}`);
            return signupUser.uid;
        })
        .catch(e => {
            throw (`Fail signup because:${e.message}`);
        });
    return uid;
}

const login = async (user: LoginDialogState['dialog']): Promise<string> => {
    const { email, password } = user;
    const auth = getAuth();
    const uid = await signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            const loginUser = userCredential.user;
            console.log(`Login with:${loginUser.uid}`);
            return loginUser.uid;
        })
        .catch(e => {
            throw (`Fail login because:${e.message}`);
        });
    return uid;
}

const addUser = async (id: string, user: User): Promise<void> => {
    try {
        const ref = collection(db, rootCollection);
        await setDoc(doc(ref, id), user);
        console.log('Add user to firestore');
    } catch (e) {
        throw (`Error adding user to firestore because:${e}`);
    }
}

const fetchUser = async (id: string): Promise<User> => {
    try {
        const user = (await getDoc(doc(db, rootCollection, id))).data() as User;
        console.log('Fetch user from firestore');
        return user;
    } catch (e) {
        throw (`Error fetching user from firestore because:${e}`);
    }
}


export const userAPI = { signup, login, addUser, fetchUser };
