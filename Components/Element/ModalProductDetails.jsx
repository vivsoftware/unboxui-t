import Link from "next/link";
import React from "react";
import { useState, useEffect } from "react";
import { Heart } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container } from "reactstrap";
import {
  Brand,
  Category,
  Color,
  productdetail,
  Size,
  Tags,
  Viewdetails,
} from "../Constant";
import AddtoCartBtn from "./AddtoCartBtn";
import DynamicRating from "./DynamicRating";
import KGForVegetable from "./KGForVegetable";
import VegetableProductDetails from "./VegetableProductDetails";
import Image from "next/image";
import { fetchAPI } from "../../Utils/api";

const ModalProductDetails = ({ data, singleProduct }) => {
  const [payload, setPayload] = useState(null);
  const check = payload ? "pointer" : "not-allowed";
  const [selectedClass, setSelectedClass] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [variations, setVariationData] = useState(null);
  const { symbol, currencyValue } = useSelector(
    (state) => state.CurrencyReducer
  );
  const colorSelected = (val) => {
    setSelectedClass(val);
  };
  const dispatch = useDispatch();
  const [sizes, setSizes] = useState("");
  const [isShown, setIsShown] = useState(false);
  // const handleClick = event => {
  //   setIsShown(true);
  // };
  const handleClick = (el) => {
    payload === el ? setPayload(null) : setPayload(el);
  };
  useEffect(() => {
    if (data.attributes.product_type === 'simple'){
      setPayload(data);
    } else { data && fetchAPI(`/getVariation/${data.id}`).then((res) => {
        // console.log(res);
        setVariationData(res.data);
      })
    }
  }, []);
  // console.log(payload);
  return (
    <Col lg="6">
      <div className="product-right">
        <h2 className="mb-2">{data?.attributes?.product_name}</h2>
        {data?.quantity_1 ? (
          <KGForVegetable />
        ) : (
          <div className="price mt-3">
            <h3>
              {symbol}
              {(data?.attributes?.product_price * currencyValue).toFixed(2)}
            </h3>
          </div>
        )}
        {/* {data?.colors?.length > 0 && (
          <div className="color-types">
            <h4>{Color}</h4>
            <ul className="color-variant mb-0">
              {data?.colors?.map((colorstyle, i) => {
                return (
                  <li
                    style={{ backgroundColor: colorstyle }}
                    className={selectedClass === i ? "selected" : ""}
                    key={i}
                    onClick={() => colorSelected(i)}
                  ></li>
                );
              })}
            </ul>
          </div>
        )} */}
        {/* {data?.size !== "none" && (
          <div className="size-detail">
            <h6 className="product-title size-text">
              {variations?.length && "Select Variant"}
            </h6>
            {/* <h4>Select Variant</h4> */}
            {/* <div className="size-box">
              <ul>
                {variations?.map((el, i) => (
                  <li
                    key={i}
                    onClick={() => handleClick(el)}
                    className={payload === el ? "active" : ""}
                  >
                    <a>{el.attributes.variation_name}</a>
                  </li>
                ))}
              </ul>
            </div> */}
            {/* <ul>
              {data?.sizeoption?.map((productsize, i) => {
                return (
                  <li key={i} className={selectedSize === i ? 'selected' : ''} onClick={() => setSelectedSize(i)}>
                    {productsize}
                  </li>
                );
              })}
            </ul> 
          </div>
        )} */}
        {data?.quantity_1 ? (
          <VegetableProductDetails data={data} />
        ) : (
          <div className=" card product-details">
            <h4>{productdetail}</h4>
            <ul>
              <li>
                <span className="font-light">{Brand} :</span>{" "}
                {data?.attributes.brand?.data?.attributes?.brand_name}
              </li>
              <li>
                <span className="font-light">{Category} :</span>{" "}
                {data?.attributes.category?.data?.attributes?.category_name}
              </li>
              <li>
              <p dangerouslySetInnerHTML={{ __html: data?.attributes?.product_short_description }}></p>
              </li>
            </ul>
          </div>
        )}
        <div className="product-btns">
          <Heart
            className="me-4"
            onClick={() => {
              payload && dispatch({ type: "ADDTOWISHLIST", payload: payload });
            }}
            style={{ cursor: check }}
          />
          <Image
            src="/compare.svg"
            width={25}
            height={25}
            className="me-4"
            onClick={() => {
              payload && dispatch({ type: "CHANGECOMPARE", payload: payload });
            }}
            style={{ cursor: check }}
          />
          <AddtoCartBtn
            customeclass="btn btn-solid-default btn-sm me-4"
            data={payload}
            check={check}
          />
          <Link
            href={`/product/${data?.id}${data?.attributes?.product_name}`}
            className="btn btn-solid-default btn-sm"
          >
            {Viewdetails}
          </Link>
        </div>
      </div>
    </Col>
  );
};
export default ModalProductDetails;
