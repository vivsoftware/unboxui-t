import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Btn } from '../../AbstractElements';
import { Close, FullAddress, Fullname, Mobile } from '../../Constant';
import spring_boot_url from '../../../Utils/springApi';
import axios from 'axios';
import { auth } from '../../../Config/firebase';
import { toast } from 'react-toastify';
import { getAPIData } from '../../../Utils';

const CheckoutModal = (selectedAddress) => {
  const { checkoutModal } = useSelector((state) => state.ModalReducer);
  const dispatch = useDispatch();
  const toggle = () => {
    dispatch({ type: 'CHECKOUTMODAL' });
  };
  const { product, quantity } = useSelector((state) => state.AddToCartReducer);
  const { symbol, currencyValue } = useSelector((state) => state.CurrencyReducer);
  const [cartData, setCartData] = useState([]);
  const [userDe, setuserDe] = useState([]);
  const [userDetails, setuserDetails] = useState([]);
  const [userAdressid, setuserAdressid] = useState([]);
  const [phoneNumber, setphoneNumber] = useState([]);
  const [user, setuser] = useState(null)
  const handleQtyChange = (qty, id, price) => {
    dispatch({ type: 'QUANTITY', payload: { qty, id, price } });
  };

  useEffect(() => {
    setCartData(product);
    getAPIData(`${process.env.API_URL}getcart`)
      .then((res) => {
        return;
      })
      .catch((error) => console.log('Error', error));
  }, [product]);







  const [total, setTotal] = useState(0);
  const [TotalMrp, setTotalMrp] = useState(0);
  const formatPrice = (price) => {
    return `${numberWithCommas(price)}`;
  };
  
  useEffect(() => {
    Object.keys(quantity).forEach((item) => {
      setTotal((prev) => prev + quantity[item]?.qty * quantity[item]?.attributes?.product_price);
    });
  }, []);
  
  const getTotalPrice = () => {
    var addPrice = 0;
    const filterPrice =
      cartData &&
      cartData.map((el) => {
        return el.attributes?.product_price;
      });
    filterPrice?.map((elem) => (addPrice += elem || 0));
    return addPrice;
  };


  useEffect(() => {
    setTotalMrp(() => {
      let total = 0;
      cartData?.map((elem) => {
        total += (elem?.attributes?.product_price ? elem.attributes.product_price : elem.attributes?.variation_price) * (quantity[elem.id]?.qty ? quantity[elem.id]?.qty : 1);
      });
      return total;
    });
  }, [quantity, cartData]);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      setuser(user)
      console.log("user", user)
      if (user.email) {
        axios.get(`${spring_boot_url}api/users/email?email=${user.email}`)
          .then(resp => {
            setuserDetails(resp.data);
          });
      } else if (user.phoneNumber) {
        let phoneNumberd = user.phoneNumber
        phoneNumberd = phoneNumberd.replace(/\+/g, "");
        console.log("phonenumbereeeee", phoneNumberd);
        axios.get(`${spring_boot_url}api/users/phone?phoneNumber=${phoneNumberd}`)
          .then(resp => {
            setuserDetails(resp.data);
          });
      }
    })
  }, [])

  const Downloaddata = () => {
    fetch(`${spring_boot_url}api/quotation/download`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userDe)
    }).then((resp) => {
      setuserDe(resp.body)
      if (resp.ok === true) {
        toast(`Please check your E-mail`);
      }
    });
  }

  const getdata = (e) => {
    e.preventDefault();
    toast.success('Please wait we are sending you an E-mail');

    if (cartData.length > 0) {
      const productDetails = cartData.map((item) => ({
        productId: `2`,
        productName: item.attributes.product_name,
        quantity: quantity[item.id]?.qty ? quantity[item.id]?.qty : 1,
        productPrice: item.attributes.product_price,
      }));
      const productDetailsCart = {
        products: productDetails,
        totalAmount: `${TotalMrp * currencyValue}`,
        addressId: selectedAddress?.selectedAddress?.id,
        userId: userDetails.id
      };
      setuserDe(productDetailsCart);
      axios
        .post(`${spring_boot_url}api/quotation/send`, productDetailsCart, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then((resp) => {
          setuserDe(resp.data);
          if (resp.status === 200) {
            toast.success('Thanks for showing interest. Please check your E-mail');
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }

  }
  return (
    <Modal className='add-address-modal' centered={true} id='addAddress' isOpen={checkoutModal} toggle={toggle}>
      <ModalHeader toggle={toggle}></ModalHeader>
      <ModalBody>
        <div className='row payment'>
          <button className='btn quote-btn' style={{ marginLeft: '45px' }} onClick={getdata}>On mail</button>
        </div>
        <div className='row mt-2 payment'>
          <button className='btn quote-btn' style={{ marginLeft: '45px' }} onClick={Downloaddata}>Download pdf (Upcoming)</button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default CheckoutModal;
