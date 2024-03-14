import React, { Fragment, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { Col, Row } from "reactstrap";
import { UserDashboardData } from "../../../Data/UserDashboardData";
import { Btn } from "../../AbstractElements";
import axios from "axios";
import spring_boot_url from "../../../Utils/springApi";
import { auth } from "../../../Config/firebase";

const SaveAddress = () => {
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

  useEffect(() => {
    if (userDe.id) {
      axios
        .get(`${spring_boot_url}api/address/${userDe.id}`)
        .then((resp1) => {
          setUseraddress(resp1.data);
        });
    }
  }, [userDe]);

  const ProfileFilter = UserDashboardData.filter(
    (el) => el.type === "Saved Address"
  );
  const dispatch = useDispatch();

  const handleModalupdate = () => {
    dispatch({ type: "SAVEUPDATEADDRESSMODAL" });
  };

  const handleModal = () => {
    dispatch({ type: "SAVEADDRESSMODAL" });
  };

  const router = useRouter();

  const handleDelete = (id) => {
    // Make API call to delete the record with the given id
    fetch(`${spring_boot_url}api/address/${id}`, {
      method: 'DELETE',
      // Add headers or authentication if required
    })
      .then((response) => {
        if (response.ok) {
          // If the deletion was successful, update the UI by removing the card
          const updatedUserAddress = useraddress.filter((item) => item.id !== id);
          setUseraddress(updatedUserAddress);
        } else {
          // Handle error case, display error message or perform additional actions
          console.error('Failed to delete the record');
        }
      })
      .catch((error) => {
        console.error('Error occurred while deleting the record', error);
      });
  };

  return (
    <Fragment>
      {ProfileFilter.map((item, i) => {
        return (
          <Fragment key={i}>
            <div className="box-head">
              <h3>{item.head1}</h3>
              <Btn
                attrBtn={{
                  className: "btn-solid-default btn-sm fw-bold ms-auto",
                  onClick: () => handleModal(),
                }}
              >
                <i className="fas fa-plus me-1"></i>
                {item.btn}
              </Btn>
            </div>
            <div className="save-details-box">
              <Row className="g-3">
                {Array.isArray(useraddress) && useraddress?.map((item,i) => (
                  <Col xl="4" md="6" key={i}>
                    <div className="save-details">
                      <div className="save-name">
                        <h5> {item.name}</h5>
                        <h5 className='mt-2'> {item.companyName}</h5>
                      </div>
                      <div className='save-address'>
                        <p className='font-light'>{item.street},{item.city},{item.state}</p>
                        <p className='font-light'>{item.country}-{item.postalCode}</p>
                      </div>
                      <div className='mobile'>
                        <p className='font-light mobile'>+{item.phoneNumber}</p>
                        <p className='font-light mobile' style={{ marginTop: '0px' }}>{item.email}</p>
                      </div>
                      <div className="button">
                        <a href="#javascript" className="btn btn-sm" onClick={() => handleDelete(item.id)}>
                          Remove
                        </a>
                      </div>
                    </div>
                  </Col>
                )
                )
                }
              </Row>
            </div>
          </Fragment>
        );
      })}
    </Fragment>
  );
};

export default SaveAddress;
