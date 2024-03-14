import React, {useState,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Btn } from '../../AbstractElements';
import { Close, FullAddress, Fullname, Mobile } from '../../Constant';
import { toast } from 'react-toastify';
import { getAPIData } from '../../../Utils';
import { auth } from '../../../Config/firebase';
import axios from 'axios';
import spring_boot_url from '../../../Utils/springApi';

const PaymentModal = (selectedAddress) => {
  const { paymentModal } = useSelector((state) => state.ModalReducer);
  const dispatch = useDispatch();
  const toggle = () => {
    dispatch({ type: 'PAYMENTMODAL' });
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
  const [showAccountDetails, setShowAccountDetails] = useState(false);

  const handleNEFTRTGSClick = () => {
    setShowAccountDetails(!showAccountDetails);
  };
  // const handlePayButtonClick = () => {
  //   toast.success("Please check E-mail for further details.")
  // };

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
        .post(`${spring_boot_url}api/payment/send`, productDetailsCart, {
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
    <>
    <Modal className='add-address-modal' centered={true} id='addAddress' isOpen={paymentModal} toggle={toggle}>
      <ModalHeader toggle={toggle}></ModalHeader>
      <ModalBody>
      <div className='row  payment' >
        <button className='btn payment-btn'style={{backgroundColor:'#FF8400',border:'none'}} onClick={handleNEFTRTGSClick} >NEFT/RTGS</button>
        </div>
        {showAccountDetails && (
            <div className="row mt-2 payment">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title fw-bold">Account Details</h5>
                  <p className="card-text">Account Number: 50200035717045</p>
                  <p className="card-text">IFSC Code: HDFC0000485</p>
                  <p className="card-text">Bank Name: HDFC Bank Ltd.</p>
                  <p className="card-text">Branch: Udyog Vihar, Phase 5, Gurgaon, 122001, Haryana</p>
                  <button className="btn payment-btn" style={{width:'100px',border:'none'}} onClick={getdata}>
                    Pay
                  </button>
                </div>
              </div>
            </div>
          )}
        <div className='row mt-2 payment' >
        <button className='btn disable-btn' style={{backgroundColor:'darkgray',border:'none'}}>NET BANKING(Upcoming Feature)</button>
        </div>
        <div className='row mt-2 payment' >
        <button className='btn disable-btn' style={{backgroundColor:'darkgray',border:'none'}}>DEBIT CARD(Upcoming Feature)</button>
        </div>
        <div className='row mt-2 payment' >
        <button className='btn disable-btn'style={{backgroundColor:'darkgray',border:'none'}}>CREDIT CARD(Upcoming Feature)</button>
        </div> 
        <div className='row mt-2 payment' >
        <button className='btn disable-btn'style={{backgroundColor:'darkgray',border:'none'}}>BUY ON EMI(Upcoming Feature)</button>
        </div>
        <div className='row mt-2 payment' >
        <button className='btn disable-btn'style={{backgroundColor:'darkgray',border:'none'}}>BUY NOW PAY LATER(Upcoming Feature)</button>
        </div>
        
      </ModalBody>
    </Modal>
    </>
  );
};

export default PaymentModal;
