import { useEffect, useState } from "react";
import { BarChart2, ShoppingBag, ShoppingCart } from "react-feather";
import { Input, Media } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getAPIData } from "../../Utils";
import { CommonPath } from "../../Components/Constant";
import { Btn } from "../../Components/AbstractElements";
import TotalPrice from "./TotalPrice";
import { toast } from "react-toastify";
import { getStrapiMedia } from "../../Utils/media.js";
import Image from "next/image";
import { useRouter } from "next/router";
import { auth } from "../../Config/firebase";
import { BiBarChart } from "react-icons/bi";

const ItemCart = () => {
  const [cartData, setCartData] = useState([]);
  const { compareProducts } = useSelector((state) => state.CompareReducer);
  const router = useRouter();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();
  const { symbol, currencyValue } = useSelector(
    (state) => state.CurrencyReducer
  );
  useEffect(() => {
    setCartData(compareProducts);
  }, [compareProducts]);
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
    dispatch({ type: "QUANTITY", payload: { qty, id, price } });
  };
  const removeProduct = (product) => {
    deleteProduct(`${process.env.API_URL}remove/cart/${product.id}`).then(
      (res) => {
        dispatch({ type: "ADDTOCART", payload: res?.data });
      }
    );
    toast.success("Successfully Remove Product");
  };
  const handleClick = ()=>{
    if (cartData.length < 2) {
      // Show notification for minimum two products required
      toast.error("Add at least two products to compare");
    } else {
      dispatch({
        type: "IS_MODAL_CP",
      });
    }
   
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
  return (
    <>
    
    <li
      className={`onhover-dropdown cart-dropdown${isCartOpen ? " show" : ""}`}
    >
      {/* <Image src="/compare.svg" alt="compare" width={25} height={25} onClick={handleClick} /> */}
      <BiBarChart style={{width:'25px',height:'25px'}} onClick={handleClick}/>
      <span className="label label-theme "style={{color:'#FF8400'}}>
                {cartData?.length}
              </span>
              <div className="d-none d-xl-block d-md-block d-sm-none">
      <div className="onhover-div">
        <div className="cart-menu">
          <ul className="custom-scroll">
            {cartData?.length > 0 ? (
              cartData?.map((item) => {
                // console.log(item);
                return (
                  <li key={item.id}>
                    <Media>
                      <img
                        src={`${getStrapiMedia(
                          item.attributes?.product_display
                            ? item.attributes.product_display
                            : item.product.attributes.product_display
                        )}`}
                        className="img-fluid"
                        alt="custom"
                        key={item.id}
                      />
                      <Media body>
                        <h6>
                          {item.attributes.product_name
                            ? item.attributes.product_name
                            : item.attributes.variation_name}
                        </h6>
                        <div className="qty-with-price ">
                          {user? (
                          <span  style={{color:'#FF8400',textAlign:'center'}}>
                             {symbol}{" "}
                            {formatPrice(
                              (item.attributes?.product_display
                                ? item.attributes.product_price
                                : item.attributes.variation_price) *
                              currencyValue.toFixed(2)
                            )} 
                          </span>):(
                            <span style={{color:"red"}}>Please Login for Price</span>
                          )}
                          
                        </div>
                      </Media>
                      <Btn
                        attrBtn={{
                          type: "button",
                          className: "btn-close d-block d-md-none",
                          onClick: () => removeProduct(item),
                        }}
                      >
                        <i className="fas fa-times"></i>
                      </Btn>
                    </Media>
                  </li>
                );
              })
            ) : (
              <li>
                <h5>Your Compare List is empty</h5>
                <p className="text-center">Add products to Compare</p>
              </li>
            )}
          </ul>
        </div>
        <div className="cart-btn">
          <h6 className="cart-total">
            <span className="font-light">Total:</span> {symbol}{" "}
            {(getTotalPrice() * currencyValue).toFixed(2)}
          </h6>
          
        </div>
      </div>
      </div>
    </li>
    
    </>
  );
};
export default ItemCart;
