import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateEmail, updatePassword, User } from 'firebase/auth';


const signup = async (email: string, password: string): Promise<string> => {
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
};

const login = async (email: string, password: string): Promise<string> => {
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
};

const logout = async (): Promise<void> => {
    const auth = getAuth();
    await signOut(auth)
        .then(() => {
            console.log('Logout');
        })
        .catch(e => {
            throw (`Fail logout because:${e.message}`);
        });
};


const update = async (email: string, password: string): Promise<string> => {
    const user = getAuth().currentUser;
    if (!user) throw ('Can not update user because not login.');
    try {
        await updEmail(user, email);
        await updPassword(user, password);
    } catch (e) {
        throw (`Fail updating user because:${e}`);
    };
    return user.uid;
};


const updEmail = async (user: User, email: string) => {
    await updateEmail(user, email)
        .then(() => {
            console.log('Update user email.');
        })
        .catch(e => {
            throw (`Fail updating user email because:${e.message}`);
        });
};

const updPassword = async (user: User, password: string) => {
    await updatePassword(user, password)
        .then(() => {
            console.log('Update user password.');
        })
        .catch(e => {
            throw (`Fail updating user password because:${e.message}`);
        });
};


export const authAPI = { signup, login, logout, update };
