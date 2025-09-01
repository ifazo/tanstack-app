import { auth, githubProvider, googleProvider } from "firebase.config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            unsubscribe();
            resolve(user);
        }, error => {
            unsubscribe();
            reject(error);
        });
    });
}

export const signUp = ({email, password}: {email: string, password: string}) => {
    return createUserWithEmailAndPassword(auth, email, password);
}

export const signInWithEmail = ({email, password}: {email: string, password: string}) => {
    return signInWithEmailAndPassword(auth, email, password);
}

export const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
}

export const signInWithGithub = () => {
    return signInWithPopup(auth, githubProvider);
}

export const signOut = () => {
    return auth.signOut();
}