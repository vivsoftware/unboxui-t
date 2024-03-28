import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail, } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Form, Input, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { auth } from '../../../Config/firebase';
import spring_boot_url from '../../../Utils/springApi';

const RegisterSIModal = () => {
  const { registerSIModal } = useSelector((state) => state.ModalReducer);
  const dispatch = useDispatch();
  const toggle = () => {
    dispatch({ type: 'REGISTERSIMODAL' });
  };

  const [name, setName] = useState('')
  const [company, setCompanyName] = useState('')
  const [imageUrl, setimageurl] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [type, setType] = useState('')
  const [subType, setSubType] = useState('')
  const [description, setDescription] = useState('')
  const [userDe, setuserDe] = useState(null);
  const [firstName, setfirstName] = useState('')
  const [user, setuser] = useState(null)
  const [about, setabout] = useState('')
  const [passwordfirebase, setpasswordfirebase] = useState('')
  const [userTypes, setuserTypes] = useState('')
  const [subuserTypes, setsubuserTypes] = useState('')
  const [lastName, setlastName] = useState('')
  const handleReload = () => {
    router.reload();
  };
  
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      setuser(user)
    })
  }, [])
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      // createUserWithEmailAndPassword(auth, email, password)
      const { user } = await createUserWithEmailAndPassword(auth, email, passwordfirebase);
      // Send the email verification link to the user's email.
      // await sendEmailVerification(auth.currentUser);
      // Email verification link sent successfully.
      console.log('Email verification link sent!');
      if (user.email) {
        toast(` Signup Sucessfully`, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      } else {
        toast(`Please check all filled details  `);
      }
      // Additional logic after successful sign-up (e.g., redirect to a new page).
      // ...
    } catch (error) {
      // Handle sign-up error.
      if (error.message === "Firebase: Error (auth/email-already-in-use).") {
        setErrorMessage("User is Already Registered")
        signOut();
      }
      console.log('Error signing up:', error.message);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if any required field is empty
    if (!firstName || !email || !phoneNumber || !userTypes) {
        // Handle the case when a required field is empty
        toast.error('Please fill in all required fields.');
        return;
    }
    else{
      toggle();
    }
    // Proceed with form submission
    handleSignUp(e);
    let phoneNumberd = phoneNumber;
    phoneNumberd = phoneNumberd.replace(/\+/g, '');
    const userDetails = {
      firstName,
      lastName,
      email,
      password: `${passwordfirebase}`,
      about: "faff",
      phoneNumber: `${phoneNumberd}`,
      company,
      userTypes,
      subuserTypes: "ggfg"
    };
    console.log(userDetails);
    fetch(`${spring_boot_url}api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userDetails),
    }).then((resp) => {
      setuserDe(resp.body);
      if (resp.ok === true) {
        const { user } = createUserWithEmailAndPassword(auth, email, passwordfirebase);
          router.reload();
        
      }
    });
  };
  const [isRegistered, setIsRegistered] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const handleCheckEmailRegistered = async (e) => {
    e.preventDefault();
    try {
      // Check if the email is already registered
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      // If signInMethods array is empty, the email is not registered
      // setIsRegistered(signInMethods.length > 0);
      // setErrorMessage('');
    } catch (error) {
      // Handle error and show error message
      // setIsRegistered(false);
      // setErrorMessage(error);
    }
  };
  const signOut = () => {
    auth.signOut().then(() => {
      setuser(null)
      auth.onAuthStateChanged(async (user) => {
        setuser(user)
      })
    })
  }
  const [formErrors, setFormErrors] = useState({
    name: '',
    company: '',
    phoneNumber: '',
    email: '',
    password: '',
    type: '',
    subType: '',
  });
  const validateForm = () => {
    let isValid = true;
    const errors = {
      name: '',
      company: '',
      phoneNumber: '',
      email: '',
      password: '',
      type: '',
      subType: '',
    };
    if (!name) {
      isValid = false;
      errors.name = 'Name is required.';
    }
    if (!company) {
      isValid = false;
      errors.company = 'Company name is required.';
    }
    if (!type) {
      isValid = false;
      errors.type = 'Type is required.';
    }

    if (!phoneNumber) {
      isValid = false;
      errors.phoneNumber = 'Phone Number is required.';
    }
    if (!email) {
      isValid = false;
      errors.email = 'Email is required.';
    }
    if (!password) {
      isValid = false;
      errors.password = 'Password is required.';
    }
    if (!subType) {
      isValid = false;
      errors.subType = 'SubType is required.';
    }
    setFormErrors(errors);
    return isValid;
  };
  const usertypes = (e) => {
    setuserTypes(e.target.value);
  };
  return (
    <>
      <Modal className='add-address-modal' centered={true} id='addAddress' isOpen={registerSIModal} toggle={toggle} backdrop="static" keyboard={false}>
        <ModalHeader toggle={toggle}></ModalHeader>
        <ModalBody className='custom-modal-body'>
          <Form>
            <div className=''>
              <label htmlFor='name' className='form-label font-light'>
                First Name
              </label>
              <Input type='text' className='form-control otp-phone' id='name' placeholder='First Name' onChange={(e) => setfirstName(e.target.value)} required />
              {formErrors.firstName && <div className="error" style={{ color: 'red' }}>{formErrors.firstName}</div>}
            </div>
            <div className=''>
              <label htmlFor='name' className='form-label font-light'>
                Last Name
              </label>
              <Input type='text' className='form-control otp-phone' id='name' placeholder='Last Name' onChange={(e) => setlastName(e.target.value)} required />
              {formErrors.lastName && <div className="error" style={{ color: 'red' }}>{formErrors.lastName}</div>}
            </div>
            <div>
              <label htmlFor='text' className='form-label font-light'>
                Phone Number
              </label>
              <PhoneInput international defaultCountry='IN' type="tel" class="form-control" id="exampleInputPhone" value={phoneNumber} onChange={(setPhoneNumber)} required />
              {formErrors.phoneNumber && <div className="error" style={{ color: 'red' }}>{formErrors.phoneNumber}</div>}
            </div>
            <div>
              <label htmlFor='state' className='form-label font-light'>
                Email Id
              </label>
              <Input type='email' className='form-control otp-phone' id='state' placeholder='abc@xyz.com' onChange={(e) => setEmail(e.target.value)} required />
              {formErrors.email && <div className="error" style={{ color: 'red' }}>{formErrors.email}</div>}
            </div>
            <div>
              <label htmlFor='state' className='form-label font-light'>
                Password
              </label>
              <Input type='password' className='form-control otp-phone' id='state' placeholder='*******' onChange={(e) => setpasswordfirebase(e.target.value)} required />
              {formErrors.password && <div className="error" style={{ color: 'red' }}>{formErrors.password}</div>}
            </div>
            <div className=''>
              <label htmlFor='companyName' className='form-label font-light'>
                Company Name
              </label>
              <Input type='text' className='form-control otp-phone' id='companyName' placeholder='Company Name' onChange={(e) => setCompanyName(e.target.value)} required />
              {formErrors.company && <div className="error" style={{ color: 'red' }}>{formErrors.company}</div>}
            </div>
            <div>
              <label htmlFor='country' className='form-label font-light'>
                Type
              </label>
              <div className="form-check">
                <label className="form-check-label">
                  <input
                    type="radio"
                    className="form-check-input otp-phone"
                    name="userType"
                    value="Seller"
                    onChange={usertypes}
                    checked={userTypes === 'seller'}
                  />
                  Seller
                </label>
              </div>
              <div className="form-check">
                <label className="form-check-label">
                  <input
                    type="radio"
                    className="form-check-input otp-phone"
                    name="userType"
                    value="Buyer"
                    onChange={usertypes}
                    checked={userTypes === 'Buyer'}
                  />
                  Buyer
                </label>
              </div>
            </div>
            <div>
              <label htmlFor='country' className='form-label font-light'>
                SubuserTypes(optional)
              </label>
              <Input type='text' className='form-control otp-phone' id='country' placeholder='India' onChange={(e) => setsubuserTypes(e.target.value)} required />
              {formErrors.subType && <div className="error" style={{ color: 'red' }}>{formErrors.subType}</div>}
            </div>
            <div className='row'>
              <div className='col-lg-6 col-md-6 col-sm-12'>
                <button type="button" className="btn registerSI-btn mt-2" onClick={handleSubmit}>Save</button>
              </div>
              <div className='col-lg-6 col-md-6 col-sm-12'>
                <button type="button" className="btn registerSI-btn mt-2" onClick={toggle}>Close</button>
              </div>
            </div>
          </Form>
        </ModalBody>
      </Modal>
    </>
  )
}
export default RegisterSIModal

