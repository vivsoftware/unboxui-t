import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../Config/firebase';

const ForgotPasswordSection = () => {
  const router = useRouter();

  const notify = () => toast("Verification link sent");

  async function sendPasswordReset(email) {
    try {
      await sendPasswordResetEmail(auth, email);
      console.log("Password reset email sent successfully");
      notify();
    } catch (error) {
      console.error("Error sending password reset email", error);
    }
  }

  function handlePasswordReset(event) {
    event.preventDefault();
    const email = event.target.email.value;
    sendPasswordReset(email);
  }

  return (
    <div className='login-section'>
      <div className='materialContainer'>
        <div className='box'>
          <div className='login-title'>
            <h2>Forgot Password</h2>
          </div>
          <form onSubmit={handlePasswordReset}>
            <div className='input'>
              <input type="email" id="email" name="email" required />
              <span className='spin'></span>
            </div>
            <div className='button login button-1'>
              <button type="submit">Reset Password</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordSection;
