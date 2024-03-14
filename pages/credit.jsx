import React, { useState } from 'react'
import Layout4 from '../Layout/Layout4'
import PhoneInput from 'react-phone-number-input'
import Enquire from './layout/Enquire'
import FlowerSubscribe from '../Components/FlowerDemo/FlowerSubscribe'
import { ToastContainer, toast } from "react-toastify";
import spring_boot_url from "../Utils/springApi";
import { getStrapiMedia } from '../Utils/media'
import { fetchAPI } from '../Utils/api'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head'
import BreadCrumb from '../Components/Element/BreadCrumb'
import { Helmet } from 'react-helmet'

const credit = (props) => {

  const [name, setName] = useState("");
  const [email, setemail] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [company, setcompany] = useState("");
  const [description, setdescription] = useState("");
  const [purpose, setpurpose] = useState("");
  const [industry, setindustry] = useState("");
  const [error, seterror] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [companyError, setCompanyError] = useState('');

  const handleClick = (e) => {
    e.preventDefault();
    if (!name) {
      setNameError('Please enter name.');
      return;
    }
    if (!email) {
      setEmailError('Please enter an email address.');
      return;
    }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Invalid email format');
    }
    if (!phoneNumber) {
      setPhoneError('Please enter Phone Number.');
      return;
    }
    if (!company) {
      setCompanyError('Please enter Company Name.');
      return;
    }
    if (!purpose) {
      setDescriptionError('Please write description.');
      return;
    }
    const student = {
      name,
      phoneNumber,
      email,
      company,
      purpose
    };
    fetch(`${spring_boot_url}api/credit/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student),
    })
      .then((resp) => {
        seterror(resp);
        if (resp.ok === true) {
          toast.success(`Thank you for submitting your requirement. We will get back to you soon.`);
          setName("");
          setphoneNumber("");
          setemail("");
          setcompany("");
          setpurpose("");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const handleNameFocus = () => {
    setNameError('');
  };
  const handleEmailFocus = () => {
    setEmailError('');
  };

  const handlePhoneFocus = () => {
    setPhoneError('');
  };
  const handleCompanyFocus = () => {
    setCompanyError('');
  };
  const handleDescriptionFocus = () => {
    setDescriptionError('');
  };



  return (
    <>
      <Helmet>
        <title>Credit</title>
        <meta name="title" content="Credit" />
        <meta name="description" content="If you are looking for a credit we will be happy to help you." />
        <link rel="canonical" href="https://www.unboxindustry.com/credit" />
      </Helmet>

      <Layout4>
        {props.alltopic.data.map((item) => {
          const bannerAttributes = item.attributes.credit_banner;
          const videoAttributes = item?.attributes?.credit_video;
          return (
            <div className='container-fluid' key={item.id}>
              <BreadCrumb parent={''} title={''} />
              <h1 className='text-center mt-1 mb-2' style={{ fontSize: '30px' }}>Credit</h1>
              <img src={getStrapiMedia(bannerAttributes)} className='img-fluid' alt='Credit' />
              <div className='row mt-3'>
                <p dangerouslySetInnerHTML={{ __html: item?.attributes.credit_description }}></p>
              </div>
              {videoAttributes.data?.attributes.name ? (
                <div className='row d-flex justify-content-center align-items-center'>

                  <video
                    src={getStrapiMedia(videoAttributes)}
                    className='img-fluid'
                    controls
                    style={{ width: '800px', height: '800px' }}
                  />
                </div>

              ) : (<p></p>)
              }
              <div className="form-container mt-3 mb-4">
                <h2 className='mb-3'>Get Credit</h2>
                <form>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" className='input-field  otp-phone' value={name}
                      onChange={(e) => setName(e.target.value)} required onFocus={handleNameFocus} />
                    {nameError && (
                      <div className="error-message" style={{ color: 'red' }}>
                        {nameError}
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" className='input-field  otp-phone' value={email}
                      onChange={(e) => setemail(e.target.value)} required onFocus={handleEmailFocus} />
                    {emailError && (
                      <div className="error-message" style={{ color: 'red' }}>
                        {emailError}
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="name">Phone</label>
                    <PhoneInput international defaultCountry='IN' type="tel" className="form-control otp-phone" id="exampleInputPhone"
                      value={phoneNumber} onChange={(setphoneNumber)} required onFocus={handlePhoneFocus} />
                    {phoneError && (
                      <div className="error-message" style={{ color: 'red' }}>
                        {phoneError}
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="company">Company Name</label>
                    <input type="text" id="company" name="company" className='input-field otp-phone' value={company}
                      onChange={(e) => setcompany(e.target.value)} required onFocus={handleCompanyFocus} />
                    {companyError && (
                      <div className="error-message" style={{ color: 'red' }}>
                        {companyError}
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="projectDescription">For what you want to get credit. Describe in detail</label>
                    <textarea id="projectDescription" name="projectDescription" rows="4" className='input-field otp-phone' value={purpose}
                      onChange={(e) => setpurpose(e.target.value)} required onFocus={handleDescriptionFocus}></textarea>
                    {descriptionError && (
                      <div className="error-message" style={{ color: 'red' }}>
                        {descriptionError}
                      </div>
                    )}
                  </div>
                  <button type="submit" onClick={handleClick}>
                    Submit
                  </button>
                </form>
              </div>
            </div>
          );
        })}
        <Enquire />
        <FlowerSubscribe />
      </Layout4>
    </>
  );
};

export async function getServerSideProps(context) {
  const { locale } = context;
  const data = await fetchAPI('/credits', {
    populate: '*',
    pagination: {
      start: 0,
      limit: -1,
    },
  });
  return {
    props: {
      alltopic: data,
      ...(await serverSideTranslations(locale, ['common'])),
    },

  };

}





export default credit;