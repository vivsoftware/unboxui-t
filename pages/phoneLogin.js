import LinearProgress from '@mui/material/LinearProgress';
import {
    RecaptchaVerifier,
    signInWithPhoneNumber
} from 'firebase/auth';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'reactjs-popup/dist/index.css';
import Img from '../Components/Element/Images';
import Loader from '../Components/Loader';
import { auth } from '../Config/firebase';
import LoginloaderModle from '../Layout/Element/Loginloadermodle';
import Layout4 from '../Layout/Layout4';
const phoneLogin = () => {
    const router = useRouter();
    const [value, setvalue] = useState(null)
    const [timer, setTimer] = useState(20);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isTimerActive, setIsTimerActive] = useState(false);
    const [loading, setIsLoading] = useState(false);
    const [sowModal, setModal] = useState(false);

    const startTimer = () => {
        setIsTimerActive(true);
        setTimer(20);
        const intervalId = setInterval(() => {
            setTimer((prevTimer) => prevTimer - 1);
        }, 1000);
        const timeoutId = setTimeout(() => {
            clearInterval(intervalId);
            setIsTimerActive(false);
        }, 20000);
        const stopTimer = () => {
            clearInterval(intervalId);
            clearTimeout(timeoutId);
            setIsTimerActive(false);
        };
    }
    const [userDe, setUserDe] = useState(null);
    const [phonenumber, setphonenumber] = useState('');
    const [expandform, setExpandForm] = useState(false);
    const [expandformotp, setxpandformotp] = useState(false);
    const [OTP, setOTP] = useState('');
    const [ErrorMsg, setErrorMsg] = useState('');
    const [ErrorMsg2, setErrorMsg2] = useState('');
    const [invalidphonenumber, setInvalidPhoneNumber] = useState('');
    const generateRecaptcha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible',
            'callback': (response) => {
            },
            'expired-callback': () => {
            }
        }, auth);
    }
    const requestOTP = (e) => {
        e.preventDefault();
        if (phonenumber.length >= 12) {
            setIsProcessing(true);
            setExpandForm(true);
            generateRecaptcha();
            let appVerifier = window.recaptchaVerifier;
            signInWithPhoneNumber(auth, phonenumber, appVerifier)
                .then(confirmationResult => {
                    window.confirmationResult = confirmationResult;
                    startTimer();
                }).catch((error) => {
                    if (error === "auth/invalid-phone-number") {
                        setInvalidPhoneNumber(error.message)
                    } else {
                    }
                }).finally(() => {
                    setIsProcessing(false);
                });
        }
    }
    const msge = () => {
        if (!value) {
            setErrorMsg("")
            return;
        }
        setErrorMsg("")
    }
    const verifyOTP = () => {
        let confirmationResult = window.confirmationResult;
        confirmationResult.confirm(OTP).then((result) => {
            const user = result.user;
            setIsLoading(true)
            setModal(true)
            // dispatch({ type: "LOGINLOADER" });
        }).catch((error) => {
            setErrorMsg(error.message)
            console.log("Wrong OTP entered. Please try again.", error.message);
            console.log("Wrong OTP .", error);
            if (error === "auth/invalid-varification-code") {
                setErrorMsg(error);
                console.log("Wrong OTP entered. Please try again.");
            }
        });
    }
    const resendOTP = () => {
        const appVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(auth, phonenumber, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                startTimer();
            })
            .catch((error) => {
            });
    };

    useEffect(() => {
        setErrorMsg2(`Firebase: Error (auth/invalid-verification-code).`)
    }, []);



    return (
        <>
            <Layout4 className="home-page">
                <Head>
                    <title>Unbox Industry</title>
                    <meta name='viewport' content='width=device-width, initial-scale=1' />
                    <link rel="icon" href="/Box.ico" alt="unboxLogo" />
                    <link rel="canonical" href="https://www.unboxindustry.com/phoneLogin" />
                </Head>
                <div className='container mt-5 mb-5'>
                    <LoginloaderModle />
                    <div className='card login-page ' >
                        <div className='row'>
                            <div className='col-md-6 col-sm-12 login-card'>
                                <div style={{ display: "flex", justifyContent: "space-evenly", marginBottom: '20px' }}>
                                    <Link href="/login">
                                        <h1 className='login-toggle fw-bold' style={{ fontSize: '25px', color: 'black' }} >Login</h1>
                                    </Link>
                                    <Link href="/sign-up">
                                        <h1 className=' fw-bold' style={{ fontSize: '25px', color: 'black' }} >Sign Up</h1>
                                    </Link>
                                </div>
                                <p>{ErrorMsg}</p>
                                <form onSubmit={requestOTP}>
                                    <div class="mb-3">
                                        <label for="exampleInputPhone" class="form-label">Phone</label>
                                        <PhoneInput international defaultCountry='IN' type="tel" class="form-control" id="exampleInputPhone" value={phonenumber} onChange={(setphonenumber)} required />
                                    </div>
                                    <div id="recaptcha-container" ></div>
                                    {expandform && (
                                        <>
                                            <div className='mb-3'>
                                                <label htmlFor="exampleInputOTP" className="form-label">OTP</label>
                                                <input type="text" className="form-control mb-2 otp-phone" id="exampleInputOTP" value={OTP} onChange={(e) => setOTP(e.target.value)} required />
                                                {loading === true ? (
                                                    <LinearProgress></LinearProgress>
                                                ) : (
                                                    <p></p>
                                                )}
                                                {isTimerActive ? (
                                                    <span>
                                                        {ErrorMsg === ErrorMsg2 ? (
                                                            <a style={{ color: 'red' }} onClick={resendOTP}>Invalid OTP</a>
                                                        ) : (
                                                            <span style={{ color: 'red' }}>Resend OTP in {timer} seconds</span>
                                                        )}
                                                    </span>
                                                ) : (
                                                    <span>
                                                        {ErrorMsg === ErrorMsg2 ? (
                                                            <a style={{ color: 'red' }} onClick={resendOTP}>Invalid OTP</a>
                                                        ) : (
                                                            <span style={{ color: 'red' }} onClick={resendOTP}>Resend OTP</span>
                                                        )}
                                                    </span>
                                                )}
                                                {isProcessing ? (
                                                    <LinearProgress className="custom-progress-bar" /> // Display processing bar
                                                ) : (
                                                    <button type="submit" className="btn login_btn" onClick={verifyOTP}>Log In</button>
                                                )}
                                            </div>
                                        </>
                                    )}
                                    {!expandform && (
                                        <button type="submit" className="btn login_btn" onClick={requestOTP}>Request OTP</button>
                                    )}
                                    <div class="mb-3 form-check">
                                    </div>
                                    <p className='text-center' >or</p>
                                    <Link legacyBehavior href="/login"><button type="submit" class="btn login_btn">LogIn with Email</button></Link>
                                    <Link legacyBehavior href="/sign-up"><p className='text-center' style={{ marginTop: '10px' }}>Don't have an account? <a className='login-register fw-bold' href="/page/Register">SignUp Now</a></p></Link>
                                </form>
                            </div>
                            <div className='col-md-6 col-sm-12 half-login'>
                                <h2>Welcome <br /> To<br /> Unbox Industry</h2>
                                <p>We connect millions of buyers and sellers around the world, empowering people & creating economic opportunity for all.</p>
                                <Img src="/phone.gif" alt="unboxbackground" className='logindiv' />
                            </div>
                        </div>
                    </div>

                    {sowModal ? (
                        <Loader user={user} />
                    ) : (<p></p>)}
                </div>
            </Layout4>
        </>
    )
}
export default phoneLogin;