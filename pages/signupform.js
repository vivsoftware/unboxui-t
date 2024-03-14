import Head from 'next/head';
import React, { useState } from 'react';
import 'reactjs-popup/dist/index.css';
import Link from 'next/link';
import Img from '../Components/Element/Images';
import Layout4 from '../Layout/Layout4';
import fetch from 'node-fetch';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import spring_boot_url from '../Utils/springApi';
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail, } from 'firebase/auth';
import { auth } from '../Config/firebase';

const RegisterDetails = () => {

    const [userDe, setuserDe] = useState()
    const [firstName, setfirstName] = useState('')
    const [lastName, setlastName] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [about, setabout] = useState('')
    const [passwordfirebase, setpasswordfirebase] = useState('')
    const notify = () => toast("Login success");
    const router = useRouter();
    const [user, setuser] = useState(null)
    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            setuser(user)
        })
    }, [])

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {

            // createUserWithEmailAndPassword(auth, email, password)
            const { user } = await createUserWithEmailAndPassword(auth, email, passwordfirebase);
            // Send the email verification link to the user's email.
            // await sendEmailVerification(auth.currentUser);
            // Email verification link sent successfully.
            console.log('Email verification link sent!');
            if (user.email) {

                toast(` Signup Sucessfully`, {
                    position: toast.POSITION.BOTTOM_CENTER,
                });
            } else {
                toast(`Please check all filled details  `);
            }
            // Additional logic after successful sign-up (e.g., redirect to a new page).
            // ...
        } catch (error) {
            // Handle sign-up error.
            if (error.message === "Firebase: Error (auth/email-already-in-use).") {
                setErrorMessage("User is Already Registered")
                signOut();
            }
            console.log('Error signing up:', error.message);
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        // Check if any required field is empty
        if (!firstName || !lastName || !email || !passwordfirebase || !about) {
            // Handle the case when a required field is empty
            toast.error('Please fill in all required fields.');
            return;
        }
        // Proceed with form submission
        handleSignUp(e);
        let phoneNumberd = user.phoneNumber;
        phoneNumberd = phoneNumberd.replace(/\+/g, '');
        const userDetails = {
            firstName,
            lastName,
            email,
            password: 'Unbox@123455',
            about,
            phoneNumber: `${phoneNumberd}`,
        };
        console.log(userDetails);
        fetch(`${spring_boot_url}api/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userDetails),
        }).then((resp) => {
            setuserDe(resp.body);

            if (resp.ok === true) {
                const { user } = createUserWithEmailAndPassword(auth, email, passwordfirebase);
                router.push("/user_dashboard");
                // SignUpForm();
            }
        });
    };
    const [isRegistered, setIsRegistered] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const handleCheckEmailRegistered = async (e) => {
        e.preventDefault();
        try {
            // Check if the email is already registered
            const signInMethods = await fetchSignInMethodsForEmail(auth, email);
            // If signInMethods array is empty, the email is not registered
            // setIsRegistered(signInMethods.length > 0);
            // setErrorMessage('');
        } catch (error) {
            // Handle error and show error message
            // setIsRegistered(false);
            // setErrorMessage(error);
        }
    };
    const signOut = () => {
        auth.signOut().then(() => {
            setuser(null)
            auth.onAuthStateChanged(async (user) => {
                setuser(user)
            })
        })
    }
    return (
        <>
            <Layout4 className="home-page">
                <Head>
                    <title>Unbox Industry-Register</title>
                    <meta name='viewport' content='width=device-width, initial-scale=1' />
                    <link rel="icon" href="/Box.ico" alt="unboxLogo" />
                    <link rel="canonical" href="https://www.unboxindustry.com/signupform" />
                </Head>
                <div className='container mt-5 mb-5'>
                    <div className='card login-page ' >
                        <div className='row'>
                            <div className='col-md-6 col-sm-12 login-card'>
                                <div style={{ display: "flex", justifyContent: "space-evenly", marginBottom: '20px' }}>
                                    <Link href="/sign-up">
                                        <h1 className='login-toggle fw-bold' style={{ fontSize: '25px', color: 'black' }} >Sign Up</h1>
                                    </Link>
                                </div>
                                <form onSubmit={handleCheckEmailRegistered}>
                                    <div class="mb-3">
                                        <label for="exampleInputFName" class="form-label">First Name</label>
                                        <input type="text" class="form-control otp-phone" id="exampleInputFName" value={firstName} onChange={(e) => setfirstName(e.target.value)} required />
                                        <label for="exampleInputLName" class="form-label">Last Name</label>
                                        <input type="text" class="form-control  otp-phone" id="exampleInputLName" value={lastName} onChange={(e) => setlastName(e.target.value)} required />
                                        <label for="exampleInputabout" class="form-label">Company Name</label>
                                        <input type="text" class="form-control  otp-phone" id="exampleInputabout" value={about} onChange={(e) => setabout(e.target.value)} required />
                                        <label for="exampleInputEmail" class="form-label">Email</label>
                                        <input type="email" class="form-control  otp-phone" id="exampleInputEmail" value={email} onChange={(e) => setemail(e.target.value)} required />
                                        <label for="exampleInputPassword" class="form-label">Password</label>
                                        <input type="password" class="form-control  otp-phone" id="exampleInputPassword" value={passwordfirebase} onChange={(e) => setpasswordfirebase(e.target.value)} required />
                                    </div>
                                    <button type="submit" className="btn login_btn" onClick={handleSubmit}>
                                        Sign Up
                                    </button>
                                    <Link legacyBehavior href="/login"><p className='text-center' style={{ marginTop: '10px' }}>Already have an account? <a className='login-register'><strong>LogIn Now</strong></a></p></Link>
                                </form>
                                {errorMessage}
                            </div>
                            <div className='col-md-6 col-sm-12 half-login'>
                                <h2>Welcome <br /> To<br /> Unbox Industry</h2>
                                <p>We connect millions of buyers and sellers around the world, empowering people & creating economic opportunity for all.</p>
                                <Img src="/login-background.png" alt="unboxbackground" />
                            </div>
                        </div>
                    </div>
                </div>
            </Layout4>
        </>
    )

}

export default RegisterDetails;







