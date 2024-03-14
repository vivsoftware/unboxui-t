import React, { useState } from 'react';
import { getAuth, updatePassword } from 'firebase/auth';
import { useRouter } from 'next/router';
import { auth } from '../../Config/firebase';
const SetNewPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleSetNewPassword = async (e) => {j
    e.preventDefault();

    try {
      const user = auth.currentUser;

      // Update the user's password with the new password
      await updatePassword(user, newPassword);

      // Reset form and show success message
      setNewPassword('');
      setSuccessMessage('Password updated successfully!');
                      router.push("/page/loginunbox");

      setErrorMessage('');
    } catch (error) {
      // Handle error and show error message
      setSuccessMessage('');
      setErrorMessage(error.message);
    }
  };

  return (
    <div>
      <h2>Set New Password</h2>
      <form onSubmit={handleSetNewPassword}>
        <div>
          <label htmlFor="newPassword">New Password</label>
          <input type="password" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
        </div>
        <button type="submit">Set Password</button>
      </form>
      {successMessage && <p>{successMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default SetNewPassword;
