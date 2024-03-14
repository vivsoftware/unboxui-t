import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Col, Form, Input, InputGroup } from 'reactstrap';
import { getAPIData } from '../../../Utils';
import { Btn } from '../../AbstractElements';
import { CommonPath, EXAMPLECODE, Promocode, Redeem, Yourcart } from '../../Constant';
import TotalPrice from './TotalPrice';
import { getStrapiMedia } from '../../../Utils/Utils/media';
import { useDispatch } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { auth } from '../../../Config/firebase';
import { toast } from 'react-toastify';
import axios from 'axios';
import spring_boot_url from '../../../Utils/springApi';
const SideBarCartBox = () => {
  const numberWithCommas = (x) => {
    return x.toLocaleString("en-IN");
  };
  const formatPrice = (price) => {
    return `${numberWithCommas(price)}`;
  }
  const handleQtyChange = (qty, id, price) => {
    dispatch({ type: 'QUANTITY', payload: { qty, id, price } });
  };
  const { symbol, currencyValue } = useSelector((state) => state.CurrencyReducer)
  const [cartData, setCartData] = useState([]);
  const { product, quantity } = useSelector((state) => state.AddToCartReducer);
  useEffect(() => {
    getAPIData(`${process.env.API_URL}getcart`)
      .then((res) => {
        setCartData(product);
      })
      .catch((error) => console.log('Error', error));
  }, [product]);
  const dispatch = useDispatch();
  const quoteModal = () => {
    dispatch({ type: 'CHECKOUTMODAL' });
  };
  const paymentModal = () => {
    dispatch({ type: 'PAYMENTMODAL' });
  };
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

  const handleAddressSelection = () => {
    toast.success(`Add Your Address `, {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  };
  useEffect(() => {
    if (userDe.id) {
      axios
        .get(`${spring_boot_url}api/address/${userDe.id}`)
        .then((resp1) => {
          setUseraddress(resp1.data);
          if (resp1.data.length > 0) {
            setSelectedAddress(resp1.data[0]); // Set the first address as the default address
          }
        });
    }
  }, [userDe]);
  return (
    <Col lg='4'>
      <div className='your-cart-box'>
        <h3 className='mb-3 d-flex text-capitalize'>
          {Yourcart}
          <span className='badge bg-theme new-badge rounded-pill ms-auto bg-dark'>{cartData?.length}</span>
        </h3>
        <ul className='list-group mb-3'>
          {cartData?.length > 0 ? (
            cartData.map((elem) => {
              return (
                <li className='list-group-item list-group-item-1 lh-condensed' key={elem.id}>
                  <div className='checkout-image'>
                    <img src={`${getStrapiMedia((elem.attributes?.product_display ? elem.attributes.product_display : elem.product.attributes.product_display))}`} className='img-fluid' alt='custom' key={elem.id} />
                  </div>
                  <div>
                    <h6 className='my-0'>{elem.attributes.product_name}  X</h6>
                    <small>{elem.type}</small>
                  </div>
                  {quantity[elem.id]?.qty ? quantity[elem.id]?.qty : 1}
                  <span>
                    {symbol}{formatPrice(quantity[elem.id]?.qty ? (elem.attributes.product_price ? elem.attributes.product_price : elem.attributes.variation_price) * currencyValue * quantity[elem.id]?.qty : (elem.attributes.product_price ? elem.attributes.product_price : elem.attributes.variation_price))}
                  </span>
                </li>
              );
            })
          ) : (
            <li>
              <p>No Data Found</p>
            </li>
          )}
          <li className='list-group-item d-flex justify-content-between lh-condensed active'>
            <div className='text-dark'>
            </div>
          </li>
          <TotalPrice cartData={cartData} />
        </ul>
        {selectedAddress ? (
          <button className='btn quote-btn me-2 ' style={{ padding: '10px' }} onClick={quoteModal}>Get Quotation</button>
        ) : (
          <button className='btn quote-btn me-2' style={{ padding: '10px' }} onClick={handleAddressSelection}>Get Quotation</button>
        )}
        <button className='btn quote-btn' style={{ padding: '10px' }} onClick={paymentModal}>Proceed to Pay</button>
      </div>
    </Col>
  );
};
export default SideBarCartBox;
