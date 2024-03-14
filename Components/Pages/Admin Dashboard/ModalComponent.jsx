import React from 'react'
import { useDispatch } from 'react-redux';

const ModalComponent = ({ isOpen, onClose, userData }) => {
    if (!isOpen || !userData) {
        return null;
      }
      const dispatch = useDispatch();
      const editProfile = () => {
        dispatch({ type: "REGISTERSIMODAL" });
      }
  return (
    <div className="my-modal">
      <div className="my-modal-content">
       <h3 className='mb-2'>User Profile</h3>
        <p>Name: {userData.firstName}</p>
        <p>User Id: {userData.id}</p>
        <p>Email Id: {userData.email}</p>
        <p>Phone No: {userData.phoneNumber}</p>
        <p>Company Name: {userData.company}</p>
        <p>Type: {userData.userTypes}</p>
        <button onClick={editProfile}>Edit</button>
        <button onClick={onClose}>Delete</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  )
}

export default ModalComponent
