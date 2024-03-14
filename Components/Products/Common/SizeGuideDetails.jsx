import React, { useState, useEffect } from 'react';
import { SizeColumn, SizeData } from '../../../Data/SizeGuideData';
import DataTables from '../../Element/DataTable';
import { BsFillFileEarmarkPdfFill } from "react-icons/bs";
import { getStrapiMedia } from '../../../Utils/media';
import Link from 'next/link';
import { useDispatch } from "react-redux";
import { auth } from '../../../Config/firebase';
import spring_boot_url from '../../../Utils/springApi';
import axios from 'axios';
import { singular } from 'i/lib/inflections';
import StartModel from '../../../Layout/Element/StartModel';
import Router from 'next/router';
import { useRouter } from 'next/router';

const SizeGuideDetails = ({ singleProduct }) => {
  const [user, setUser] = useState(null);
  const [userDe, setUserDe] = useState(null);

  const mediaUrl = singleProduct.attributes.product_downloads.data && getStrapiMedia(singleProduct.attributes.product_downloads);
  const dispatch = useDispatch();
  const handleModal = () => {
    dispatch({ type: 'STARTMODAL' });
  };

  // ... other code ...
  const router = useRouter();

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      setUser(user);

      if (user && user.email) {
        try {
          const response = await axios.get(`${spring_boot_url}api/users/email?email=${user.email}`);
          console.log(response.data.json);
          setUserDe(response.data);
          // startTimer(); // If you have defined startTimer function, uncomment this line
        } catch (error) {
          console.error(error);
        }
      } else if (user && user.phoneNumber) {
        let phoneNumberd = user.phoneNumber;
        phoneNumberd = phoneNumberd.replace(/\+/g, '');
        console.log('phonenumbereeeee', phoneNumberd);
        axios.get(`${spring_boot_url}api/users/phone?phoneNumber=${phoneNumberd}`)
          .then(resp => {
            console.log(resp.data.json);
            localStorage.setItem('data', JSON.stringify(resp.data));
            setUserDe(resp.data);
            // startTimer(); // If you have defined startTimer function, uncomment this line

            if (resp.data) {
            }
          });

      }
    });
  }, []);
  const handleOpenLinkInNewPage = () => {
    window.open(mediaUrl, '_blank');
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const userDetails = {
      products: [
        {
          productName: singleProduct?.attributes.product_name,
          productId: "25"
        }
      ],
      name: userDe?.firstName,
      phone: userDe?.phoneNumber,
      email: userDe?.email,

    };

    fetch(`${spring_boot_url}api/downloadpdf/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userDetails),
    })
      .then((resp) => {
        if (resp.ok === true) {
          handleOpenLinkInNewPage();

        }

      })
      .catch((error) => {
        console.error("Error during login:", error);
      });
  }

  return (
    <>
      <h3 className='mt-3 mb-3'>Download Files</h3>
      {userDe != null? (
        <div className='row'>
          {mediaUrl ? mediaUrl.map((item) => (
            <div className='col-md-4 col-sm-12' key={item}>
              <Link href={`${item}`} target='_blank' onClick={handleSubmit}>
                <div className='download-card'>
                  <p>
                    <BsFillFileEarmarkPdfFill className='me-2' style={{ width: '20px', height: '20px' }} />
                    {singleProduct?.attributes?.product_downloads?.data[0].attributes.name}
                  </p>
                </div>
              </Link>
            </div>
          )) : <p>No Files are Available Now.</p>}
        </div>
      ) : (
        <div className='row'>
          {mediaUrl ? mediaUrl.map((item) => (
            <div className='col-md-4 col-sm-12' key={item}>
              <div className='download-card' onClick={handleModal} >
                <p>
                  <BsFillFileEarmarkPdfFill className='me-2' style={{ width: '20px', height: '20px' }} />
                  {singleProduct?.attributes?.product_downloads?.data[0].attributes.name}
                </p>
              </div>
            </div>
          )) : <p>No Files are Available Now.</p>}
        </div>
      )}
    </>
  );
};
export default SizeGuideDetails;
