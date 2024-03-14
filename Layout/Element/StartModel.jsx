import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Modal, ModalBody, ModalHeader } from "reactstrap";
import { Btn } from "../../Components/AbstractElements";
import { Neverdate, Ohfree, SignNewsletter, Submit } from "../../Components/Constant";
import PhoneInput from "react-phone-number-input";
import { useRouter } from "next/router";
import Link from 'next/link';
import { toast } from "react-toastify";
import { auth } from "../../Config/firebase";
import spring_boot_url from "../../Utils/springApi";
import { signInWithPhoneNumber, RecaptchaVerifier , fetchSignInMethodsForEmail ,createUserWithEmailAndPassword } from 'firebase/auth';
import LoginloaderModle from "./Loginloadermodle";
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import axios from "axios";

const StartModel = () => {
  const [phonenumber, setphonenumber] = useState('');
  const [invalidphonenumber, setinvalidphonenumber] = useState('');
  const [expandform, setexpandform] = useState(false);
  const [OTP, setOTP] = useState('');
  const [timer, setTimer] = useState(20); // Initial timer value in seconds
  const [ErrorMsg, setErrorMsg] = useState('');
  const [secondModal, setSecondModal] = useState(false);
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
  const [isTimerActive, setIsTimerActive] = useState(false); // Indicates if the timer is active
  const [isProcessing, setIsProcessing] = useState(false); // Indicates if OTP request is processing
  
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
  const dispatch = useDispatch();

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        //...
      },
      'expired-callback': () => {
        // Response expired. Ask user to solve reCAPTCHA again.
        //...
      }
    }, auth);
  }
  useEffect(() => {
    dispatch({ type: "STARTMODAL" });
  }, [dispatch]);

  const { firstModal } = useSelector((state) => state.ModalReducer);


  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      setuser(user);

      if (user && user.email) {
        try {
          const response = await axios.get(`${spring_boot_url}api/users/email?email=${user.email}`);
          console.log(response.data.json);
          setuserDe(response.data);
          startTimer(); // Start the timer
        } catch (error) {
          console.error(error);
        }
      } else if (user && user.phoneNumber) {
        let phoneNumberd = user.phoneNumber;
        phoneNumberd = phoneNumberd.replace(/\+/g, "");
        console.log("phonenumbereeeee", phoneNumberd);
        axios.get(`${spring_boot_url}api/users/phone?phoneNumber=${phoneNumberd}`)
          .then(resp => {
            console.log(resp.data.json);
            localStorage.setItem("data", JSON.stringify(resp.data));
            setuserDe(resp.data);
            startTimer(); // Start the timer

            if (resp.data) {
              // router.push("/user_dashboard");
            }
          

          });
        

      }
    });
  }, []);

  const openSecondModal = () => {
    if (userDe === undefined) {
      verifyOTP();
      setSecondModal(true);
      dispatch({ type: "STARTMODAL" });
    } else {

      verifyOTP();

    }

  };

  console.log("testerrr", userDe)
  const toggle = () => {
    dispatch({ type: "STARTMODAL" });
  };
  const requestOTP = (e) => {
    e.preventDefault();
    if (phonenumber.length >= 12) {
      setIsProcessing(true); // Start processing
      setexpandform(true);
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
            setinvalidphonenumber(error.message)
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
    let confirmationResult = window.confirmationResult;
    confirmationResult.confirm(OTP).then((result) => {

      // User signed in successfully.

      const user = result.user;

      // openSecondModal();

      // router.push("/signupform"); // Replace with your own page path


    }).catch((error) => {
      if (error === "auth/invalid-varification-code") {
        // Display error message for wrong OTP entered
        setErrorMsg(error.message)
        console.log("Wrong OTP entered. Please try again.");
      }
      setErrorMsg(error.message)
    });
  }

  const resendOTP = () => {
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phonenumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        startTimer(); // Restart the timer
        console.log("OTP resent");
      })
      .catch((error) => {
        console.error("Error resending OTP", error);
      });
  };
  const closeSecondModal = () => {
    setSecondModal(false);
  };
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
        toast(` Signup Sucessfully`, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
        closeSecondModal();

        // router.push("/user_dashboard");
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
      <Modal
        className="newletter-modal"
        toggle={toggle}
        isOpen={firstModal && !secondModal}
        centered={true}
      >
        <div className="modal-content">
          <ModalHeader toggle={toggle}>
            <Btn
              attrBtn={{
                type: "button",
                className: "btn-close",
                onClick: () => toggle(),
              }}
            ></Btn>
          </ModalHeader>
          <ModalBody>

            {/* <img
            src="/assets/images/newletter-icon.png"
            className="img-fluid"
            alt="newletter"
          /> */}

            <div className="modal-title">
              <h3 className="tt-title">{SignNewsletter}</h3>
              <p className="font-light"></p>
              <p className="font-light"></p>
              <div className=" mb-3">
                <form onSubmit={requestOTP}>
                  <label for="exampleInputPhone" class="form-label">Phone</label>
                  <PhoneInput international defaultCountry='IN' type="tel" class="form-control" id="exampleInputPhone" onChange={(setphonenumber)} required />
                  {invalidphonenumber ? (
                    <span>Invalid Phonenumber</span>
                  ) : (
                    <span></span>
                  )}
                  <div id="recaptcha-container" ></div>
                  {expandform && (
                    <>

                      <div className='mb-3'>
                        <label htmlFor="exampleInputOTP" className="form-label">OTP</label>
                        <input type="text" className="form-control mb-2 otp-modal" id="exampleInputOTP" value={OTP} onChange={(e) => setOTP(e.target.value)} required />
                        {isTimerActive ? (
                          <span>
                            {ErrorMsg ? (
                              <a style={{ color: 'red' }} onClick={resendOTP}>Invalid OTP</a>
                            ) : (
                              <span style={{ color: 'red' }}>Resend OTP in {timer} seconds</span>
                            )}
                          </span>
                        ) : (
                          <span>
                            {ErrorMsg ? (
                              <a style={{ color: 'red' }} onClick={resendOTP}>Invalid OTP</a>
                            ) : (
                              <span style={{ color: 'red' }} onClick={resendOTP}>Resend OTP</span>
                            )}
                          </span>
                        )}
                        {isProcessing ? (
                          <LinearProgress className="custom-progress-bar" /> // Display processing bar
                        ) : (
                          <button type="submit" className="btn login_btn" onClick={openSecondModal}>Sign Up</button>
                        )}
                      </div>
                    </>
                  )}
                  {!expandform && (
                    <button type="submit" className="btn login_btn" onClick={requestOTP}>Request OTP</button>
                  )}

                </form>
              </div>
            </div>
          </ModalBody>
        </div>
      </Modal>


      {/* Second Modal for personal details */}


      <Modal
        className="second-modal"
        toggle={closeSecondModal}
        isOpen={secondModal}
        centered={true}
      >
        <div className="modal-content">

          <ModalHeader >
            <Btn
              attrBtn={{
                type: "button",
                className: "btn-close",
                onClick: () => toggle(),
              }}
            ></Btn>
          </ModalHeader>
          <ModalBody>
            <div className="modal-title">
              <h3 className="tt-title">SignUp-Form</h3>
              <p className="font-light"></p>
              <p className="font-light"></p>
              <div className=" mb-3">
                <form onSubmit={handleCheckEmailRegistered}>
                  <div class="mb-3">
                    <label for="exampleInputFName" class="form-label">First Name</label>
                    <input type="text" class="form-control" id="exampleInputFName" value={firstName} onChange={(e) => setfirstName(e.target.value)} required />
                    <label for="exampleInputLName" class="form-label">Last Name</label>
                    <input type="text" class="form-control" id="exampleInputLName" value={lastName} onChange={(e) => setlastName(e.target.value)} required />
                    <label for="exampleInputabout" class="form-label">Company Name</label>
                    <input type="text" class="form-control" id="exampleInputabout" value={about} onChange={(e) => setabout(e.target.value)} required />
                    <label for="exampleInputEmail" class="form-label">Email</label>
                    <input type="email" class="form-control" id="exampleInputEmail" value={email} onChange={(e) => setemail(e.target.value)} required />
                    <label for="exampleInputPassword" class="form-label">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword" value={passwordfirebase} onChange={(e) => setpasswordfirebase(e.target.value)} required />
                  </div>
                  <button type="submit" className="btn login_btn" onClick={handleSubmit}>
                    Sign Up
                  </button>
                </form>
              </div>
            </div>
          </ModalBody>
        </div>
      </Modal>
    </>
  );
};

export default StartModel;
