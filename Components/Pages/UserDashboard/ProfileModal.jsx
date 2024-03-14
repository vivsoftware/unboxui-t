import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Btn } from '../../AbstractElements';
import { Close, Savechanges } from '../../Constant';
import { reauthenticateWithCredential, updatePassword, EmailAuthProvider } from 'firebase/auth';
import { auth } from '../../../Config/firebase';
import Router from 'next/router';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const ProfileModal = () => {
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [user, setuser] = useState(null)

  const dispatch = useDispatch();
  const { profileModal } = useSelector((state) => state.ModalReducer);
  const toggle = () => {
    dispatch({ type: 'ISPROFILEMODAL' });
  };
  const router = useRouter();
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      setuser(user)
    }
    )
  }, [])

  const signOut = () => {
    auth.signOut().then(() => {
      setuser(null)
      auth.onAuthStateChanged(async (user) => {
        setuser(user)
        console.log(user)
        if (user === null) {
          router.push("/login"); // Replace with your own page path
        }
      })
    })
  }

  const handleChangePassword = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    try {
      // Reauthenticate the user with their current password
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);
      // Update the user's password with the new password
      await updatePassword(user, newPassword);
      // Password changed successfully
      toast(` Password Changed `, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      signOut();
    } catch (error) {
      // Handle the error during password change
      toast(` Error  ${error.message}`, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <Modal className={`reset-email-modal ${profileModal ? 'd-block' : 'd-none'}`} isOpen={profileModal} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        <h3 className='modal-title' id='exampleModalLabel'>
          Change your Password
        </h3>
      </ModalHeader>
      <ModalBody className='pt-3'>
        <Form>
          <div>
            <label htmlFor='currentPassword' className='form-label font-light'>
              Current Password
            </label>
            <div className="password-input">
            <Input type={showPassword ? 'text' : 'password'} className='form-control' id='currentPassword' value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
            <div
          className="password-toggle"
          onClick={handleTogglePassword}
        >
          <FontAwesomeIcon
            icon={showPassword ? faEyeSlash : faEye}
          />
          </div>
          </div>
          </div>
          <div>
            <label htmlFor='newPassword' className='form-label font-light'>
              New Password
            </label>
            <div className='password-input'>
            <Input type={showPassword ? 'text' : 'password'} className='form-control' id='newPassword' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            <div
          className="password-toggle"
          onClick={handleTogglePassword}
        >
          <FontAwesomeIcon
            icon={showPassword ? faEyeSlash : faEye}
          />
          </div>
          </div>
              </div>
        </Form>
      </ModalBody>
      <ModalFooter className='pt-0'>
        <Btn attrBtn={{ className: 'btn bg-secondary rounded-1 modal-close-button', onClick: toggle }}>
          {Close}
        </Btn>
        <Btn attrBtn={{ className: 'btn btn-solid-default rounded-1', onClick: handleChangePassword }}>
          {Savechanges}
        </Btn>
      </ModalFooter>
    </Modal>
  );
};

export default ProfileModal;

