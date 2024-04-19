import React, { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader, Button } from "@mui/material";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { toast } from "react-toastify";
import PhoneInput from "react-phone-number-input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import signUpLoader from "../../Components/signUpLoader";
import { signInWithPhoneNumber, RecaptchaVerifier, getAuth } from "firebase/auth";
// import { getAuth } from "firebase/auth";
import { auth } from "../../Config/firebase";
import spring_boot_url from "../../springApi";
import signUpModal from "./signupModal";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Img from "../../Components/Element/Images";
import Loader from "../../Components/Loader";
import LoginloaderModle from "./Loginloadermodle";
import Layout4 from "../Layout4";
import EmailLogin from "../../pages/EmailLogin";

const StartModelMuMi = ({}) => {
  const [open, setOpen] = useState(false);
  const [phonenumber, setphonenumber] = useState("");
  const [email, setemail] = useState("");
  const [invalidphonenumber, setinvalidphonenumber] = useState("");
  const [userDe, setuserDe] = useState();
  const [OTP, setOTP] = useState("");
  const [user, setuser] = useState(null);
  const [isTimerActive, setIsTimerActive] = useState(false); // Indicates if the timer is active
  const [isProcessing, setIsProcessing] = useState(false); // Indicates if OTP request is processing
  const [showPhoneNumberBox, setShowPhoneNumberBox] = useState(true);
  const [showSignUpModal, setShowSignUpModal] = useState(false); // to control visiblity of modal
  const router = useRouter();
  const [value, setvalue] = useState(null);
  const [timer, setTimer] = useState(20);
  const [loading, setIsLoading] = useState(false);
  const [showModal, setModal] = useState(false);
  const [phoneloginpage, setphoneloginpage] = useState(false);
  
  const [expandformotp, setxpandformotp] = useState(false);

  const [ErrorMsg, setErrorMsg] = useState("");
  const [ErrorMsg2, setErrorMsg2] = useState("");

  const [expandform, setExpandForm] = useState(false);
  
  // const getAuthe = getAuth();

  const phoneloginopen = () => {
    setphoneloginpage(true);
  };

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
  };

  // useEffect(() => {
  //   // Call generateRecaptcha after auth instance is available
  //   generateRecaptcha();
  // }, [auth]); // This ensures that generateRecaptcha is called whenever auth changes


  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible',
      'callback': (response) => {
        console.log('Captcha Resolved:', response);
      },
      'expired-callback': () => {
      }
    }, auth); 
  }
  // Rewriting this function

  // const generateRecaptcha = () => {
  //   const recaptchaContainer = document.getElementById("recaptcha-container");
  //   if (!recaptchaContainer) {
  //     console.error('Recaptcha container not found');
  //     return;
  //   }
    
  //   const recaptchaVerifier = new RecaptchaVerifier(recaptchaContainer, {

  //       'size': 'insvible',
  //       'callback': (response) => {

  //       },
  //       'expired-callback': () => {

  //       }
  //     });

  //   return recaptchaVerifier; 
  //   }
  
  const requestOtp = (e) => {
    e.preventDefault();
    if (phonenumber.length >= 12) {
      setIsProcessing(true); // starting processing
      setExpandForm(true); // design modal to enter otp and validate user
      generateRecaptcha();

      let appVerifiyer = window.recaptchaVerifier;
      signInWithPhoneNumber(auth, phonenumber, appVerifiyer)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          startTimer();
          if (user.phonenumber) {
            setModal(true);
          }
        })
        .catch((error) => {
          if (error === "auth/invalid-phone-number") {
            setinvalidphonenumber(error.message);
          } else {
          }
        })
        .finally(() => {
          setIsProcessing(false);
        });
    } else {
      //   throw new Error("Invalid phone number");
      //use tostify to show please check your no.
      showPhoneToast(`Please check your number. `, {
        position: toast.POSITION.TOP_CENTER,
      });
    }

    //open new modal for signup currentlly by on clicking conitune re-directing to signup modal
    //To-do :- implement logic to check if user is already registered then login the user if not then redirect to signup modal

    // setShowPhoneNumberBox(false);
    // setShowSignUpModal(true); //to control visiblity of modal

    console.log("requesting otp");
  };

  const msge = () => {
    if (!value) {
      setErrorMsg("");
      return;
    }
    setErrorMsg("");
  };

  const verifyOtp = () => {
    let confirmationResult = window.confirmationResult;
    confirmationResult
      .confirm(OTP)
      .then((result) => {
        const user = result.user;
        setIsLoading(true);
        setModal(true);
      })
      .catch((error) => {
        setErrorMsg(error.message);
        console.log("Wrong OTP entered. Please try again", error.message);
        console.log("Wrong OTP.", error);
        if (error === "auth/invalid-verification-code") {
          setErrorMsg(error);
          console.log("Wrong OTP entered. Please try again");
        }
      });
  };

  const resendOTP = () => {
    const appVerifiyer = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phonenumber, appVerifiyer)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        startTimer();
      })
      .catch((error) => {
        console.error("Error resending OTP", error);
      });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setuser(user);
    });

    setErrorMsg2(`Firebase: Error(auth/invalid-verification-code)`);
  }, []);

  const isEmailValid = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    console.log("email kya hai?", email);
    if (!emailRegex.test(email)) {
      showEmailToast("Please enter a valid email address", {
        position: toast.POSITION.TOP_CENTER,
      });
      return false;
    } else {
      // will be changed acc to logic to be implemented
      showEmailToast("vALIDATION SAHI HO rha h", {
        position: toast.POSITION.TOP_CENTER,
      });
    }

    return true;
  };

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      setuser(user);

      if (user && user.email) {
        try {
          const response = await axios.get(
            `${spring_boot_url}api/users/email?email=${user.email}`
          );
          console.log("user data", response.data.json);
          setuserDe(response.data);
          startTimer();
        } catch (error) {
          console.error(error);
        }
      }
    });
  }, []);

  useEffect(() => {
    setOpen(true);
  }, []);

  // const handleOpen = () => {
  //     setOpen(true)
  // }

  const handelCloseSignupModal = () => {
    setShowSignUpModal(false);
  };
  const handleClose = () => {
    setOpen(false);
    console.log("staate", open);
    console.log("Modal Closed Clicked");
  };

  const handelEmailContent = () => {
    setShowPhoneNumberBox((prevState) => !prevState);
  };

  const handelPhoneContent = () => {
    setShowPhoneNumberBox((prevState) => !prevState);
  };

  const style = {
    positon: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const orText = {
    positon: "absolute",
    marginLeft: "10px",
    marginRight: "10px",
  };

  const showPhoneToast = (message, options) => {
    toast.dismiss(); //dismiss any existing notifications
    toast.error(message, options);
  };

  const showEmailToast = (message, options) => {
    toast.dismiss(); //dismiss any existing notifications
    toast.error(message, options);
  };

  return (
    <Modal
      keepMounted
      open={open}
      onClose={handleClose}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      {showPhoneNumberBox ? (
        <Box
          sx={{
            display: "absolute",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            p: 2, // Add padding to the Box component
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", // Add box shadow
            borderRadius: "50%", // Add border radius for circular shape
            padding: "8px", // Increase padding for larger size
          }}
        >
          <div style={{ border: "1px" }}>
            <Button
              onClick={handleClose}
              style={{ marginLeft: "400px", border: "1px" }}
            >
              <FontAwesomeIcon
                icon={faTimes}
                style={{ color: "#ff8400", fontSize: "24px" }}
              />
            </Button>
          </div>

          <div
            className="my-modal-content"
            style={{ display: "flex-relative" }}
          >
            <h2
              id="modal-modal-title"
              style={{ marginLeft: "38px", fontSize: "22px" }}
            >
              Welcome to Unbox Industry
            </h2>
            <h5
              style={{ marginLeft: "45px", marginTop: "4px", fontSize: "10px" }}
            >
              Streamline Your Industry: One Solution, Infinite Automation!
            </h5>
            <br></br>
            <p style={{ fontSize: "16px", marginLeft: "110px" }}>
              Login or Sign Up
            </p>
            <form>
                  <label class="form-lable">Phone</label>
                  <PhoneInput
                    international
                    defaultCountry="IN"
                    type="tel"
                    class="form-control"
                    id="exampleInputPhone"
                    onChange={setphonenumber}
                    required
                  />
                  {invalidphonenumber ? (
                    <span>Invalid Phonenumber</span>
                  ) : (
                    <span></span>
                  )}
                </form>
                <div id="recaptcha-container" ></div>
            {expandform && (
              <>
                <div className="mb-3">
                  <lable htmlFor="exampleInputOTP" className="form-lable">
                    OTP
                  </lable>
                  <input
                    type="text"
                    className="form-control mb-2 otp-phone"
                    id="exampleInputOTP"
                    value={OTP}
                    onChange={(e) => setOTP(e.target.value)}
                    required
                  />
                  {loading === true ? <LinearProgress /> : <p></p>}
                  {isTimerActive ? (
                    <span>
                      {ErrorMsg === ErrorMsg2 ? (
                        <a style={{ color: "red" }} onClick={resendOTP}>
                          Invalid OTP
                        </a>
                      ) : (
                        <span style={{ color: "red" }}>
                          Resend OTP in {timer} seconds
                        </span>
                      )}
                    </span>
                  ) : (
                    <span>
                      {ErrorMsg === ErrorMsg2 ? (
                        <a style={{ color: "red" }} onClick={resendOTP}>
                          Invalid OTP
                        </a>
                      ) : (
                        <span style={{ color: "red" }} onClick={resendOTP}>
                          Resend OTP
                        </span>
                      )}
                    </span>
                  )}
                </div>
               
              </>
            )}
             
            {!expandform && (
              <button
                type="submit"
                className=""
                style={{ width: "50%", marginLeft: "90px" }}
                onClick={requestOtp}
              >
                Request OTP
              </button>
            )}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "4px",
                marginTop: "10px",
              }}
            >
              <hr
                style={{
                  width: "80%",
                  margin: "10px 0",
                  border: "1px solid ",
                  borderBottom: "none",
                }}
              />
              <h5 style={{ margin: "0 10px", fontSize: "12px" }}>Or</h5>
              <hr
                style={{
                  width: "80%",
                  margin: "10px 0",
                  border: "1px solid",
                  borderBottom: "none",
                }}
              />
            </div>

            <button
              type="submit"
              className=""
              style={{ width: "50%", marginLeft: "90px" }}
              onClick={handelEmailContent}
            >
              Continue With Email
            </button>
          </div>
        </Box>
      ) : showSignUpModal ? (
        <Box
          sx={{
            display: "absolute",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            p: 2, // Add padding to the Box component
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", // Add box shadow
            borderRadius: "50%", // Add border radius for circular shape
            padding: "8px", // Increase padding for larger size
          }}
        >
          <div style={{ border: "1px" }}>
            <Button
              onClick={handleClose}
              style={{ marginLeft: "400px", border: "1px" }}
            >
              <FontAwesomeIcon
                icon={faTimes}
                style={{ color: "#ff8400", fontSize: "24px" }}
              />
            </Button>
          </div>

          <div
            className="my-modal-content"
            style={{ display: "flex-relative" }}
          >
            <h2
              id="modal-modal-title"
              style={{ marginLeft: "38px", fontSize: "22px" }}
            >
              Welcome to Unbox Industry
            </h2>
            <h5
              style={{ marginLeft: "45px", marginTop: "4px", fontSize: "10px" }}
            >
              Streamline Your Industry: One Solution, Infinite Automation!
            </h5>
            <br></br>
            <p style={{ fontSize: "16px", marginLeft: "140px" }}>Sign Up</p>
            <form style={{ padding: "10px 10px" }}>
              <label class="form-lable" style={{ marginTop: "10px" }}>
                First Name
              </label>
              <input
                type="text"
                class="form-control"
                id="exampleInputName"
                placeholder="Please Enter Your First Name"
                required
                style={{ marginBottom: "10px" }}
              />
              <label class="form-lable">Last Name</label>
              <input
                type="text"
                class="form-control"
                id="exampleInputName"
                placeholder="Please Enter Your Last Name"
                required
                style={{ marginBottom: "10px" }}
              />
              <label class="form-lable">Companay Name</label>
              <input
                type="text"
                class="form-control"
                id="exampleInputEmail"
                placeholder="Please Enter Your Companay Email"
                required
                style={{ marginBottom: "10px" }}
              />
              <label class="form-lable">Email</label>
              <input
                type="email"
                class="form-control"
                id="exampleInputEmail"
                placeholder="Please Enter Your Email"
                required
                style={{ marginBottom: "10px" }}
              />
              <label class="form-lable" style={{ marginTop: "10px" }}>
                Password
              </label>
              <input
                type="password"
                class="form-control"
                id="exampleInputPassword"
                placeholder="Please Enter Your Password"
                required
                style={{ marginBottom: "10px" }}
              />
            </form>

            <button
              type="submit"
              className=""
              style={{ width: "50%", marginLeft: "90px" }}
              //   onClick={handleClose}
            >
              Sign Up
            </button>
          </div>
        </Box>
      ) : (
        <Box
          sx={{
            display: "absolute",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            p: 2, // Add padding to the Box component
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", // Add box shadow
            borderRadius: "50%", // Add border radius for circular shape
            padding: "8px", // Increase padding for larger size
          }}
        >
          <div style={{ border: "1px" }}>
            <Button
              onClick={handleClose}
              style={{ marginLeft: "400px", border: "1px" }}
            >
              <FontAwesomeIcon
                icon={faTimes}
                style={{ color: "#ff8400", fontSize: "24px" }}
              />
            </Button>
          </div>

          <div
            className="my-modal-content"
            style={{ display: "flex-relative" }}
          >
            <h2
              id="modal-modal-title"
              style={{ marginLeft: "38px", fontSize: "22px" }}
            >
              Welcome to Unbox Industry
            </h2>
            <h5
              style={{ marginLeft: "45px", marginTop: "4px", fontSize: "10px" }}
            >
              Streamline Your Industry: One Solution, Infinite Automation!
            </h5>
            <br></br>
            <p style={{ fontSize: "16px", marginLeft: "110px" }}>
              Login or Sign Up
            </p>

            <form>
              <label class="form-lable">Email</label>
              <input
                type="email"
                class="form-control"
                id="exampleInputPhone"
                placeholder="Please Enter Your Email"
                onChange={(e) => setemail(e.target.value)}
                required
                style={{ height: "50px" }}
              />
            </form>

            <button
              type="submit"
              className=""
              style={{ width: "50%", marginLeft: "90px", marginTop: "28.5px" }}
              onClick={isEmailValid}
            >
              CONTINUE
            </button>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "4px",
                marginTop: "10px",
              }}
            >
              <hr
                style={{
                  width: "80%",
                  margin: "10px 0",
                  border: "1px solid ",
                  borderBottom: "none",
                }}
              />
              <h5 style={{ margin: "0 10px", fontSize: "12px" }}>Or</h5>
              <hr
                style={{
                  width: "80%",
                  margin: "10px 0",
                  border: "1px solid",
                  borderBottom: "none",
                }}
              />
            </div>

            <button
              type="submit"
              className=""
              style={{ width: "50%", marginLeft: "90px" }}
              onClick={handelPhoneContent}
            >
              Continue With Phone
            </button>
          </div>
        </Box>
      )}
    </Modal>
  );
};

export default StartModelMuMi;
