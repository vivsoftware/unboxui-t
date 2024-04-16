import LinearProgress from '@mui/material/LinearProgress';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import Img from '../Components/Element/Images';
import { auth } from '../Config/firebase';
import LoginloaderModle from '../Layout/Element/Loginloadermodle';
import Layout4 from '../Layout/Layout4';

const Register = () => {
  const [timer, setTimer] = useState(20); // Initial timer value in seconds
  const [isTimerActive, setIsTimerActive] = useState(false); // Indicates if the timer is active
  const [phonenumber, setPhoneNumber] = useState('');
  const [expandform, setExpandForm] = useState(false);
  const [OTP, setOTP] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [invalidPhoneNumber, setInvalidPhoneNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false); // Indicates if OTP request is processing

  const router = useRouter();

  const startTimer = () => {
    setIsTimerActive(true);
    setTimer(20);

    const intervalId = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(intervalId);
      setIsTimerActive(false);
    }, 20000);
  };

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
      size: 'invisible',
      callback: (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        // ...
      },
      'expired-callback': () => {
        // Response expired. Ask the user to solve reCAPTCHA again.
        // ...
      }
    }, auth);
  };
  const handleModal = () => {
    dispatch({ type: "LOGINLOADER" });
  };
  const requestOTP = (e) => {
    e.preventDefault();
    if (phonenumber.length >= 12) {
      setIsProcessing(true); // Start processing
      setExpandForm(true);
      generateRecaptcha();
      let appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(auth, phonenumber, appVerifier)
        .then(confirmationResult => {
          window.confirmationResult = confirmationResult;
          startTimer(); // Start the timer
        }).catch((error) => {
          // setinvalidphonenumber(error.message)
          if (error === "auth/invalid-phone-number") {
            // Display error message for wrong OTP entered
            setInvalidPhoneNumber(error.message)
            // console.log("Wrong OTP entered. Please try again.");
          } else {
            // alert(errorMessage);
          }
          // Error; SMS not sent
        }).finally(() => {
          setIsProcessing(false); // Stop processing
        });
    }
  }

  const verifyOTP = () => {
    const confirmationResult = window.confirmationResult;
    confirmationResult
      .confirm(OTP)
      .then((result) => {
        // User signed in successfully.
        const user = result.user;
        // handleModal();
        router.push("/signupform"); // Replace with your own page path
      })
      .catch((error) => {
        if (error.code === 'auth/invalid-verification-code') {
          setErrorMsg('Wrong OTP entered. Please try again.');
        } else {
          setErrorMsg(error.message);
        }
      });
  };

  const resendOTP = () => {
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phonenumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        startTimer(); // Restart the timer
        console.log('OTP resent');
      })
      .catch((error) => {
        console.error('Error resending OTP', error);
      });
  };

  useEffect(() => {
    if (auth.currentUser) {
      router.push('/dashboard'); // Redirect to the dashboard if the user is already logged in
    }
  }, [router]);

  return (
    <>
      <Layout4 className="home-page">
        <Head>
          <title>Sign Up - Unbox Industry</title>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <link rel="icon" href="/Box.ico" alt="unboxLogo"/>
          <link rel="canonical" href="https://www.unboxindustry.com/sign-up" />
        </Head>
        <LoginloaderModle/>
        <div className='container mt-5 mb-5'>
          <div className='card login-page'>
            <div className='row'>
              <div className='col-md-6 col-sm-12 login-card'>
                <div style={{ display: 'flex', justifyContent: 'space-evenly', marginBottom: '20px' }}>
                  <Link href="/login">
                    <h2 className='fw-bold' style={{fontSize:'25px',color:'black'}}>Login</h2>
                  </Link>
                  <Link href="/sign-up">
                    <h1 className='login-toggle fw-bold' style={{fontSize:'25px',color:'black'}}>SignUp</h1>
                  </Link>
                </div>
                <form onSubmit={requestOTP}>
                  <div className="mb-1">
                    <label htmlFor="exampleInputPhone" className="form-label">Phone</label>
                    <PhoneInput
                      international
                      defaultCountry='IN'
                      type="tel"
                      className="form-control"
                      id="exampleInputPhone"
                      value={phonenumber}
                      onChange={setPhoneNumber}
                      required
                    />
                    {invalidPhoneNumber && <span>Invalid Phone number</span>}
                  </div>
                  <div id="recaptcha-container"></div>
                  {expandform ? (
                    <div className='mb-3'>
                      <label htmlFor="exampleInputOTP" className="form-label">OTP</label>
                      <input
                        type="text"
                        className="form-control mb-2 otp-phone"
                        id="exampleInputOTP"
                        value={OTP}
                        onChange={(e) => setOTP(e.target.value)}
                        required
                      />
                      {isTimerActive ? (
                        <span>
                          {errorMsg ? (
                            <a style={{ color: 'red' }} onClick={resendOTP}>Invalid OTP</a>
                          ) : (
                            <span style={{ color: 'red' }}>Resend OTP in {timer} seconds</span>
                          )}
                        </span>
                      ) : (
                        <span>
                          {errorMsg ? (
                            <a style={{ color: 'red' }} onClick={resendOTP}>Invalid OTP</a>
                          ) : (
                            <span style={{ color: 'red' }} onClick={resendOTP}>Resend OTP</span>
                          )}
                        </span>
                      )}
                       {isProcessing ? (
                          <LinearProgress className="custom-progress-bar"/> // Display processing bar
                        ) : (
                          <button type="submit" className="btn login_btn" onClick={verifyOTP}>Sign Up</button>
                        )}
                      {/* <button type="submit" className="btn login_btn" onClick={verifyOTP}>
                        Sign Up
                      </button> */}
                    </div>
                  ) : (
                    <button type="submit" className="btn login_btn" onClick={requestOTP}>
                      Request OTP
                    </button>
                  )}
                  <div className="mb-3 form-check"></div>
                  <Link legacyBehavior href="/login">
                    <p className='text-center' style={{ marginTop: '10px' }}>
                      Already have an account? <a className='login-register fw-bold'>Log In Now</a>
                    </p>
                  </Link>
                </form>
              </div>
              <div className='col-md-6 col-sm-12 half-login'>
                <h2>Welcome to Unbox Industry</h2>
                <p>
                  We connect millions of buyers and sellers around the world, empowering people & creating economic opportunity for all.
                </p>
                <Img src="/robo1.png" alt="unboxbackground" className='logoDiv' />
              </div>
            </div>
          </div>
        </div>
      </Layout4>
    </>
  );
};

export default Register;
