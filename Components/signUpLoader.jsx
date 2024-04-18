import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Modal from '@mui/material/Modal';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Img from './Element/Images';

const Loader = () => {
    const [open, setOpen] = useState(false);
    const [buffer, setBuffer] = React.useState(10);
    const [progress, setProgress] = React.useState(0);
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            setOpen(true);
        });

        return () => clearTimeout(timer);
    }, []); // Run once when component mounts


    const handleClose = () => {
        setOpen(false);
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        height: 180,
        bgcolor: 'background.paper',
        border: '4px solid #ff8400',
        boxShadow: 24,
        p: 4,
    };

    return (
        <>
            <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    <p style={{ fontSize: '20px', marginTop: "-20px" }}> Please wait...we are login you soon!
                        <br />
                    </p>
                    <p style={{ marginLeft: "50px", marginTop: "-24px" }}>
                        <Img src="Logofinal.svg" alt="unbox" width={200} height={100} />
                    </p>
                    <CircularProgress style={{ marginTop: "-62px", marginLeft: "125px" , color: "#ff8400" , borderRadius: "10px"} } />
                </Box>

            </Modal>
        </>
    );
};

export default Loader;

