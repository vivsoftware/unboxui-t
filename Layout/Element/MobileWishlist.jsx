import { useEffect, useState } from 'react';
import { ShoppingBag, ShoppingCart, Heart } from 'react-feather';
import { Input, Media } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, getAPIData } from '../../Utils';
import { CommonPath } from '../../Components/Constant';
import { Btn } from '../../Components/AbstractElements';
import TotalPrice from './TotalPrice';
import { toast } from 'react-toastify';
import { getStrapiMedia } from '../../Utils/media';
import { useRouter } from 'next/router';
import { auth } from '../../Config/firebase';

const MobileWishList = ({icon}) => {
  const router = useRouter();
  const [cartData, setCartData] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { wishlist } = useSelector((state) => state.AddToCartReducer);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const { symbol, currencyValue } = useSelector((state) => state.CurrencyReducer);
  useEffect(() => {
        setCartData(wishlist);
  }, [wishlist]);
  const getTotalPrice = () => {
    var addPrice = 0;
    return addPrice;
  };
  const isOpen = () => {
    setIsCartOpen(!isCartOpen);
  };
  const removeProduct = (product) => {
    deleteProduct(`${process.env.API_URL}remove/cart/${product.id}`).then((res) => {
      dispatch({ type: 'ADDTOCART', payload: res?.data });
    });
    toast.success('Successfully Remove Product');
  };
  useEffect(() => {

    auth.onAuthStateChanged((user) => {
      setUser(user);
    });

  }, []);
  const numberWithCommas = (x) => {
    return x.toLocaleString("en-IN");
  };
  const formatPrice = (price) => {
    return `${numberWithCommas(price)}`;
  }
  const [activeIcon, setActiveIcon] = useState(null);

  const handleClick = (icon) => {
   
    setActiveIcon(icon);
  };
  return (
    <>
  
    
      <div className='cart-media'>
        <div className='cart-icon' style={{color:'#FF8400'}}>{icon ? <Settings /> : <Heart  
        style={{ color:  '#FF8400' }}
              onClick={() => handleClick('wishlist')}
              />}
              <span className='label label-theme ' style={{position:'relative',top:'-36px',left:'12px',color:'#000'}}>{cartData?.length}</span></div>
      </div>
      <div className='onhover-div'>
        <div className='cart-menu'>
          <ul className='custom-scroll'>
            {cartData?.length > 0 ? (
              cartData?.map((item) => {
                return (
                  <li key={item.id}>
                    <Media>
                      
                       <img src={`${getStrapiMedia((item.attributes?.product_display ? item.attributes.product_display: item.attributes.variation_display))}`} className='img-fluid' alt='custom' key={item.id} />
                      
                      <Media body>
                        <h6>{(item.attributes.product_name ? item.attributes.product_name : item.attributes.variation_name)}</h6>
                        <div className='qty-with-price ms-5'>
                        {user ? (
                          <span> {symbol} {formatPrice((item.attributes?.product_display ? item.attributes.product_price: item.attributes.variation_price) * currencyValue.toFixed(2))} </span>
                        ):(
                          <span style={{color:'red'}}>Please Login for Price</span>
                        )}
                          
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
                <h5>Your wishlist is empty</h5>
                <p className='text-center'>Add products to wishlist</p>
              </li>
            )}
          </ul>
        </div>
        <div className="cart-btn">
        <Btn
        attrBtn={{
          type: "button",
          className: "btn-solid-default btn-block",
          onClick: () => router.push("/page/wishlist"),
        }}
      >
        Proceed To Wishlist
      </Btn>
      </div>
        {/* <TotalPrice getTotalPrice={getTotalPrice} /> */}
      </div>
    
    </>
  );
};
export default MobileWishList;


