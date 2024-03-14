import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Form,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { Btn } from "../../AbstractElements";
import "reactjs-popup/dist/index.css";
import Link from "next/link";
import fetch from "node-fetch";
import { useRouter } from "next/router";
import {Close} from "../../Constant";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import spring_boot_url from "../../../Utils/springApi";
import { auth } from "../../../Config/firebase";
const SaveupdateAddressModal = ( ) => {
  const { SaveupdateAddressModal } = useSelector((state) => state.ModalReducer);
  const dispatch = useDispatch();
  const toggleupdate = () => {
    dispatch({ type: "SAVEUPDATEADDRESSMODAL" });
  };
  const [name, setName] = useState("");
  const [companyName, setcompanyName] = useState("");
  const [phoneNumber, setphoneNumber] = useState('')
  const [city, setcity] = useState("");
  const [state, setstate] = useState("");
  const [country, setcountry] = useState("");
  const [email, setemail] = useState('')
  const [street, setstreet] = useState("");
  const [postalCode, setpostalCode] = useState("");
  const router = useRouter();
  const [formErrors, setFormErrors] = useState({
    name: "",
    companyName: "",

    city: "",
    state: "",
    country: "",

    street: "",
    postalCode: "",
  });

  const validateForm = () => {
    let isValid = true;
    const errors = {
      companyName: "",
      phoneNumber: "",
      city: "",
      state: "",
      country: "",
      name: "",
      street: "",
      postalCode: "",
    };
    if (!name) {
      isValid = false;
      errors.name = "Name is required.";
    }

    if (!companyName) {
      isValid = false;
      errors.companyName = "Company name is required.";
    }

    if (!street) {
      isValid = false;
      errors.street = "street is required.";
    }
    if (!city) {
      isValid = false;
      errors.city = "city is required.";
    }
    if (!state) {
      isValid = false;
      errors.state = "state name is required.";
    }
    if (!country) {
      isValid = false;
      errors.country = "Country name is required.";
    }

    if (!postalCode) {
      isValid = false;
      errors.postalCode = "postal code is required.";
    }

    setFormErrors(errors);
    return isValid;
  };

  const [user, setuser] = useState(null)
  const handleClick = (e) => {
    e.preventDefault();
    const student = {
      name,
      companyName,
      street,
      city,
      state,
      country,
      postalCode,
      phoneNumber,
      id,
      email
    }

    console.log(student);
      fetch(`${spring_boot_url}api/address/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
      }).then((resp) => {
      
        const isValid = validateForm();

        if (isValid) {
          toast(`address save... `);
          toggleupdate();
          router.push("/user_dashboard");
        }

      });

  }

  return (
    <Modal
      className="add-address-modal"
      centered={true}
      id="addAddress"
      isOpen={SaveupdateAddressModal}
      toggle={toggleupdate}
    >
      <ModalHeader toggle={toggleupdate}></ModalHeader>
      <ModalBody>
        <Form>
          <div className="mb-3">
            <label htmlFor="Name" className="form-label font-light">
              Name
            </label>
            <Input
              type="text"
              className="form-control"
              id="name"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            {formErrors.name && (
              <div className="error" style={{ color: "red" }}>
                {formErrors.name}
              </div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="Company Name" className="form-label font-light">
              Company Name
            </label>
            <Input
              type="text"
              className="form-control"
              id="companyName"
              placeholder="Company Name"
              value={companyName}
              onChange={(e) => setcompanyName(e.target.value)}
              required
            />
            {formErrors.companyName && (
              <div className="error" style={{ color: "red" }}>
                {formErrors.companyName}
              </div>
            )}
          </div>

          <div>
          <label htmlFor="street" className="form-label font-light">
              Plot No.
            </label>
            <Input
              type="text"
              className="form-control"
              id="street"
              placeholder="A-12"
              value={street}
              onChange={(e) => setstreet(e.target.value)}
              required
            />
            {formErrors.street && (
              <div className="error" style={{ color: "red" }}>
                {formErrors.street}
              </div>
            )}
            
          </div>
          <div>
          <label htmlFor="text" className="form-label font-light">
              City
            </label>
            <Input
              type="text"
              className="form-control"
              id="number"
              placeholder="Gurgaon"
              value={city}
              onChange={(e) => setcity(e.target.value)}
              required
            />
            {formErrors.city && (
              <div className="error" style={{ color: "red" }}>
                {formErrors.city}
              </div>
            )}
          </div>
          <div>
            <label htmlFor="state" className="form-label font-light">
              State
            </label>
            <Input
              type="text"
              className="form-control"
              id="state"
              placeholder="Haryana"
              value={state}
              onChange={(e) => setstate(e.target.value)}
              required
            />
            {formErrors.state && (
              <div className="error" style={{ color: "red" }}>
                {formErrors.state}
              </div>
            )}
          </div>
          <div>
            <label htmlFor="country" className="form-label font-light">
              Country
            </label>
            <Input
              type="text"
              className="form-control"
              id="country"
              placeholder="India"
              value={country}
              onChange={(e) => setcountry(e.target.value)}
              required
            />
            {formErrors.country && (
              <div className="error" style={{ color: "red" }}>
                {formErrors.country}
              </div>
            )}
          </div>

          <div>
            <label htmlFor="postalCode" className="form-label font-light">
              Postal Code
            </label>
            <Input
              type="number"
              className="form-control"
              id="postalCode"
              placeholder="123456"
              value={postalCode}
              onChange={(e) => setpostalCode(e.target.value)}
              required
            />
            {formErrors.postalCode && (
              <div className="error" style={{ color: "red" }}>
                {formErrors.postalCode}
              </div>
            )}
          </div>
        </Form>
      </ModalBody>
      <ModalFooter className="pt-0 text-end d-block">
        <Btn
          attrBtn={{
            className: "text-white rounded-1 modal-close-button",
            onClick: () => toggleupdate(),
          }}
        >
          {Close}
        </Btn>
        <button type="submit" class="btn login_btn" onClick={handleClick}>
          Save
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default SaveupdateAddressModal;
