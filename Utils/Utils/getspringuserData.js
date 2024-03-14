import spring_boot_url from "./springApi";
import React, { Fragment, useEffect, useState } from 'react';
import axios from "axios";
import SaveAddressModal from "../Components/Pages/UserDashboard/SaveAddressModal";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    signInWithPhoneNumber,
    getAuth,
    RecaptchaVerifier
} from 'firebase/auth';

import { auth } from "../Config/firebase";

const GetspringData = () => {

    const [userDe, setUserDe] = useState(null);
    const [user, setuser] = useState(null)


    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            setuser(user)
            console.log("user", user)
            if (user.email) {
                axios.get(`${spring_boot_url}api/users/email?email=${user.email}`)
                    .then(resp => {
                        console.log(resp.data.json);
                        localStorage.setItem("data", JSON.stringify(resp.data));
                        setUserDe(resp.data);
                    });
            } else if (user.phoneNumber) {
                let phoneNumberd = user.phoneNumber
                phoneNumberd = phoneNumberd.replace(/\+/g, "");
                console.log("phonenumbereeeee", phoneNumberd);
                axios.get(`${spring_boot_url}api/users/phone?phoneNumber=${phoneNumberd}`)
                    .then(resp => {
                        console.log(resp.data.json);
                        localStorage.setItem("data", JSON.stringify(resp.data));
                        setUserDe(resp.data);
                    });
            }
        })
    }, [])

    if (!userDe) {

        return <p>Loading.............</p>;

    }



    return (

        <SaveAddressModal userDe={userDe} />

    )

}
export default GetspringData;