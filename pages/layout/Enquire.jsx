import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import spring_boot_url from '../../Utils/springApi';
import PhoneInput from 'react-phone-number-input';
import { RiSecurePaymentFill } from "react-icons/ri";
import { FaHandshake } from "react-icons/fa";
import { MdPersonSearch } from "react-icons/md";

const Enquire = () => {
  const [name, setName] = useState('');
  const [email, setemail] = useState('');
  const [phone, setphone] = useState('');
  const [message, setmessage] = useState('');
  const [error, seterror] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const handleClick = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      const student = { name, phone, email, message };
      fetch(`${spring_boot_url}contactUs/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(student),
      }).then((resp) => {
        seterror(resp);
        if (resp.ok === true) {
          toast.success(`Request Sent! We'll be in touch soon.`);
          // Clear form fields and errors
          setName('');
          setphone('');
          setemail('');
          setmessage('');
          setFormErrors({});
        }
      });
    } else {
      setFormErrors(errors);
    }
  };

  const validateForm = () => {
    const errors = {};

    if (name.trim() === '') {
      errors.name = 'Name is required';
    }

    if (email.trim() === '') {
      errors.email = 'Email is required';
    }

    if (phone.trim() === '') {
      errors.phone = 'Phone is required';
    }

    if (message.trim() === '') {
      errors.message = 'Message is required';
    }

    return errors;
  };

  const handleInputChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: '',
    }));

    // Update the respective state based on the input field
    switch (fieldName) {
      case 'name':
        setName(fieldValue);
        break;
      case 'email':
        setemail(fieldValue);
        break;
      case 'phone':
        setphone(fieldValue);
        break;
      case 'message':
        setmessage(fieldValue);
        break;
      default:
        break;
    }
  };

  return (
    <div className="container enquire-section mb-2" style={{ color: 'black' }}>
      <div className="row" style={{ padding: '10px' }}>
      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12" style={{ backgroundColor: '#FF8400' }}>
          <h3 style={{ fontSize: '30px',color:'white',  marginTop: '50px' }}>
            Unable to find What you're looking for?
            <br />
           {/* <h3 style={{ fontSize: '25px',color:'white'}}> Post your requirement/RFQ</h3> */}
          </h3>
          <br/>
          <p style={{ color:'white' }}>
            We'd love to hear from you! At Unbox Industry, we believe in the power of communication and building strong connections with our valued
            customers. Whether you have a question, need assistance, or simply want to share your thoughts, we're here to listen and provide the support
            you deserve.
          </p>

          <div className="row text-center">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
              <MdPersonSearch style={{ height: '150px', width: '150px',color:'white' }} />
            </div>
          </div>
        </div>
        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 enquire-form" style={{}}>
          <form style={{ padding: '10px' }}>
            <h2 className='mb-3'>Get in Touch!</h2>
            <div className="mb-3 contact-form">
              <label htmlFor="exampleInputName" className="form-label" style={{ color: 'black' }}>
                Name
              </label>
              <input
                type="text"
                className={`form-control ${formErrors.name ? 'is-invalid' : ''}`}
                id="exampleInputName"
                style={{
                  border:'1px solid black',
                  borderRadius:'4px'
                }}
                name="name"
                value={name}
                onChange={handleInputChange}
              />
              {formErrors.name && <div className="invalid-feedback" style={{}}>{formErrors.name}</div>}
              <label htmlFor="exampleInputEmail" className="form-label mt-2" style={{ color: 'black' }}>
                Email
              </label>
              <input
                type="email"
                className={`form-control ${formErrors.email ? 'is-invalid' : ''}`}
                id="exampleInputEmail"
                style={{
                  border:'1px solid black',
                  borderRadius:'4px'
                }}
                name="email"
                value={email}
                onChange={handleInputChange}
              />
              {formErrors.email && <div className="invalid-feedback" style={{}}>{formErrors.email}</div>}
              <label htmlFor="exampleInputPhone" className="form-label mt-2" style={{ color: 'black' }}>
                Phone
              </label>
              <input
                type="text"
                className={`form-control enquire-input ${formErrors.phone ? 'is-invalid' : ''}`}
                id="exampleInputPhone"
                style={{
                  border:'1px solid black',
                  borderRadius:'4px'
                }}
                name="phone"
                value={phone}
                onChange={handleInputChange}
              />
              {formErrors.phone && <div className="invalid-feedback" style={{}}>{formErrors.phone}</div>}
              <label htmlFor="exampleInputMessage" className="form-label mt-2" style={{ color: 'black' }}>
                Your Requirement
              </label>
              <textarea
                type="text"
                className={`form-control ${formErrors.message ? 'is-invalid' : ''}`}
                id="exampleInputMessage"
                style={{
                  border:'1px solid black',
                  borderRadius:'4px'
                }}
                name="message"
                value={message}
                onChange={handleInputChange}
              />
              {formErrors.message && <div className="invalid-feedback" style={{}}>{formErrors.message}</div>}
            </div>
            <button
              type="submit"
              className="btn submit-contact mt-3"
              style={{ width: '100px' }}
              onClick={handleClick}
            >
              SUBMIT
            </button>
          </form>
        </div>
       
      </div>
    </div>
  );
};

export default Enquire;
