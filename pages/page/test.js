import { useState } from 'react';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';

import {

    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    signInWithPhoneNumber,
    getAuth,
    RecaptchaVerifier,
    sendEmailVerification

} from 'firebase/auth';
import { auth } from '../../Config/firebase';
const SignUpForm = (email , passwordfirebase) => {
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');

    const handleSignUp = async (e) => {
        e.preventDefault();
        const router = useRouter();

        try {
            // createUserWithEmailAndPassword(auth, email, password)

            const { user } = await createUserWithEmailAndPassword(auth, email, passwordfirebase);

            // Send the email verification link to the user's email.
            // await sendEmailVerification(auth.currentUser);

            // Email verification link sent successfully.
            // console.log('Email verification link sent!');

            // Additional logic after successful sign-up (e.g., redirect to a new page).
            router.push("/user_dashboard");

            // ...
        } catch (error) {
            // Handle sign-up error.
            toast(`Error signing up `,error.message)

            // console.log('Error signing up:', error.message);
        }
    };

    return (
        <div>

            <h1>dfegvhfegvchefvchfv</h1>
      
        </div>
    );
};

export default SignUpForm;
