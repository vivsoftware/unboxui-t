import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Form, Input, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { useRouter } from 'next/router';
import { fetchAPI } from '../../../Utils/api';
import { auth } from '../../../Config/firebase';
import spring_boot_url from '../../../Utils/Utils/springApi';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

const EnquireProductModal = () => {
  const [enqProduct, setenqProduct] = useState(null);

  useEffect(() => {
    id && fetchAPI(`/products/${id}`, {
      populate: '*',
    }).then((res) => {
      setenqProduct(res.data);

    });
  }, []);


  const [userDe, setUserDe] = useState(null);
  const [user, setuser] = useState(null)
  const [name, setname] = useState(null);
  const [phone, setphone] = useState(null)
  const [email, setemail] = useState(null)

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      setuser(user)
      if (user.email) {
        axios.get(`${spring_boot_url}api/users/email?email=${user.email}`)
          .then(resp => {
            console.log(resp.data.json);
            localStorage.setItem("data", JSON.stringify(resp.data));
            setUserDe(resp.data);
            setname(resp.data.firstName);
          });
      } else if (user.phoneNumber) {
        let phoneNumberd = user.phoneNumber
        phoneNumberd = phoneNumberd.replace(/\+/g, "");
        console.log("phonenumbereeeee", phoneNumberd);
        axios.get(`${spring_boot_url}api/users/phone?phoneNumber=${phoneNumberd}`)
          .then(resp => {
            console.log(resp.data.json);
            localStorage.setItem("data", JSON.stringify(resp.data));
            setUserDe(resp.data);
          });
      }
    })
  }, [])

  const router = useRouter();
  const { id } = router.query;
  const { enquireModal } = useSelector((state) => state.ModalReducer);
  const dispatch = useDispatch();
  const toggle = () => {
    dispatch({ type: 'ENQUIREMODAL' });
  };

  const [formErrors, setFormErrors] = useState({
    Name: '',
    phone: '',
    email: '',
  });

  const validateForm = () => {
    let isValid = true;
    const errors = {
      Name: '',
      email: '',
      phone: '',
    };

    if (!formErrors.Name) {
      isValid = false;
      errors.Name = 'Name is required.';
    }

    if (!formErrors.phone) {
      isValid = false;
      errors.phone = 'Phone is required.';
    }

    if (!formErrors.email) {
      isValid = false;
      errors.email = 'Email is required.';
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = (e) => {
    toast(` Please Wait.. `, {
      position: toast.POSITION.BOTTOM_CENTER,
    });
    e.preventDefault();
    const userDetails = {
      products: [
        {
          productName: enqProduct?.attributes.product_name,
          productId: "25",
          // id: id,
          // productPrice:enqProduct?.attributes.product_price
        }
      ],
      name: `${userDe?.firstName} ${userDe?.lastName}`,
      email: userDe?.email,
      phone: `${userDe?.phoneNumber}`,
    };

    const userDetails2 = {
      products: [
        {
          productName: enqProduct?.attributes.product_name,
          productId: "25",
          // productPrice:enqProduct?.attributes.product_price
        }
      ],
      name,
      email,
      phone
    };

    // console.log(userDetails);

    const requestBody = user ? JSON.stringify(userDetails) : JSON.stringify(userDetails2);

    fetch(`${spring_boot_url}api/enquiry/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: requestBody,
      // mode: "no-cors"
    }).then((resp) => {

      if (resp.ok === true) {
        toast.success(` Request Submitted `, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
        toggle(); // Close the modal

      }
    });

    const isValid = validateForm();

    if (isValid) {
      // Handle form submission
    }
  };


  return (
    <>
      <Modal className='add-address-modal' centered={true} id='addAddress' isOpen={enquireModal} toggle={toggle}>
        <ModalHeader toggle={toggle}></ModalHeader>
        <ModalBody>
          <Form>
            <div className='mb-3'>
              <label htmlFor='name' className='form-label font-light'>
                Product Name
              </label>

              <p className='form-control'>{enqProduct?.attributes.product_name}</p>


            </div>
            <div className='mb-3'>
              <label htmlFor='Name' className='form-label font-light'>
                Name
              </label>
              {user ? (
                <p className='form-control'>{userDe?.firstName} {userDe?.lastName}</p>

              ) : (
                // <input type="text" class="form-control  otp-phone" id="exampleInputabout" value={about} onChange={(e) => setabout(e.target.value)} required />
                <Input
                  type='text'
                  className='form-control otp-phone'
                  id='Name'
                  placeholder='Name'
                  value={name}
                  onChange={(e) => setname(e.target.value)}

                />
              )}

            </div>
            <div>
              <label htmlFor='phone' className='form-label font-light'>
                Phone No.
              </label>
              {user ? (
                <p className='form-control'>{userDe?.phoneNumber} </p>

              ) : (

                <Input
                  type='text'
                  className='form-control otp-phone'
                  id='phone'
                  placeholder='1234567890'
                  value={phone}
                  onChange={(e) => setphone(e.target.value)}

                />
              )}

            </div>
            <div>
              <label htmlFor='text' className='form-label font-light mt-2'>
                Email
              </label>
              {user ? (
                <p className='form-control'>{userDe?.email} </p>

              ) : (
                <Input
                  type='text'
                  className='form-control otp-phone'
                  id='email'
                  placeholder='abc@xyz.com'
                  value={email}
                  onChange={(e) => setemail(e.target.value)}

                />

              )}

            </div>
          </Form>
        </ModalBody>
        <ModalFooter className='pt-0 text-center d-block'>
          <button type="button" class="btn login_btn" onClick={handleSubmit}>Submit</button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default EnquireProductModal
