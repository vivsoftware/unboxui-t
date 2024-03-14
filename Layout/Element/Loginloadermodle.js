
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Modal, ModalBody, ModalHeader } from "reactstrap";
import { toast } from 'react-toastify';
import { auth } from "../../Config/firebase";
import spring_boot_url from "../../Utils/springApi";
import axios from "axios";
import LinearProgress from '@mui/material/LinearProgress';
import { useRouter } from "next/router";
import adminDashboard from '../../pages/admin-dashboard';
import sellerDashboard from '../../pages/seller-dashboard';
import buyerDashboard from '../../pages/buyer-dashboard'

const LoginloaderModle = () => {
    const [secondModal, setSecondModal] = useState(false);
    const [user, setuser] = useState(null);
    const [isTimerActive, setIsTimerActive] = useState(false); // Indicates if the timer is active
    const [timer, setTimer] = useState(2); // Initial timer value in seconds
    const [userDe, setUserDe] = useState(null);
    const dispatch = useDispatch();
    const { loginloader } = useSelector((state) => state.ModalReducer);
    const router = useRouter();

    const toggle = () => {
        dispatch({ type: 'LOGINLOADER' });
    };

    const startTimer = () => {
        setIsTimerActive(true);
        setTimer(2);

        const intervalId = setInterval(() => {
            setTimer((prevTimer) => prevTimer - 1);
        }, 200);

        setTimeout(() => {
            clearInterval(intervalId);
            setIsTimerActive(false);
        }, 2000);
    };

    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
          setuser(user);
      
          if (user && user.email) {
            try {
              const response = await axios.get(`${spring_boot_url}api/users/email?email=${user.email}`);
              console.log(response.data.json);
              setUserDe(response.data);
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
                setUserDe(resp.data);
                startTimer(); // Start the timer

                if (resp.data) {
                  // router.push("/user_dashboard");
                }
              });
          }
        });
      }, []);
      

    useEffect(() => {
        if (isTimerActive && timer === 0) {
            // Wait for 5 seconds and then call user_Login
            user_Login();
        }
    }, [isTimerActive, timer]);

    const user_Login = () => {
        if (userDe) {
            const userDetails = {
                name: userDe.firstName,
                phone: userDe.phoneNumber,
                email: userDe.email
            };

            fetch(`${spring_boot_url}api/login/submit`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userDetails),
            })
            .then((resp) => {
                if (resp.ok === true) {
                    toast(`User login successfully`, {
                        position: toast.POSITION.BOTTOM_CENTER,
                    });
                    // router.push("/user_dashboard"); // Replace with your own page path // redirect to dashboard on their usertype basis
                    console.log("checking user at login loader modle", userDe);
                }

            })
            .catch((error) => {
                console.error("Error during login:", error);
            });
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
        <Modal className='add-address-modal' centered={true} id='login' isOpen={loginloader} >
            <ModalHeader toggle={toggle}></ModalHeader>
            <ModalBody>
                <LinearProgress />
                <h3> Please Wait....</h3>
            </ModalBody>
        </Modal>
    );
};

export default LoginloaderModle;
