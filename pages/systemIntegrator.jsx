import React, { useState } from 'react'
import Layout4 from '../Layout/Layout4'
import PhoneInput from 'react-phone-number-input'
import Enquire from './layout/Enquire'
import FlowerSubscribe from '../Components/FlowerDemo/FlowerSubscribe'
import { ToastContainer, toast } from "react-toastify";
import spring_boot_url from "../Utils/springApi";
import { fetchAPI } from '../Utils/api'
import { getStrapiMedia } from '../Utils/media'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import SkeletonLoader from '../Components/Element/SkeletonLoader'
import Head from 'next/head'
import BreadCrumb from '../Components/Element/BreadCrumb'

const systemIntegrator = (props) => {
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
  const [locationError, setLocationError] = useState('');
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
      setLocationError('Please choose location.');
      return;
    }
    if (!industry) {
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
      industry
    };
    fetch(`${spring_boot_url}api/integrator/submit`, {
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
          setindustry("");
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
  const handleLocationFocus = () => {
    setLocationError('');
  };
  const handleTypeFocus = () => {
    setTypeError('');
  };
  const handleDescriptionFocus = () => {
    setDescriptionError('');
  };

  if (!props.alltopic.data) {
    return (
      <>
        <SkeletonLoader />
      </>
    )
  }

  return (
    <>
      <Head>
        
        <title>System Integrator</title>
        <meta name="title" content="Credit" />
        <meta property="description" content="If you’re searching for a qualified system integrator you might want to consider visiting Unbox Industry." />
        <link rel="canonical" href="https://www.unboxindustry.com/systemIntegrator" />
      </Head>

      <Layout4>
        {props.alltopic.data.map((item) => {
          const bannerAttributes = item.attributes.SI_banner;
          const videoAttributes = item?.attributes?.SI_video;
          return (
            <div className='container-fluid' key={item.id}>
              <BreadCrumb parent={''} title={''} />
              <h1 className='text-center mt-1 mb-2' style={{ fontSize: '30px' }}>System Integrator</h1>
              <img src={getStrapiMedia(bannerAttributes)} className='img-fluid' alt='SI' />
              <div className='row'>
                <div className="row mt-3">

                  <p dangerouslySetInnerHTML={{ __html: item?.attributes.SI_description }}></p>
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
                <h2 className='mb-3'>Find System Integrator</h2>
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
                    <PhoneInput international defaultCountry='IN' type="tel" className="form-control  otp-phone" id="exampleInputPhone"
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
                    <label htmlFor="location">Preferred Location</label>
                    <select id="location" name="location" className="select-field" value={purpose}
                      onChange={(e) => setpurpose(e.target.value)} required onFocus={handleLocationFocus}>
                      <option value="state">Choose your state</option>
                      <option value="Andhra Pradesh">Andhra Pradesh</option>
                      <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                      <option value="Assam">Assam</option>
                      <option value="Bihar">Bihar</option>
                      <option value="Chhattisgarh">Chhattisgarh</option>
                      <option value="Goa">Goa</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="Haryana">Haryana</option>
                      <option value="Himachal Pradesh">Himachal Pradesh</option>
                      <option value="Jharkhand">Jharkhand</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Kerala">Kerala</option>
                      <option value="Madhya Pradesh">Madhya Pradesh</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Manipur">Manipur</option>
                      <option value="Meghalaya">Meghalaya</option>
                      <option value="Mizoram">Mizoram</option>
                      <option value="Nagaland">Nagaland</option>
                      <option value="Odisha">Odisha</option>
                      <option value="Punjab">Punjab</option>
                      <option value="Rajasthan">Rajasthan</option>
                      <option value="Sikkim">Sikkim</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Telangana">Telangana</option>
                      <option value="Tripura">Tripura</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                      <option value="Uttarakhand">Uttarakhand</option>
                      <option value="West Bengal">West Bengal</option>
                    </select>
                    {locationError && (
                      <div className="error-message" style={{ color: 'red' }}>
                        {locationError}
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="integrator">Integrator Type</label>
                    <select id="integrator" name="integrator" className="select-field"
                      value={industry}
                      onChange={(e) => setindustry(e.target.value)} required onFocus={handleTypeFocus}>
                      <option value="type">Select Integrator type</option>
                      <option value="Robotic">Robotic</option>
                      <option value="Line Builder">Line Builder</option>
                      <option value="Machine Vision">Machine Vision</option>
                      <option value="SPM Builder">SPM Builder</option>
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
      </Layout4 >
    </>
  );
};

export async function getServerSideProps(context) {
  const { locale } = context;
  const data = await fetchAPI('/system-integrators', {
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
export default systemIntegrator;
