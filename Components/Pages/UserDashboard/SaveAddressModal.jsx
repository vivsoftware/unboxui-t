import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Btn } from '../../AbstractElements';
import 'reactjs-popup/dist/index.css';
import Link from 'next/link';
import fetch from 'node-fetch';
import { useRouter } from 'next/router';
import { Close, street, name, phoneNumber, companyName, city, email, state, country, postalCode } from '../../Constant';
import { ToastContainer, toast } from 'react-toastify';
import spring_boot_url from '../../../Utils/springApi';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { auth } from '../../../Config/firebase';

const SaveAddressModal = () => {
  const { saveAddressModal } = useSelector((state) => state.ModalReducer);
  const dispatch = useDispatch();
  const toggle = () => {
    dispatch({ type: 'SAVEADDRESSMODAL' });
  };
  const [name, setName] = useState('')
  const [companyName, setcompanyName] = useState('')
  const [phoneNumber, setphoneNumber] = useState('')
  const [city, setcity] = useState('')
  const [state, setstate] = useState('')
  const [country, setcountry] = useState('')
  const [email, setemail] = useState('')
  const [street, setstreet] = useState('')
  const [postalCode, setpostalCode] = useState('')
  const [userId, setserId] = useState('')
  const [userDe, setUserDe] = useState('')
  const [savedAddresses, setSavedAddresses] = useState([]);
 
  const router = useRouter();
  const [formErrors, setFormErrors] = useState({
    name: '',
    companyName: '',

    city: '',
    state: '',
    country: '',

    street: '',
    postalCode: '',
  });

  const validateForm = () => {
    let isValid = true;
    const errors = {

      companyName: '',
      phoneNumber: '',
      city: '',
      state: '',
      country: '',

      street: '',
      postalCode: '',
    };
    if (!name) {
      isValid = false;
      errors.name = 'Name is required.';
    }

    if (!companyName) {
      isValid = false;
      errors.companyName = 'Company name is required.';
    }

    if (!street) {
      isValid = false;
      errors.street = 'street is required.';
    }
    if (!city) {
      isValid = false;
      errors.city = 'city is required.';
    }
    if (!state) {
      isValid = false;
      errors.state = 'state name is required.';
    }
    if (!country) {
      isValid = false;
      errors.country = 'Country name is required.';
    }

    if (!postalCode) {
      isValid = false;
      errors.postalCode = 'postal code is required.';
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleClick = (e) => {
    e.preventDefault()

    const student = { name, userId, companyName, street, city, state, country, postalCode, email: `${userDe.email}`, phoneNumber: `${userDe.phoneNumber}` }
    fetch(`${spring_boot_url}api/address/${userDe.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student)

    }).then((resp) => {

      const isValid = validateForm();
      if (isValid) {
        toast(`address save... `);
                window.location.reload(); // Refresh the page
        toggle();
        router.push("/user_dashboard");
        
      }
    }
    )
  }

  const [user, setuser] = useState(null)

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      setuser(user)

      console.log("user", user)

      if (user.email) {
        axios.get(`${spring_boot_url}api/users/email?email=${user.email}`)
          .then(resp => {
            console.log(resp.data.json);
            localStorage.setItem("data", JSON.stringify(resp.data));
            setUserDe(resp.data);
          });
      } else if (user.phoneNumber) {
        let phoneNumberd = user.phoneNumber
        phoneNumberd = phoneNumberd.replace(/\+/g, "");
        console.log("phonenumbereeeee", phoneNumberd);
        setphoneNumber(phoneNumberd)
        axios.get(`${spring_boot_url}api/users/phone?phoneNumber=${phoneNumberd}`)
          .then(resp => {
            console.log(resp.data.json);
            localStorage.setItem("data", JSON.stringify(resp.data));
            setUserDe(resp.data);
          });
      
        }
    })
  }, [])

  return (
    <Modal className='add-address-modal' centered={true} id='addAddress' isOpen={saveAddressModal} toggle={toggle}>
      <ModalHeader toggle={toggle}></ModalHeader>
      <ModalBody>
        <Form>
          <div className='mb-3'>
            <label htmlFor='name' className='form-label font-light'>
              Name
            </label>
            <Input type='text' className='form-control otp-phone' id='name' placeholder='Full Name' value={name} onChange={(e) => setName(e.target.value)} required />
            {formErrors.name && <div className="error" style={{ color: 'red' }}>{formErrors.name}</div>}
          </div>
          <div className='mb-3'>
            <label htmlFor='companyName' className='form-label font-light'>
              Company Name
            </label>
            <Input type='text' className='form-control otp-phone' id='companyName' placeholder='Company Name' value={companyName} onChange={(e) => setcompanyName(e.target.value)} required />
            {formErrors.companyName && <div className="error" style={{ color: 'red' }}>{formErrors.companyName}</div>}
          </div>
          <div>
            <label htmlFor='street' className='form-label font-light'>
              Plot No.
            </label>
            <Input type='text' className='form-control otp-phone' id='street' placeholder='A-12' value={street} onChange={(e) => setstreet(e.target.value)} required />
            {formErrors.street && <div className="error" style={{ color: 'red' }}>{formErrors.street}</div>}
          </div>
          <div>
            <label htmlFor='text' className='form-label font-light'>
              City
            </label>
            <Input type='text' className='form-control otp-phone' id='number' placeholder='Gurgaon' value={city} onChange={(e) => setcity(e.target.value)} required />
            {formErrors.city && <div className="error" style={{ color: 'red' }}>{formErrors.city}</div>}
          </div>
          <div>
            <label htmlFor='state' className='form-label font-light'>
              State
            </label>
            <Input type='text' className='form-control otp-phone' id='state' placeholder='Haryana' value={state} onChange={(e) => setstate(e.target.value)} required />
            {formErrors.state && <div className="error" style={{ color: 'red' }}>{formErrors.state}</div>}
          </div>
          <div>
            <label htmlFor='country' className='form-label font-light'>
              Country
            </label>
            <Input type='text' className='form-control otp-phone' id='country' placeholder='India' value={country} onChange={(e) => setcountry(e.target.value)} required />
            {formErrors.country && <div className="error" style={{ color: 'red' }}>{formErrors.country}</div>}
          </div>

          <div>
            <label htmlFor='postalCode' className='form-label font-light'>
              Postal Code
            </label>
            <Input type='number' className='form-control otp-phone' id='postalCode' placeholder='123456' value={postalCode} onChange={(e) => setpostalCode(e.target.value)} required />
            {formErrors.postalCode && <div className="error" style={{ color: 'red' }}>{formErrors.postalCode}</div>}
          </div>
        </Form>
      </ModalBody>
      <ModalFooter className='pt-0 text-end d-block'>
        <Btn attrBtn={{ className: 'text-white rounded-1 modal-close-button', onClick: () => toggle() }}>{Close}</Btn>
        <button type="button" class="btn login_btn" onClick={handleClick} >Save</button>
      </ModalFooter>
    </Modal>
  );
};

export default SaveAddressModal;
