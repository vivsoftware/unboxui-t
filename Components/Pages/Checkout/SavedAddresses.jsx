import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Col, Row } from 'reactstrap';
import { CheckoutData } from '../../../Data/CheckoutData';
import { Btn } from '../../AbstractElements';
import CheckoutModal from './CheckoutModal';
import SaveAddressModal from '../UserDashboard/SaveAddressModal';
import PaymentModal from './PaymentModal';
import spring_boot_url from '../../../Utils/springApi';
import axios from 'axios';
import { auth } from '../../../Config/firebase';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Img from '../../Element/Images';
import NEFTModal from './NEFTModal';

const SavedAddresses = () => {
  const checkoutFilter = CheckoutData.filter((el) => el.type === 'Saved Address');
  const dispatch = useDispatch();
  const handleModal = () => {
    dispatch({ type: 'SAVEADDRESSMODAL' });
  };
  const quoteModal = () => {
    dispatch({ type: 'CHECKOUTMODAL' });
  };
  const paymentModal = () => {
    dispatch({ type: 'PAYMENTMODAL' });
  };
  const [isDivOpen, setIsDivOpen] = useState(false);
  const handleButtonClick = () => {
    setIsDivOpen(!isDivOpen);
  };

  const [name, setName] = useState("");
  const [companyName, setcompanyName] = useState("");
  const [city, setcity] = useState("");
  const [state, setstate] = useState("");
  const [country, setcountry] = useState("");
  const [street, setstreet] = useState("");
  const [postalCode, setpostalCode] = useState("");
  const [userId, setUserId] = useState("");
  const [userDe, setUserDe] = useState("");
  const [user, setUser] = useState(null)
  const [useraddress, setUseraddress] = useState("");
  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
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
        axios.get(`${spring_boot_url}api/users/phone?phoneNumber=${phoneNumberd}`)
          .then(resp => {
            console.log(resp.data.json);
            localStorage.setItem("data", JSON.stringify(resp.data));
            setUserDe(resp.data);
          });
      };
    })
  }, []);
  const handleAddressSelection = (address) => {
    setSelectedAddress(address);
  };

  useEffect(() => {
    if (userDe.id) {
      axios
        .get(`${spring_boot_url}api/address/${userDe.id}`)
        .then((resp1) => {
          setUseraddress(resp1.data);
          if (resp1.data.length > 0) {
            setSelectedAddress(resp1.data[0]);
          }
        });
    }
  }, [userDe]);
  const router = useRouter();

  return (
    <Fragment>
      <div className="box-head">
        <Btn
          attrBtn={{ className: "btn-solid-default btn-sm fw-bold ms-auto", onClick: () => handleModal(), }}>
          <i className="fas fa-plus me-1"></i>
          Add new Address
        </Btn>
      </div>
      {checkoutFilter.map((item, i) => {
        return (
          <Fragment key={i}>
            <div className='box-head'>
              <h3>{item.head1}</h3>
            </div>
            <div className="save-details-box">
              <Row className="g-3">
                {Array.isArray(useraddress) && useraddress?.map((item, i) => (
                  <Row className="mt-2">
                    <Col xl='1' md='1' xs='2'>
                      <div>
                        <input
                          type="radio"
                          name="addressSelection"
                          checked={selectedAddress === item}
                          onChange={() => handleAddressSelection(item)}
                        />
                      </div>
                    </Col>
                    <Col xl="11" md="11" xs='10' key={i}>
                      <div className={` ${selectedAddress === item ? 'selected' : ''}`}>
                        <div className="save-name">
                          <h5> {item.name}</h5>
                          <h5 className='mt-2'> {item.companyName}</h5>
                        </div>
                        <div className='save-address'>
                          <p className='font-light'>{item.street},{item.city},{item.state}</p>
                          <p className='font-light'>{item.country}-{item.postalCode}</p>
                        </div>
                        <div className='mobile'>
                          <p className='font-light mobile'>{item.phoneNumber}</p>
                          <p className='font-light mobile' style={{ marginTop: '0px' }}>{item.email}</p>
                        </div>
                      </div>
                    </Col>
                  </Row>
                ))}
              </Row>
            </div>
          </Fragment>
        );
      })}
      <PaymentModal selectedAddress={selectedAddress} />
      <CheckoutModal selectedAddress={selectedAddress} />
      <SaveAddressModal />
    </Fragment>
  );
};

export default SavedAddresses;
