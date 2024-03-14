import React from 'react'
import Layout from  '../Layout/Layout';
import DashboardFooter from '../Layout/Common/Footer/DashboardFooter';
// import SPDashboard from '../Components/Pages/Service Provider Dashboard/SP Dashboard';
import RegisterSIModal from '../Components/Pages/Admin Dashboard/RegisterUserModal';
import CreateRFQModal from '../Components/Pages/Buyer Dashboard/CreateRFQModal';

const serviceProviderDashboard = () => {
  return (
    <>
      <Layout/>
      <SPDashboard/>
      <RegisterSIModal/>
      <CreateRFQModal/>
      <DashboardFooter/>
    </>
  )
}

export default serviceProviderDashboard
