import { initializeApp } from 'firebase/app';
import {
    // TODO uncomment these lines if you will use firestore
    /*     enableIndexedDbPersistence,
        initializeFirestore,
        CACHE_SIZE_UNLIMITED,
        connectFirestoreEmulator */
} from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';
import { browserSessionPersistence, connectAuthEmulator, getAuth, setPersistence } from 'firebase/auth';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_FIRESTORE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);
const auth = getAuth(firebaseApp);
// TODO uncomment these lines if you will use firestore
/* const db = initializeFirestore(firebaseApp, {
    cacheSizeBytes: CACHE_SIZE_UNLIMITED
});
 */

// eslint-disable-next-line no-restricted-globals
if (location.hostname === 'localhost') {
    // TODO uncomment these lines if you will use firestore
    // connectFirestoreEmulator(db, process.env.REACT_APP_FIREBASE_FIRESTORE_EMULATOR_URL || 'localhost', 8099);
    connectAuthEmulator(auth, process.env.REACT_APP_FIREBASE_AUTH_EMULATOR_URL || 'localhost');
}

// TODO uncomment these lines if you will use firestore
/* enableIndexedDbPersistence(db)
    .catch((err) => {
        if (err.code === 'failed-precondition') {
            // Multiple tabs open, persistence can only be enabled
            // in one tab at a a time.
            // ...
            console.log('Multiple tabs open, persistence can only be enabled in one tab');
        } else if (err.code === 'unimplemented') {
            // The current browser does not support all of the
            // features required to enable persistence
            // ...
            console.log('The current browser does not support all of the features');
        }
    }); */

setPersistence(auth, browserSessionPersistence).catch((error) => {
    console.error(error);
});

export default firebaseApp;
export {
    // db, 
    auth,
    analytics
};