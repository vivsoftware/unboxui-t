import React from 'react';
import { Modal, Box, Button } from '@mui/material';

const signUpModal = ({ open, handleClose }) => {

    console.log("opeing SignUp Modal");

    return(
        <div>
            <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="signup-modal-title"
                aria-describedby="signup-modal-description"
            >
                <Box>
                    <h3>Signup modal hai</h3>
                </Box>
            
            </Modal>
        </div>
    )
}

export default signUpModal;