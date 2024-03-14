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

const consultant = (props) => {

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
  const [typeError, setTypeError] = useState('');
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
    if (!description) {
      setDescriptionError('Please write description.');
      return;
    }
    if (!purpose) {
      setTypeError('Please choose type.');
      return;
    }
    const student = {
      name,
      phoneNumber,
      email,
      company,
      description,
      purpose,
    };
    fetch(`${spring_boot_url}api/consultant/submit`, {
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
          setdescription("");
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
  const handleTypeFocus = () => {
    setTypeError('');
  };
  const handleDescriptionFocus = () => {
    setDescriptionError('');
  };
  return (
    <>
      <Head>
        <title>Consultant</title>
        <meta name="title" content="Consultant" />
        <meta property="description" content="Searching for the ideal consultant for your automation project doesn't have to be a challenge anymore." />
        <link rel="canonical" href="https://www.unboxindustry.com/consultant" />
      </Head>
      <Layout4>
        {props.alltopic.data.map((item) => {
          const bannerAttributes = item.attributes.consultant_banner;
          const videoAttributes = item?.attributes?.consultant_video;

          return (
            <div className='container-fluid' key={item.id}>
              <BreadCrumb parent={''} title={''} />
              <h1 className='text-center mt-1 mb-2' style={{ fontSize: '30px' }}>Consultant</h1>
              <img src={getStrapiMedia(bannerAttributes)} className='img-fluid' />
              <div className='container-fluid'>
                <div className='row mt-3'>
                  <p dangerouslySetInnerHTML={{ __html: item?.attributes.consultant_description }}></p>
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
              </div>
              <div className="form-container mt-3 mb-4">
                <h2 className='mb-3'>Get Consultant</h2>
                <form>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" className='input-field otp-phone' value={name}
                      onChange={(e) => setName(e.target.value)} required onFocus={handleNameFocus} />
                    {nameError && (
                      <div className="error-message" style={{ color: 'red' }}>
                        {nameError}
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" className='input-field otp-phone' value={email}
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
                    <label htmlFor="integrator">Consultant Type</label>
                    <select id="integrator" name="integrator" className="select-field" value={purpose}
                      onChange={(e) => setpurpose(e.target.value)} required onFocus={handleTypeFocus}>
                      <option value="Select">Select your consultant type</option>
                      <option value="RFQ Consultation">RFQ Consultation</option>
                      <option value="Project Consultation">Project Consultation</option>
                      <option value="Product Selection Consultation">Product Selection Consultation</option>
                      <option value="Programming Consultation">Programming Consultation</option>
                      <option value="Quotation Analysis Consultation">Quotation Analysis Consultation</option>
                      <option value="Product Analysis Consultation">Product Analysis Consultation</option>
                      <option value="Designing Consultation">Designing Consultation</option>
                      <option value="Other">Other</option>
                    </select>
                    {typeError && (
                      <div className="error-message" style={{ color: 'red' }}>
                        {typeError}
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="projectDescription">Describe your Requirement</label>
                    <textarea id="projectDescription" name="projectDescription" rows="4" className='input-field otp-phone' value={description}
                      onChange={(e) => setdescription(e.target.value)} required onFocus={handleDescriptionFocus}></textarea>
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
  const data = await fetchAPI('/consultants', {
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

export default consultant