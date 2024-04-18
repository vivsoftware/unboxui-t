import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import spring_boot_url from '../Utils/springApi';

const Loader = ({ user }) => {
    const [open, setOpen] = useState(false);
    const [userDe, setUserDe] = React.useState(10);
    const [progress, setProgress] = React.useState(0);
    const router = useRouter();

    useEffect(() => {
        setOpen(true);
        const timer = setTimeout(() => {
            if (user?.email) {
                axios.get(`${spring_boot_url}api/users/email?email=${user.email}`)
                    .then(resp => {
                        console.log(resp.data.json);
                        // localStorage.setItem("data", JSON.stringify(resp.data));
                        setUserDe(resp.data);
                        if (!resp.data) {
                            console.log("no user found......")
                            setsingupMessage("Please sign up")
                            toast(` User not Found Please signup`, {
                                position: toast.POSITION.BOTTOM_CENTER,
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
                                });
                            // dispatch({ type: "LOGINLOADER" });
                        }
                    });
            } else if (!user) {
                toast(`No user found ... `);
            }
            if (!user) {
                setLoginError(true);
            }
            if (userDe) {
                router.push("/user_dashboard");
            }
        }, 2000);

    }, []); // Run once when component mounts


    const handleClose = () => {
        setOpen(false);
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        opacity: 0.5,

        transform: 'translate(-50%, -50%)',
        width: 1496,
        height: 700,
        borderRadius: "10px",
        bgcolor: 'background.paper',
        border: '4px solid #ff8400',
        boxShadow: 24,
        p: 4,
    };


    return (
        <>
            <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    {/* <p style={{ fontSize: '20px', marginTop: "-20px" }}> Please wait...we are login you soon!
                        <br />
                    </p>
                    <p style={{ marginLeft: "50px", marginTop: "-24px" }}>
                        <Img src="Logofinal.svg" alt="unbox" width={200} height={100} />
                    </p> */}
                    <CircularProgress style={{ marginTop: "284px", marginLeft: "603px", color: "#ff8400", borderRadius: "10px", width: "163px", height: "70px" }} />
                </Box>

            </Modal>
        </>
    );
};




export default Loader;

