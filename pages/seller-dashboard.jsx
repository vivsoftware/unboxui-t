// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import RegisterSIModal from '../Components/Pages/Admin Dashboard/RegisterUserModal'
// import CreateRFQModal from '../Components/Pages/Buyer Dashboard/CreateRFQModal'
// import SellerDashboard from '../Components/Pages/Seller Dashboard/SellerDashboard'
// import { auth } from '../Config/firebase'
// import DashboardFooter from '../Layout/Common/Footer/DashboardFooter'
// import Layout from '../Layout/Layout'
// import spring_boot_url from '../Utils/springApi'
// const sellerDashboard = () => {
//   const [activeTab, setActiveTab] = useState('dashboard'); 
//   const [rfq, setRFQ] = useState(null);
//   const [tender, settender] = useState(null);
//   const [isDropdownVisible, setDropdownVisible] = useState(false);
//   const [showDetails, setShowDetails] = useState(true);
//   const [userDe, setUserDe] = useState(null);
//   const [user, setuser] = useState(null)
//   const [registeredUser, setRegisteredUsers] = useState(null);
//   useEffect(() => {
//     auth.onAuthStateChanged(async (user) => {
//       setuser(user)
      
//       if (user.email) {
//         axios.get(`${spring_boot_url}api/users/email?email=${user.email}`)
//           .then(resp => {
//             setUserDe(resp.data);
//             // setRegisteredUsers(resp.data.id); // Update registeredUser with the fetched user data id
//             // console.log("Registerd user ID In pages/sellersDashbord 1", registeredUser);
//           });
//       } else if (user.phoneNumber) {
//         let phoneNumberd = user.phoneNumber
//         phoneNumberd = phoneNumberd.replace(/\+/g, "");
//         console.log("phonenumbereeeee", phoneNumberd);
//         axios.get(`${spring_boot_url}api/users/phone?phoneNumber=${phoneNumberd}`)
//           .then(resp => {
//             setUserDe(resp.data);
//             // setRegisteredUsers(resp.data.id); // Update registeredUser with the fetched user data id
//             // console.log("Registered user ID after update:", resp.data.id);


//           });
//       }
//     })
//   }, [])

//   useEffect(() => {
//     if (userDe) {
//       setRegisteredUsers(userDe?.id);
//       console.log("Registerd user ID:", registeredUser);
//     }
//   }, [userDe]);

//   const userId = userDe?.id;
//   console.log("userID In pages/sellersDashbord", userId);
//   useEffect(() => {
//     axios.get(`${spring_boot_url}api/userRfq/${userId}`)
//       .then(resp => {
//         setRFQ(resp.data);
        
//       })
//       .catch(error => {
//         console.error('Error fetching user RFQ data:', error);
//       });
//   }, [userId]); // Include userId in the dependency array
  

//   useEffect(() => {
//     axios.get(`${spring_boot_url}api/tender/${userId}`)
//       .then(resp => {
//         settender(resp.data);
//         console.log("settender in s-d", tender);
//         console.log("userid in s-d", userId);
        
        
//       })
//       .catch(error => {
//         console.error('Error fetching user RFQ data:', error);
//       });
//   }, [userId]); // Include userId in the dependency array


//   useEffect(() => {
//     if (registeredUser) {
//       console.log("Registerd user ID ue:", registeredUser);
//     }
//   }, [registeredUser]);
   
//   // console.log("userDe in s-d", userDe);
//   // useEffect(() => {
   
//   // }, [registeredUser]);


  
//   return (
//     <>
//     <Layout/>
  
//       <SellerDashboard rfq={rfq} tender={tender} userDe={userDe} userId={userId} registeredUser={registeredUser}/>
//       <RegisterSIModal/>
//       <CreateRFQModal rfq={rfq} />
//       <DashboardFooter/>
//     </>
//   )
// }

// export default sellerDashboard


import axios from 'axios';
import React, { useEffect, useState } from 'react';
import RegisterSIModal from '../Components/Pages/Admin Dashboard/RegisterUserModal';
import CreateRFQModal from '../Components/Pages/Buyer Dashboard/CreateRFQModal';
import SellerDashboard from '../Components/Pages/Seller Dashboard/SellerDashboard';
import { auth } from '../Config/firebase';
import DashboardFooter from '../Layout/Common/Footer/DashboardFooter';
import Layout from '../Layout/Layout';
import spring_boot_url from '../Utils/springApi';

const sellerDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [rfq, setRFQ] = useState(null);
  const [tender, settender] = useState(null);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(true);
  const [userDe, setUserDe] = useState(null);
  const [user, setuser] = useState(null);
  const [registeredUser, setRegisteredUsers] = useState(null);
  const [userReg, setUserReg ] = useState(null );
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      setuser(user);
      if (user.email) {
        axios.get(`${spring_boot_url}api/users/email?email=${user.email}`)
          .then(resp => {
            setUserDe(resp.data);
          });
      } else if (user.phoneNumber) {
        let phoneNumberd = user.phoneNumber;
        phoneNumberd = phoneNumberd.replace(/\+/g, "");
        console.log("phonenumbereeeee", phoneNumberd);
        axios.get(`${spring_boot_url}api/users/phone?phoneNumber=${phoneNumberd}`)
          .then(resp => {
            setUserDe(resp.data);
          });
      }
    });
  }, []);

  useEffect(() => {
    if (userDe) {
      setRegisteredUsers(userDe.id);
    }
  }, [userDe]);

  const userId = userDe?.id;
  console.log("userID In pages/sellersDashbord", userId);

  useEffect(() => {
    axios.get(`${spring_boot_url}api/userRfq/${userId}`)
      .then(resp => {
        setRFQ(resp.data);
      })
      .catch(error => {
        console.error('Error fetching user RFQ data:', error);
      });
  }, [userId]);

  useEffect(() => {
    axios.get(`${spring_boot_url}api/tender/${userId}`)
      .then(resp => {
        settender(resp.data);
        console.log("settender in s-d", tender);
        console.log("userid in s-d", userId);
      })
      .catch(error => {
        console.error('Error fetching user RFQ data:', error);
      });
  }, [userId]);

  useEffect(() => {
    if (registeredUser) {
      console.log("Registerd user ID:", registeredUser);
    }
  }, [registeredUser]);
  
  return (
    <>
      <Layout />
      <SellerDashboard rfq={rfq} tender={tender} userDe={userDe} userId={userId} registeredUser={registeredUser} />
      <RegisterSIModal />
      <CreateRFQModal rfq={rfq} />
      <DashboardFooter />
    </>
  );
};

export default sellerDashboard;