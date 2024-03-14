import React, { useState } from 'react';
import Layout4 from '../Layout/Layout4';
import Head from 'next/head';
import BreadCrumb from '../Components/Element/BreadCrumb';
import Link from 'next/link';
import { Card, Row, Col } from 'reactstrap';
import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { BsGeoAltFill } from 'react-icons/bs';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import FlowerSubscribe from '../Components/FlowerDemo/FlowerSubscribe';
import Enquire from './layout/Enquire';
import MapSection from '../Components/Pages/ContactUs/MapSection';
import { ToastContainer, toast } from 'react-toastify';
import spring_boot_url from '../Utils/springApi';
import PhoneInput from 'react-phone-number-input';

const ContactUs = () => {
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
      })
        .then((resp) => {
          seterror(resp);
          if (resp.ok === true) {
            toast.success(`Message Sent! We'll be in touch soon.`);
            setName('');
            setphone('');
            setemail('');
            setmessage('');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
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
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Invalid email format';
    }

    if (phone.trim() === '') {
      errors.phone = 'Phone is required';
    }

    if (message.trim() === '') {
      errors.message = 'Message is required';
    }

    return errors;
  };

  return (
    <div>
      <Layout4>
        <Head>
        <title>Contact Us - Unbox Industry</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="title" content="Contact-Us" />
          <meta name='description' content='Contact Unbox Industry for every type industrial automation equipments. You have a query! We have a solution.'/>
          <meta name='keywords' content='industrial automation solution contact'/>
          <link rel="canonical" href="https://www.unboxindustry.com/contact-us" />
          <link rel="icon" href="/Box.ico"alt="unboxLogo" />
        </Head>
        <BreadCrumb parent={''} title={''} />
        <div className="mt-2 ms-5 mb-5">
       
          <div className="card">
            <Card>
              <Row>
                <Col lg-8 md-6 sm-12 xs-12 className="contact">
                  <h3 className="mb-3">Let’s work together! Fill out this form.</h3>
                  <form>
                    <div className="mb-3 contact-form">
                      <label htmlFor="exampleInputName" className="form-label">
                        Name
                      </label>
                      <input
                        type="text"
                        className={`form-control ${formErrors.name ? 'is-invalid' : ''} otp-phone`}
                        id="exampleInputName"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                      {formErrors.name && <div className="invalid-feedback">{formErrors.name}</div>}
                      <label htmlFor="exampleInputEmail" className="form-label mt-2">
                        Email
                      </label>
                      <input
                        type="email"
                        className={`form-control ${formErrors.email ? 'is-invalid' : ''} otp-phone`}
                        id="exampleInputEmail"
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                        required
                      />
                      {formErrors.email && <div className="invalid-feedback">{formErrors.email}</div>}
                      <label htmlFor="exampleInputPhone" className="form-label mt-2">
                        Phone
                      </label>
                      <PhoneInput
                        defaultCountry="IN"
                        type="text"
                        className={`form-control ${formErrors.phone ? 'is-invalid' : ''} otp-phone`}
                        id="exampleInputPhone"
                        value={phone}
                        onChange={setphone}
                        required
                      />
                      {formErrors.phone && <div className="invalid-feedback">{formErrors.phone}</div>}
                      <label htmlFor="exampleInputMessage" className="form-label mt-2">
                        Message
                      </label>
                      <textarea
                        type="text"
                        className={`form-control ${formErrors.message ? 'is-invalid' : ''} otp-phone`}
                        id="exampleInputMessage"
                        value={message}
                        onChange={(e) => setmessage(e.target.value)}
                        required
                      />
                      {formErrors.message && <div className="invalid-feedback">{formErrors.message}</div>}
                    </div>
                    <button type="submit" className="btn submit-contact" onClick={handleClick}>
                      SUBMIT
                    </button>
                  </form>
                </Col>
                <Col lg-4 md-6 sm-12 xs-12 className=" address">
                <h1 className=' mt-1 mb-5' style={{fontSize:'30px'}}>Contact Us</h1>
                  <h2 style={{fontWeight:'normal'}}>Address</h2>
                  <p className="address-text mt-5">
                    <a href="#">
                      <BsGeoAltFill className="me-2" />
                    </a>
                    619, G.F. Udyog Vihar, Phase 5, Gurgaon, Haryana, 122016.
                  </p>
                  <p className="address-text">
                    <a href="#">
                      <FaPhoneAlt className="me-2" />
                    </a>
                    + 124 414 8999
                  </p>
                  <p className="address-text">
                    <a href="#">
                      <FaPhoneAlt className="me-2" />
                    </a>
                    +91 9999421242
                  </p>
                  <p className="address-text">
                    <a href="#">
                      <FaPhoneAlt className="me-2" />
                    </a>
                    +91 8604386046
                  </p>
                  <p className="address-text">
                    <a href="#">
                      <FaEnvelope className="me-2" />
                    </a>
                    info@unboxindustry.com
                  </p>
                </Col>
              </Row>
            </Card>
            <MapSection />
          </div>
        </div>
        <Enquire />
        <FlowerSubscribe />
      </Layout4>
    </div>
  );
};

export default ContactUs;

