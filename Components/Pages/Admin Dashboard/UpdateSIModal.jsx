import React from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Form, Input, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { useState, useEffect } from 'react';
import spring_boot_url from '../../../Utils/springApi';
import { ToastContainer, toast } from 'react-toastify';

const UpdateSIModal = () => {

    const { updateSIModal } = useSelector((state) => state.ModalReducer);
  const dispatch = useDispatch();
  const toggle = () => {
    dispatch({ type: 'UPDATESIMODAL' });
  };
  const [name, setName] = useState('')
  const [company, setCompanyName] = useState('')
  const [imageUrl, setimageurl] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [address, setAddress] = useState('')
  const [city, setcity] = useState('')
  const [email, setEmail] = useState('')
  const [type, setType] = useState('')
  const [description, setDescription] = useState('')
  const [userDe, setuserDe] = useState(null);



  const handleSubmit = (e) => {

    const refresh = () => window.location.reload(true)

    e.preventDefault();
    // Check if any required field is empty
    if (!name || !city || !email || !address || !type || !description || !company) {
      // Handle the case when a required field is empty
      toast.error('Please fill in all required fields.');
      return;
    }
    // Proceed with form submission
    let phoneNumberd = phoneNumber;
    phoneNumberd = phoneNumberd.replace(/\+/g, '');
    const userDetails = {
      name,
      email,
      city,
      company,
      type,
      phoneNumber: `${phoneNumberd}`,
      address,
      imageUrl,
      description,
    };
    console.log(userDetails);
    fetch(`${spring_boot_url}api/si/SystemInergrator`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userDetails),
    }).then((resp) => {
      setuserDe(resp.body);

      if (resp.ok === true) {
        toast('Si Registered successfully');
        toggle();
        refresh();
      }
    });
  };



  const [formErrors, setFormErrors] = useState({
    name: '',
    company: '',
    city: '',
    phoneNumber: '',
    email: '',
    address: '',
    type: '',
    description: '',
    imageUrl: '',
  });

  const validateForm = () => {
    let isValid = true;
    const errors = {

      name: '',
      company: '',
      city: '',
      phoneNumber: '',
      email: '',
      address: '',
      type: '',
      description: '',
      imageUrl: '',
    };
    if (!name) {
      isValid = false;
      errors.name = 'Name is required.';
    }

    if (!company) {
      isValid = false;
      errors.company = 'Company name is required.';
    }

    if (!city) {
      isValid = false;
      errors.city = 'Region is required.';
    }
    if (!type) {
      isValid = false;
      errors.type = 'Type is required.';
    }
    if (!description) {
      isValid = false;
      errors.description = 'Description is required.';
    }
    if (!phoneNumber) {
      isValid = false;
      errors.phoneNumber = 'Phone Number is required.';
    }

    if (!email) {
      isValid = false;
      errors.email = 'Email is required.';
    }
    if (!address) {
      isValid = false;
      errors.address = 'Address is required.';
    }
    if (!imageUrl) {
      isValid = false;
      errors.imageUrl = 'Company Logo is required.';
    }

    setFormErrors(errors);
    return isValid;
  };



  return (
    <>
       <Modal className='add-address-modal' centered={true} id='addAddress' isOpen={updateSIModal} toggle={toggle} backdrop="static" keyboard={false}>
        <ModalHeader toggle={toggle}></ModalHeader>
        <ModalBody className='custom-modal-body'>
          <Form>
            <div className='mb-3'>
              <label htmlFor='name' className='form-label font-light'>
                Name
              </label>
              <Input type='text' className='form-control otp-phone' id='name' placeholder='Full Name' onChange={(e) => setName(e.target.value)} required />
              {formErrors.name && <div className="error" style={{ color: 'red' }}>{formErrors.name}</div>}
            </div>
            <div>
              <label htmlFor='text' className='form-label font-light'>
                Phone Number
              </label>
              <Input type='number' className='form-control otp-phone' id='number' placeholder='9871963258' onChange={(e) => setPhoneNumber(e.target.value)} required />
              {formErrors.phoneNumber && <div className="error" style={{ color: 'red' }}>{formErrors.phoneNumber}</div>}
            </div>
            <div>
              <label htmlFor='state' className='form-label font-light'>
                Email Id
              </label>
              <Input type='email' className='form-control otp-phone' id='state' placeholder='abc@xyz.com' onChange={(e) => setEmail(e.target.value)} required />
              {formErrors.email && <div className="error" style={{ color: 'red' }}>{formErrors.email}</div>}
            </div>
            <div className='mb-3'>
              <label htmlFor='companyName' className='form-label font-light'>
                Company Name
              </label>
              <Input type='text' className='form-control otp-phone' id='companyName' placeholder='Company Name' onChange={(e) => setCompanyName(e.target.value)} required />
              {formErrors.company && <div className="error" style={{ color: 'red' }}>{formErrors.company}</div>}
            </div>
            <div className='mb-3'>
              <label htmlFor='companyLogo' className='form-label font-light'>
                Company Logo
              </label>
              <Input type='text' className='form-control otp-phone' id='companyLogo' placeholder='Company Logo' onChange={(e) => setimageurl(e.target.value)} required />
              {formErrors.imageUrl && <div className="error" style={{ color: 'red' }}>{formErrors.imageUrl}</div>}
            </div>
            <div>
              <label htmlFor='region' className='form-label font-light'>
                Region
              </label>
              <Input type='text' className='form-control otp-phone' id='region' placeholder='Gurgaon' onChange={(e) => setcity(e.target.value)} required />
              {formErrors.city && <div className="error" style={{ color: 'red' }}>{formErrors.city}</div>}
            </div>
            <div>
              <label htmlFor='address' className='form-label font-light'>
                Address
              </label>
              <Input type='text' className='form-control otp-phone' id='address' placeholder='Gurgaon' onChange={(e) => setAddress(e.target.value)} required />
              {formErrors.address && <div className="error" style={{ color: 'red' }}>{formErrors.address}</div>}
            </div>
            <div>
              <label htmlFor='country' className='form-label font-light'>
                Type
              </label>
              <Input type='text' className='form-control otp-phone' id='country' placeholder='India' onChange={(e) => setType(e.target.value)} required />
              {formErrors.type && <div className="error" style={{ color: 'red' }}>{formErrors.type}</div>}
            </div>

            <div>
              <label htmlFor='postalCode' className='form-label font-light'>
                Description
              </label>
              <Input type='text' className='form-control otp-phone' id='postalCode' placeholder='Description' onChange={(e) => setDescription(e.target.value)} required />
              {formErrors.description && <div className="error" style={{ color: 'red' }}>{formErrors.description}</div>}
            </div>
            <div className='row'>
              <div className='col-6'>
                <button type="button" className="btn registerSI-btn mt-2" onClick={handleSubmit}>Save</button>
              </div>
              <div className='col-6'>
                <button type="button" className="btn registerSI-btn mt-2" onClick={toggle}>Close</button>
              </div>
            </div>
          </Form>
        </ModalBody>
      </Modal>
    </>
  )
}

export default UpdateSIModal
