import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
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
        height:180,
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
                    {/* <div className="my-modal-content" style={{ display: "flex", flexDirection: 'column', alignItems: 'center' }}> */}
                        <p style={{ fontSize: '20px', marginTop: "-20px"}}> Please wait...we are login you soon!
                        <br/>
                        </p>
                        <p style={{marginLeft: "50px", marginTop: "-14px"}}>
                        <Img src="Logofinal.svg" alt="unbox" width={200} height={100}/>
                        </p>
                        <LinearProgress variant="buffer" value={progress} valueBuffer={buffer} />
                        {/* <Button onClick={handleClose} style={{ marginTop: '24px', fontSize: '16px', backgroundColor: '#ff8400', border: '1px solid #ccc' }}>Cancel</Button> */}
                    {/* </div> */}
                </Box>
               
            </Modal>
        </>
    );
};

export default Loader;

