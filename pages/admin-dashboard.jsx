import axios from "axios";
import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import AdminDashboard from "../Components/Pages/Admin Dashboard/AdminDashboard";
import CreateRFQModal from "../Components/Pages/Admin Dashboard/CreateRFQModal";
import RegisterUserModal from "../Components/Pages/Admin Dashboard/RegisterUserModal";
import UpdateSIModal from "../Components/Pages/Admin Dashboard/UpdateSIModal";
import UserProfileModal from "../Components/Pages/Admin Dashboard/UserProfileModal";
import DashboardFooter from "../Layout/Common/Footer/DashboardFooter";
import Layout from "../Layout/Layout";
import spring_boot_url from "../Utils/springApi";

// import { FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE } from "./actionType"; //CHANGES FOR REDUX

console.log("admin-dash");

const adminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [userDe, setUserDe] = useState([]);

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${spring_boot_url}api/adminuser/allusers`
  //     );
  //     setUserDe(response.data);

  //   } catch (error) {
  //     console.log("error in fething data");
  //   }
  // };

  ///////////CHANGES FOR REDUX//////////

  const fetchData = () => async (dispatch) => {

    try {
      const response = await axios.get(`${spring_boot_url}api/adminuser/allusers`);
      dispatch({
        type: FETCH_USERS_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: FETCH_USERS_FAILURE,
        payload: error.message,
      });
    }
  };

  ////////CHANGES END//////////


  useEffect(() => {
    fetchData();
  }, []);

  console.log("checking data flow at a-d", userDe);
  const handleClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <Layout />
      <AdminDashboard userDe={userDe} />
      <RegisterUserModal />
      <UserProfileModal userDe={userDe} />
      <UpdateSIModal />
      <CreateRFQModal />
      <DashboardFooter />
    </>
  );
};

export default adminDashboard;
