// import React, { useState } from "react";
// import { Col, Input, InputGroup } from "reactstrap";
// import { Btn } from "../../AbstractElements";
// import { Submit } from "../../Constant";
// import spring_boot_url from "../../../Utils/springApi";
// import { ToastContainer, toast } from "react-toastify";
// import springWithAuth from "../../../Utils/spring_auth";

// const EmailButton = () => {
//   const [email, setemail] = useState("");
//   const [error, seterror] = useState("");
//   const [emailError, setEmailError] = useState('');
//   const handleClick = (e) => {
//     e.preventDefault();
//     if (!email) {
//       setEmailError('Email address is required.');
//     }
//     const mail_user = { email };
//     fetch(`${spring_boot_url}subscription/subscriber`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(mail_user)
//     }).then((resp) => {
//       if (resp.ok === true) {
//         seterror(resp);
//         toast.success(`Thanks for Subscribing.`);
//       }
//     })
//       .catch((error) => {
//         console.error(error);
//       });
//   };
//   const handleEmailChange = (e) => {
//     setemail(e.target.value);
//     setEmailError(''); // Reset the email error message on change
//   };
//   return (
//     <Col lg="4" md="6" className="mt-md-0 mt-3">
//       <div className="subsribe-input">
//         <InputGroup>
//           <Input
//             type="text"
//             className="subscribe-input"
//             placeholder="Your Email Address"
//             value={email}
//             onChange={handleEmailChange}

//           />
          
//           <button
//             type="submit"
//             className="btn subscribe-btn"
//             onClick={handleClick}
//             style={{ left: '-20px' }}
//           >
//             SUBMIT
//           </button>
          
//         </InputGroup>
//         {emailError && <span style={{ color: 'red' }}>{emailError}</span>}
//       </div>
//     </Col>
//   );
// };

// export default EmailButton;

import React, { useState } from "react";
import { Col, Input, InputGroup } from "reactstrap";
import { Btn } from "../../AbstractElements";
import { Submit } from "../../Constant";
import spring_boot_url from "../../../Utils/springApi";
import { ToastContainer, toast } from "react-toastify";
import springWithAuth from "../../../Utils/spring_auth";

const EmailButton = () => {
  const [email, setemail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    if (!email) {
      setEmailError("Email address is required.");
    } else {
      
      const mail_user = { email };
      fetch(`${spring_boot_url}subscription/subscriber`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mail_user),
      })
        .then((resp) => {
          if (resp.ok === true) {
            setemail(""); // Clear the email input after successful submission
            setIsSubmitting(false); // Enable the submit button again
            toast.success(`Thanks for Subscribing.`);
          }
        })
        .catch((error) => {
          console.error(error);
          setIsSubmitting(false); // Enable the submit button again if there's an error
        });
    }
  };

  const handleEmailChange = (e) => {
    setemail(e.target.value);
    setEmailError(""); // Reset the email error message on change
  };

  return (
    <>
    <Col lg="4" md="6" className="mt-md-0 mt-3">
      <div className="subsribe-input">
        <InputGroup>
          <Input
            type="text"
            className="subscribe-input"
            placeholder="Your Email Address"
            value={email}
            onChange={handleEmailChange}
            required // The email input field is now required
          />
          <button
            type="submit"
            className="btn subscribe-btn"
            onClick={handleClick}
            // style={{ left: "-20px" }}
            // Disable the submit button when submitting
          >
           SUBMIT
          </button>
        </InputGroup>
        
      </div>
      {emailError && <span style={{ color: "#FF8400" }}>{emailError}</span>}
    </Col>
    
    </>
  );
};

export default EmailButton;
