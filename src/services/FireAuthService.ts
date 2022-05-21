import {
    signInWithPopup,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithCustomToken,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth';
import { auth } from '.';

const provider = new GoogleAuthProvider();

class FireAuthService {
    async loginWithGoogle(): Promise<void> {
        return signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                if (credential) {
                    const token = credential.accessToken;
                    // The signed-in user info.
                    const user = result.user;
                    console.log(token, user);
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

    async loginWithEmail(email: string, password: string): Promise<any> {
        return signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                return userCredential;
            })
            .catch((error) => {
                console.error(error);
            });
    }

    async loginWithToken(token: string): Promise<any> {
        return signInWithCustomToken(auth, token)
            .then((userCredential) => {
                return userCredential;
            })
            .catch((error) => {
                console.error(error);
            });
    }

    async logout(): Promise<void> {
        return signOut(auth)
            .catch((error) => {
                console.error(error);
            });
    }

    listenAuthStatusChanges(): void {
        onAuthStateChanged(auth, (user): void => {
            if (user) {
                const uid = user.uid;
                console.log(`User is signed in ${uid}`);
            } else {
                console.log('User is signed out');
            }
        });
    }
}

export default new FireAuthService();