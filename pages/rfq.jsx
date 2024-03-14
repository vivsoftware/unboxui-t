import React, { useState, useEffect } from 'react';
import Layout4 from '../Layout/Layout4';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { fetchAPI } from '../Utils/api';
import { getStrapiMedia } from '../Utils/media';
import Image from 'next/image';
import spring_boot_url from '../Utils/springApi';
import axios from 'axios';
import { toast } from 'react-toastify';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import BreadCrumb from '../Components/Element/BreadCrumb';

const rfq = (props) => {

  const [rfqData, setRfqData] = useState(null);
  const [email, setemail] = useState(null);
  const [name, setname] = useState(null);
  const [company, setcompany] = useState(null);
  const [purpose, setpurpose] = useState(null);
  const [description, setdescription] = useState(null);
  const [phoneNumber, setphonenumber] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null)
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [purposeError, setPurposeError] = useState('');
  const [companyError, setCompanyError] = useState('');

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
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
      setPurposeError('Please choose purpose.');
      return;
    }
    toast(`Wait...`, {
      position: toast.POSITION.BOTTOM_CENTER,
    });
    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("email", email);
    formdata.append("company", company);
    formdata.append("phoneNumber", phoneNumber);
    formdata.append("purpose", purpose);
    formdata.append("description", description);
    formdata.append('file', selectedFile);
    try {
      const response = await axios.post(`${spring_boot_url}api/rfq/uploadRfq`, formdata, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('File uploaded successfully:', response.data);
      toast.success(`Thanks for your request we will get back to you `, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };
  const purposeSolution = () => {
    setpurpose('Solution');
  };
  const purposeProduct = () => {
    setpurpose('product');
  };
  const purposeServicer = () => {
    setpurpose('Service');
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
  const [productData, setProductData] = useState([]);
  useEffect(() => {
    setProductData(props.alltopic.data);
  }, []);

  return (
    <>
      <Head>
        <title>RFQ</title>
        <meta name="title" content="RFQ" />
        <meta property="description" content="The Request For Quotation feature is an innovative tool that allows you to get a quotation for your required product or service in just a few minutes." />
        <link rel="canonical" href="https://www.unboxindustry.com/rfq" />
      </Head>

      <Layout4>
        {productData.map((item) => {
          const bannerAttributes = item.attributes.rfq_banner;
          const videoAttributes = item?.attributes.rfq_video;
          return (
            <div key={item.id}>
              <BreadCrumb parent={''} title={''} />
              <h1 className='text-center mt-1 mb-2' style={{ fontSize: '30px' }}>RFQ</h1>
              <div className='container-fluid'>
                <div className='row'>
                  <img src={getStrapiMedia(bannerAttributes)} className='img-fluid' alt='rfq' />
                </div>
                <div className='row mt-3'>
                  <p dangerouslySetInnerHTML={{ __html: item?.attributes.rfq_description }}></p>
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
                <h2 className='mb-3'>Request for Quote</h2>
                <form>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" className='input-field otp-phone' value={name} onChange={(e) => setname(e.target.value)} required
                      onFocus={handleNameFocus} />
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
                    <PhoneInput international defaultCountry='IN' type="tel" class="form-control" id="exampleInputPhone"
                      value={phoneNumber} onChange={(setphonenumber)} required onFocus={handlePhoneFocus} />
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
                    <label>Purpose of RFQ</label>
                    <div className="checkbox-group">
                      <label className="checkbox-container">
                        <input type="checkbox" name="purpose" value="product" onClick={purposeProduct} />
                        <span className="custom-checkbox checkmark me-2 ms-2"></span>
                        Product
                      </label>
                      <label className="checkbox-container">
                        <input type="checkbox" name="purpose" value="solution" onClick={purposeSolution} />
                        <span className="custom-checkbox checkmark me-2 ms-2"></span>
                        Solution
                      </label>
                      <label className="checkbox-container">
                        <input type="checkbox" name="purpose" value="services" onClick={purposeServicer} />
                        <span className="custom-checkbox checkmark me-2 ms-2"></span>
                        Services
                      </label>
                      {purposeError && (
                        <div className="error-message" style={{ color: 'red' }}>
                          {purposeError}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="document">Upload Document</label>
                    <input type="file" id="document" name="document" className='input-field otp-phone' onChange={handleFileChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="projectDescription">Project Description</label>
                    <textarea id="projectDescription" name="projectDescription" rows="4" className='input-field otp-phone'
                      value={description} onChange={(e) => setdescription(e.target.value)} required onFocus={handleDescriptionFocus}>
                      {descriptionError && (
                        <div className="error-message" style={{ color: 'red' }}>
                          {descriptionError}
                        </div>
                      )}
                    </textarea>
                  </div>
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={emailError || phoneError || nameError || companyError || purposeError}
                  >
                    Submit
                  </button>

                </form>
              </div>
            </div>
          );
        })}
      </Layout4>
    </>
  );
};

export async function getServerSideProps(context) {
  const { locale } = context;
  // Fetch data from the API endpoint
  const data = await fetchAPI('/rfqs', {
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
export default rfq;