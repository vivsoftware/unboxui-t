import React from 'react';
import { useDispatch } from 'react-redux';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../Config/firebase';
import { toast } from 'react-toastify';

const ForgotPasswordSection = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  /////////changes///////
  const showError = (message,option) =>{
    toast.dismiss();
    toast.error(message,option);
  }
  ////end///////////

  const handlePasswordReset = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;

    try {
      await sendPasswordResetEmail(auth, email);
      console.log('Password reset email sent successfully');
      toast.success('Reset Password link has been sent to your email');
      onClose();
    } catch (error) {
      console.error('Error sending password reset email', error);
      // toast.error('Failed to send reset password link');
      showError("Please enter correct email address", {
        position: toast.POSITION.TOP_CENTER,

      })
    }


  };


  

  return (
    <Modal isOpen={isOpen} toggle={onClose} contentLabel="Forgot Password Modal">
      <ModalHeader toggle={onClose}></ModalHeader>
      <ModalBody>
        <div className='materialContainer' style={{width: "20px", height: "160px", borderRadius: "2px", border: "black"}}>
          <div className='box'>
            <div className='login-title'>
              <h3 className='text-center mb-3' style={{color:'#FF8400', marginTop: '30px', marginLeft: '86px'}}>Forgot Password ?</h3>
            </div>
            <form onSubmit={handlePasswordReset}>
              <div className='input text-center'>
                <label className='me-2' style={{fontSize: '16px'}}>Enter Email:</label>
                <input type='email' placeholder='roshnee@gmail.com' id='email' name='email' required style={{color:'black',width:'220px'}} />
              </div>
              <div className='text-center mt-3'>
                <button type='submit' className='btn reset-btn' style={{fontWeight:'normal', marginLeft: '86px'}}>
                  Reset Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ForgotPasswordSection;


