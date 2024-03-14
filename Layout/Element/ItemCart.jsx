import { useEffect, useState } from 'react';
import { ShoppingBag, ShoppingCart } from 'react-feather';
import { Input, Media } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, getAPIData } from '../../Utils';
import { CommonPath } from '../../Components/Constant';
import { Btn } from '../../Components/AbstractElements';
import TotalPrice from './TotalPrice';
import { toast } from 'react-toastify';
import { fetchAPI } from '../../Utils/api';
import { getStrapiMedia } from '../../Utils/media.js'
import Img from '../../Components/Element/Images';
import CartData from '../../Components/Pages/Cart/CartData';
import { Auth } from 'firebase/auth';
import { auth } from '../../Config/firebase';
import Link from 'next/link';
const ItemCart = (singleProduct) => {
  const [user, setUser] = useState(null);

  <CartData singleProduct={singleProduct}></CartData>
  const [cartData, setCartData] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { product, quantity } = useSelector((state) => state.AddToCartReducer);

  const dispatch = useDispatch();
  const { symbol, currencyValue } = useSelector((state) => state.CurrencyReducer);
  useEffect(() => {

    setCartData(product);
    getAPIData(`${process.env.API_URL}getcart`)
      .then((res) => {
        return;
      })
      .catch((error) => console.log('Error', error));
  }, [product]);


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  const getTotalPrice = () => {
    var addPrice = 0;
    const filterPrice =
      cartData &&
      cartData.map((el) => {
        return el.price;
      });
    filterPrice?.map((elem) => (addPrice += elem));
    return addPrice;
  };
  const isOpen = () => {
    setIsCartOpen(!isCartOpen);
  };
  const handleQtyChange = (qty, id, price) => {
    dispatch({ type: 'QUANTITY', payload: { qty, id, price } });
  };
  const removeProduct = (product) => {
    deleteProduct(`${process.env.API_URL}remove/cart/${product.id}`).then((res) => {
      dispatch({ type: 'ADDTOCART', payload: res?.data });
    });
    toast.success('Successfully Remove Product');
  };

  const numberWithCommas = (x) => {
    return x.toLocaleString("en-IN");
  };
  const formatPrice = (price) => {
    return `${numberWithCommas(price)}`;
  }

  return (
    <>
      
        <li className={`onhover-dropdown cart-dropdown${isCartOpen ? ' show' : ''}`}>
          <ShoppingCart />
          <span className='label label-theme '>{cartData?.length}</span>
          <div className='onhover-div'>
            <div className='cart-menu'>

              <ul className='custom-scroll'>
                {cartData?.length > 0 ? (
                  cartData?.map((item) => {
                
                    return (
                      <li key={item.id}>
                        <Media>

                          {/* <a>{el.attributes.variation_name}</a> */}
                          {/* {singleProduct?.data?.map((el, i) => */}
                          <img src={`${getStrapiMedia((item.attributes?.product_display ? item.attributes.product_display : item.product.attributes.product_display))}`} className='img-fluid' alt='custom' key={item.id} />

                          {/* <img src={getStrapiMedia(item.product.attributes.product_display? item.product.attributes.product_display : item.attributes.product_display)} className='img-fluid' /> */}


                          {/* )} */}
                          {/* <img src={getStrapiMedia(item.attributes.variation_display)} className='img-fluid' alt='custom' /> */}
                          <Media body>

                            <h6>{(item.attributes.product_name ? item.attributes.product_name : item.attributes.variation_name)}</h6>
                            <div className='qty-with-price'>
                              {user ? (
                                <h3 className='theme-color'>
                                  {symbol} {formatPrice((item.attributes?.product_display ? item.attributes.product_price : item.attributes.variation_price) * currencyValue.toFixed(2))}
                                </h3>
                              ) : (
                                <Link legacyBehavior href="/login">
                                  <span style={{ color: 'red' }}>Please Login for Price
                                    {/* {symbol} {((item.attributes?.product_display ? item.attributes.product_price : item.attributes.variation_price) * currencyValue).toFixed(2)} */}
                                  </span>
                                </Link>
                              )}



                              <span>
                                <Input type='number' className='form-control' value={quantity[item.id]?.qty ? quantity[item.id]?.qty : 1} min={1} onChange={(e) => handleQtyChange(e.target.value, item.id, item.attributes.product_price)} />
                              </span>
                            </div>
                          </Media>
                          <Btn
                            attrBtn={{
                              type: 'button',
                              className: 'btn-close d-block d-md-none',
                              onClick: () => removeProduct(item),
                            }}>
                            <i className='fas fa-times'></i>
                          </Btn>
                        </Media>
                      </li>
                    );
                  })
                ) : (
                  <li>
                    <img src={`${CommonPath}/cartEmpty.png`} className='img-fluid' alt='cartEmpty' />
                  </li>
                )}
              </ul>
            </div>
            <TotalPrice getTotalPrice={getTotalPrice} />
          </div>
        </li>
     
    </>
  );
};
export default ItemCart;
