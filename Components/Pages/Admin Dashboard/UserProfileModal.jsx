import React,{useState} from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import springWithAuth from '../../../Utils/spring_auth';
import { Form, Input, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const UserProfileModal = (userDe) => {
  
  const { userProfileModal } = useSelector((state) => state.ModalReducer);
  const dispatch = useDispatch();
  const toggle = () => {
    dispatch({ type: 'USERPROFILEMODAL' });
  };
  const editProfile = () => {
    dispatch({type: 'REGISTERSIMODAL'})
  }
  
  return (
    <>
      <Modal className='add-address-modal' centered={true} id='addAddress' isOpen={userProfileModal} toggle={toggle} backdrop="static" keyboard={false}>
        <ModalHeader toggle={toggle}></ModalHeader>
        <ModalBody className='custom-modal-body'>
        <div className=''>
        <div className='row mt-4'>
          <div className='col-6'>
            <h2>Profile</h2>
          </div>
          <div className='col-3'></div>
          <div className='col-3'>
            <button className="btn ViewSI-btn" >
              <i className='bi bi-trash' style={{ color: 'white' }}></i>Delete
            </button>
          </div>
        </div>
        <div className='SI-profileCard mt-1 mb-3'>
          <div className='row'>
            <div className='col-6'>
              <img src='/You2.png' style={{ borderRadius: '50%', width: '100px', height: '90px' }} />
            </div>
            <div className='col-6 text-end'>
              <button className='btn' style={{ backgroundColor: 'white', color: "#FF8400", height: '20px', padding: '0' }} onClick={editProfile}>Edit</button>
            </div>
          </div>
          <div className='row'>
            <div className='col-4'>
              <label style={{ color: '#979696 ' }}>Name:</label>
            </div>
            <div className='col-6'>
              <p>{userDe[0]?.name}</p>
            </div>

          </div>
          <div className='row'>
            <div className='col-4'>
              <label style={{ color: '#979696 ' }}>Company Name:</label>
            </div>
            <div className='col-6'>
              <p>Pooja Sharma</p>
            </div>

          </div>
          <div className='row'>
            <div className='col-4'>
              <label style={{ color: '#979696 ' }}>Email Id:</label>
            </div>
            <div className='col-6'>
              <p>{userDe.email}</p>
            </div>

          </div>
          <div className='row'>
            <div className='col-4'>
              <label style={{ color: '#979696 ' }}>Phone No.:</label>
            </div>
            <div className='col-6'>
              <p>Pooja Sharma</p>
            </div>

          </div>
          <div className='row'>
            <div className='col-4'>
              <label style={{ color: '#979696 ' }}>Region:</label>
            </div>
            <div className='col-6'>
              <p>Pooja Sharma</p>
            </div>

          </div>
          <div className='row'>
            <div className='col-4'>
              <label style={{ color: '#979696 ' }}>Address:</label>
            </div>
            <div className='col-6'>
              <p>Pooja Sharma</p>
            </div>

          </div>
          <div className='row'>
            <div className='col-4'>
              <label style={{ color: '#979696 ' }}>Type:</label>
            </div>
            <div className='col-6'>
              <p>Pooja Sharma</p>
            </div>

          </div>
          <div className='row'>
            <div className='col-4'>
              <label style={{ color: '#979696 ' }}>Description:</label>
            </div>
            <div className='col-6'>
              <p>Pooja Sharma</p>
            </div>

          </div>
        </div>
        </div>
        </ModalBody>
      </Modal>
    </>
  )
}

export default UserProfileModal





