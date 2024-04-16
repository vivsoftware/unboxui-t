import React,{useEffect, useState} from "react";
import { Modal, ModalBody, ModalHeader, Button } from "@mui/material";
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { signInWithPhoneNumber, RecaptchaVerifier , fetchSignInMethodsForEmail ,createUserWithEmailAndPassword } from 'firebase/auth';
import PhoneInput from "react-phone-number-input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";


const StartModelMuMi = ({}) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(true);

    },[])

    // const handleOpen = () => {
    //     setOpen(true)
    // }
    const handleClose = () => {
        setOpen(false);
        console.log("staate", open);
        console.log("Modal Closed Clicked");
    }
    
    const requestOTP = (e) => {
        e.preventDefault();
        if(PhoneNumber.length >= 12){
            setIsProcessing(true); // starting processing
            setexpandform(true);
            generateRe
        }
    }

   
  return (
    <Modal
                                keepMounted
                                open={open}
                                onClose={handleClose}
                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} 
                                aria-labelledby="keep-mounted-modal-title"
                                aria-describedby="keep-mounted-modal-description"
    >   
                                
                                <Box sx={{
          display: "absolute",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: 2, // Add padding to the Box component
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", // Add box shadow
                borderRadius: "50%", // Add border radius for circular shape
                padding: "8px", // Increase padding for larger size
        }}>
                                    <div style={{border:"1px"}}>
                                        <Button onClick={handleClose} style={{ marginLeft:"400px", border: "1px"}}>
                                            <FontAwesomeIcon icon={faTimes} style={{color: "#ff8400", fontSize: "24px"}} />
                                        </Button>
                                    </div>
                                    <div className="my-modal-content" style={{ display: "flex-relative" }}>
                                        <p style={{fontSize: '16px', marginLeft: '5px'}}>Sign up to see pricing and many more exciting features!</p>
                                        
                                        <form >
                                            <label class="form-lable">Phone</label>
                                            <PhoneInput international defaultCountry='IN' type="tel" class="form-control" id="exampleInputPhone"  required />
                                            
                                        </form>
                                        
                                        <button type="submit" className="btn" style={{marginLeft: "125px"}}>Resend Otp</button>
                                    </div>
                                </Box>
                               
    </Modal>
  );
};

export default StartModelMuMi;
