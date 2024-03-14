import React, { useState } from "react";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import { Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import { useRef } from "react";
import { useEffect } from "react";
import { CommonPath } from "../Constant";
import {
  ProductNavModalSlider,
  ProductPosterModalSlider,
} from "../../Data/SliderSettingsData";
import Img from "./Images";
import ModalProductDetails from "./ModalProductDetails";
import { getStrapiMedia } from "../../Utils/media";

const CommonModel = () => {
  const dispatch = useDispatch();
  const toggle = () => {
    dispatch({
      type: "IS_MODAL",
    });
  };
  const { modal, data } = useSelector((state) => state.ModalReducer);
  const [state, setState] = useState({ nav1: null, nav2: null });
  const slider1 = useRef();
  const slider2 = useRef();
  const { nav1, nav2 } = state;
  useEffect(() => {
    setState({
      nav1: slider1.current,
      nav2: slider2.current,
    });
  }, []);
  // console.log(data);

  const imgArr = data ? getStrapiMedia(data?.attributes.product_gallery) : [];
  data && imgArr.push(getStrapiMedia(data?.attributes.product_display));
  // console.log(imgArr);

  return (
    <Modal
      size="lg"
      centered={true}
      className="quick-view-modal modal-dialog modal-dialog-scrollable"
      id="quick-view"
      isOpen={modal}
      toggle={toggle}
      style={{ display: `${!modal ? "none" : "block"}` }}
    >
      <ModalHeader toggle={toggle}></ModalHeader>
      <ModalBody>
        <Row className="gy-4">
          <Col lg="6">
            <div className="quick-view-image">
              <div className="quick-view-slider ratio_2">
                <Slider
                  {...ProductPosterModalSlider}
                  asNavFor={nav2}
                  ref={(slider) => (slider1.current = slider)}
                >
                  {imgArr?.map((item, i) => {
                    return (
                      <div key={i} className="bg-size">
                        <Img
                          src={`${item}`}
                          className="img-fluid bg-img"
                          alt="product"
                        />
                      </div>
                    );
                  })}
                </Slider>
              </div>
              {/* <div className='quick-nav'>
                <Slider {...ProductNavModalSlider} slidesToShow={data?.images?.length} asNavFor={nav1} ref={(slider) => (slider2.current = slider)}>
                  {imgArr?.map((item, i) => {
                    return (
                      <div key={i}>
                        <Img src={`${item}`} className='img-fluid' alt='product' />
                      </div>
                    );
                  })}
                </Slider>
              </div> */}
            </div>
          </Col>
          <ModalProductDetails data={data} />
        </Row>
      </ModalBody>
    </Modal>
  );
};
export default CommonModel;
