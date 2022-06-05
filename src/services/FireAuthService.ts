import {
    signInWithPopup,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    createUserWithEmailAndPassword,
    updateProfile,
    UserCredential,
    sendPasswordResetEmail,
    onIdTokenChanged
} from 'firebase/auth';
import { auth } from '.';
import IUser from '../models/IUser';

const provider = new GoogleAuthProvider();

export const storedUser = (): IUser | null => {
    const currentUser = auth.currentUser;
    const localUser = localStorage.getItem('user');
    if (currentUser) {
        localStorage.setItem('user', JSON.stringify(currentUser));
        return currentUser as IUser;
    } else if (localUser) {
        return JSON.parse(localUser);
    } else {
        return null;
    }
};

class FireAuthService {

    async signup(email: string, password: string, firstName: string, lastName?: string): Promise<UserCredential> {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await this.updateProfile(firstName, lastName);
        return userCredential;
    }

    async updateProfile(firstName: string, lastName?: string, photoURL?: string): Promise<void | undefined | null> {
        let displayName = '';
        if (typeof firstName === 'string') {
            displayName += firstName;
        }
        if (typeof lastName === 'string') {
            displayName += ' ' + lastName;
        }
        return auth.currentUser && updateProfile(auth.currentUser, {
            displayName, photoURL
        });
    }

    async loginWithEmail(email: string, password: string): Promise<UserCredential> {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        return userCredential;
    }

    async sendPasswordChangeEmail(email: string): Promise<void> {
        return sendPasswordResetEmail(auth, email);
    }

    async loginWithGoogle(): Promise<void> {
        return signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                if (credential) {
                    const token = credential.accessToken;
                    // The signed-in user info.
                    const user = result.user;
                } else {
                    throw new Error(' no credentials found');
                }

            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    }

    async logout(): Promise<void> {
        return signOut(auth)
            .catch((error) => {
                console.error(error);
            });
    }

    listenAuthStatusChanges(callback: (user: any) => void): void {
        if (typeof callback !== 'function') {
            return;
        }
        onAuthStateChanged(auth, callback);
    }

    listenOnIdTokenChanged(callback: (user: any) => void, onErrorCallback: (error: any) => void) {
        if (typeof callback !== 'function') {
            return;
        }
        if (typeof callback !== 'function') {
            return;
        }
        onIdTokenChanged(auth, callback, onErrorCallback);
    }
}

export default new FireAuthService();