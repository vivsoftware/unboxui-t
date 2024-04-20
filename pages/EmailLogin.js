
import axios from 'axios';
import { signInWithEmailAndPassword, } from 'firebase/auth';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import 'reactjs-popup/dist/index.css';
import Img from '../Components/Element/Images';
import Loader from '../Components/Loader';
import { auth } from '../Config/firebase';
import Layout4 from '../Layout/Layout4';
import spring_boot_url from '../Utils/springApi';
import PhoneLog from './PhoneLo';
import ForgotPasswordSection from './page/forgot_password';
const EmailLogin = () => {
    const [loginError, setLoginError] = useState(false);
    const notify = () => toast("Login success");
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [password, setPassword] = useState('');
    const [sowModal, setModal] = useState(false)
    const [singupMessage, setsingupMessage] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [phoneloginpage, setphoneloginpage] = useState(false);
    const router = useRouter();
    const [user, setuser] = useState(null)
    const [userDe, setUserDe] = useState(null)
    const handleModal = () => {

        dispatch({ type: "LOGINLOADER" });
    };

    const phoneloginopen = () => {
        setphoneloginpage(true)
    }


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setuser(user);
            if (user?.email) {
                axios.get(`${spring_boot_url}api/users/email?email=${user.email}`)
                    .then(resp => {
                        console.log(resp.data.json);
                        localStorage.setItem("data", JSON.stringify(resp.data));
                        setUserDe(resp.data);
                        if (resp.data) {

                            router.push("/user_dashboard");

                        }
                    });
            } else if (user?.phoneNumber) {
                let phoneNumberd = user.phoneNumber
                phoneNumberd = phoneNumberd.replace(/\+/g, "");
                console.log("phonenumbereeeee", phoneNumberd);
                axios.get(`${spring_boot_url}api/users/phone?phoneNumber=${phoneNumberd}`)
                    .then(resp => {
                        console.log(resp.data.json);
                        localStorage.setItem("data", JSON.stringify(resp.data));
                        setUserDe(resp.data);
                        if (resp.data) {
                            router.push("/user_dashboard");

                        }
                    });
            } else {
                setuser(null);
                if (!user) {

                    router.push("/login");

                }
            }
            return () => {
                unsubscribe();
                unsubscribe();
            };
        })
    }, [])
    const handleClick = (e) => {
        e.preventDefault();
        if (!email) {
            setErrorMessage('Please enter an email address.');
            return;
        }
        if (!password) {
            setPasswordError('Please enter a password.');
            return;
        }
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                if (user.email) {
                    setModal(true)
                }

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setLoginError(true);
                const errorCode1 = error.code;
                const errorMessage1 = error.message;
                if (errorCode === "auth/wrong-password") {
                    setPasswordError("Invalid password. Please try again.");
                }
                else {
                }
            });
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setErrorMessage('');
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setErrorMessage('');
    };

    const isValidEmail = (email) => {
        // Simple email validation check
        return email.includes('@');
    };

    const dispatch = useDispatch();
    dispatch({ type: 'PASSWORDMODAL' });
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openPasswordModal = () => {
        setIsModalOpen(true);
        setIsModalOpen(true);
    };

    const closePasswordModal = () => {
        setIsModalOpen(false);
        setIsModalOpen(false);
    };

    /////////////////////////////////////////////////// phonlogin code //////////////////////////////////////////////////////////////////////////////////////

    return (
        <>
            {phoneloginpage ? <PhoneLog /> : (

                <Layout4 className="home-page">

                    <Head>
                        <title>Log In - Unbox Industry</title>
                        <meta name='viewport' content='width=device-width, initial-scale=1' />
                        <meta name="title" content="LogIn" />
                        <meta name="description" content="LogIn to Unbox Industry to see industrial automation." />
                        <link rel="icon" href="/Box.ico" alt="unboxLogo" />
                        <link rel="canonical" href="https://www.unboxindustry.com/login" />
                    </Head>

                    <div className='container mt-5 mb-5'>
                        <div className='card login-page ' >
                            <div className='row'>
                                <div className='col-md-6 col-sm-12 login-card'>
                                    <div style={{ display: "flex", justifyContent: "space-evenly", marginBottom: '20px' }}>
                                        <h1 onClick={phoneloginopen} className='login-toggle fw-bold' style={{ fontSize: '25px', color: 'black' }} >Login</h1>

                                        <Link href="/sign-up">
                                            <h2 className='fw-bold' style={{ fontSize: '25px', color: 'black' }} >Sign Up</h2>
                                        </Link>

                                    </div>
                                    <form className='login-form'>
                                        <div class="mb-3">
                                            <label for="exampleInputEmail" class="form-label">Email</label>
                                            <input type="email" class="form-control login-input" id="exampleInputEmail" value={email} onChange={handleEmailChange} />
                                            {errorMessage && (
                                                <div className="error-message" style={{ color: 'red' }}>
                                                    {errorMessage}
                                                </div>
                                            )}  
                                            {loginError && <div className="error-message" style={{ color: 'red' }}>Invalid email or password. Please try again.</div>}
                                            <label for="exampleInputPassword" class="form-label">Password</label>
                                            <input type="password" class="form-control login-input" id="exampleInputPassword" value={password} onChange={handlePasswordChange} />
                                        </div>
                                        <div class="mb-3 form-check">
                                            <p>{singupMessage}</p>
                                            <div className='d-none d-xl-block d-sm-none'>
                                                <div className='row'>
                                                    <div className='col-lg-6 col-md-7 '>
                                                        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                                        <label class="form-check-label" for="exampleCheck1">Remember me</label>
                                                    </div>
                                                    <div className='col-lg-6 col-md-5 '>
                                                        <a href='#javascript' onClick={openPasswordModal}>
                                                            Forgot Password?
                                                        </a>
                                                    </div>
                                                    <ForgotPasswordSection isOpen={isModalOpen} onClose={closePasswordModal} />
                                                </div>
                             
                                            </div>
                                            <div className='d-block d-xl-none d-sm-block'>
                                                <div className='row'>
                                                    <div className='col-6 '>
                                                        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                                        <label class="form-check-label ms-1" for="exampleCheck1">Remember me</label>
                                                    </div>
                                                    <div className='col-6 '>
                                                        <a href='#javascript' onClick={openPasswordModal}>
                                                            Forgot Password?
                                                        </a>
                                                    </div>
                                                    <ForgotPasswordSection isOpen={isModalOpen} onClose={closePasswordModal} />
                                                </div>
                                            </div>
                                        </div>
                                        <div >
                                            <button type="submit" class="btn login_btn" onClick={handleClick}>
                                                LogIn
                                            </button>
                                        </div>
                                        <div className='text-login'>
                                            <p className=''>or</p>
                                            <button onClick={phoneloginopen} type="submit" class="btn login_btn">LogIn with Phone</button>
                                            <Link legacyBehavior href="/sign-up"><span style={{ marginTop: '10px' }}>Don't have an account? <a className='login-register fw-bold' >SignUp Now</a></span></Link>
                                        </div>
                                    </form>
                                </div>
                                <div className='col-md-6 col-sm-12 half-login'>
                                    <h2>Welcome <br /> To<br /> Unbox Industry</h2>
                                    <p>We connect millions of buyers and sellers around the world, empowering people & creating economic opportunity for all.</p>
                                    <Img src="/login-background.png" alt="unboxbackground" />
                                </div>
                            </div>
                            {sowModal ? (
                                <Loader user={user} />
                            ) : (
                                <p></p>
                            )}
                            {/* <LoginloaderModle /> */}
                        </div>
                    </div >
                </Layout4 >

            )}

        </>
    )
};
export default EmailLogin;

