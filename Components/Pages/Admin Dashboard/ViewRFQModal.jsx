import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import spring_boot_url from '../../../Utils/springApi';
import axios from 'axios';
const ViewRFQModal = ({ isOpen, onClose, userData }) => {
  const [uploadRfq, setuploadRfq] = useState("");

  if (!isOpen || !userData) {
    return null;
  }
  const dispatch = useDispatch();
  const editProfile = () => {
    dispatch({ type: "CREATERFQMODAL" });
  }

  // useEffect(() => {

  //   axios.get(`${spring_boot_url}api/${userData.id}/download`)
  //     .then(resp => {
  //       console.log(resp.data.json);
  //       localStorage.setItem("data", JSON.stringify(resp.data));
  //       setuploadRfq(resp.data);
  //     });
  // }, []);




  return (
    <div className="my-modal">
      <div className="my-modal-content">
        <h3 className='mb-2'>User Profile</h3>
        <p>Project Name: {userData.productName}</p>
        <p>Created At: {userData.createdAt}</p>
        <p>Created By: {userData.createdBy}</p>
        <p>Status: {userData.status}</p>
        <p>Customer Name: {userData.name}</p>
        <p>Customer Email Id: {userData.email}</p>
        <p>Customer Phone No.: {userData.phoneNumber}</p>
        <button onClick={editProfile}>Edit</button>
        <button onClick={onClose}>Delete</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  )
}

export default ViewRFQModal
