// import React, { useState, useEffect } from 'react';
// import Box from '@mui/material/Box';
// import LinearProgress from '@mui/material/LinearProgress';
// import Button from '@mui/material/Button';
// import Modal from '@mui/material/Modal';
// import { useRouter } from 'next/router';
// import Marketplace from './Marketplace';
// import { faL } from '@fortawesome/free-solid-svg-icons';

// const MarketplaceLoader = ({ data }) => {

//     const [open, setOpen] = React.useState(false);
//     const [cancel, setCancel] = useState(false);
//     const router = useRouter();

//     const handleClose = () => {
//         // setOpen(false);
//         // setCancel(true);
//         // console.log("handleClose");
//         setOpen(false);
//         // setuploadRfq(null);
//     }

//     const handleOpen = () => {
//         setOpen(true);
//         // ssetrfqdata(elem);
//     };


//     if (data === true) {
//         handleOpen();

//     }


//     // useEffect(() => {
//     //     // setOpen(true);

//     //     if (data === true) {
//     //         handleOpen();

//     //     }
//     //     // setTimeout(() => {

//     //     //     // if (activeTab === 5) {
//     //     //         // setOpen(true);
//     //     //         // handleClose();
//     //     //         // handleOpen()

//     //     //         //router.push('/');
//     //     //     // }
//     //     //         handleClose();
//     //     //     }, 3000);
//     // }, );

//     const style = {
//         position: 'absolute',
//         top: '50%',
//         left: '50%',
//         transform: 'translate(-50%, -50%)',
//         width: 400,
//         bgcolor: 'background.paper',
//         border: '4px solid #ff8400',
//         boxShadow: 24,
//         p: 4,
//     };

//     console.log("marketplace ytu", data);

//     return (


//         <div>
//             {/* <Button onClick={handleOpen}>Open modal</Button> */}
//             <Modal
//                 keepMounted
//                 open={open}
//                 onClose={handleClose}
//                 aria-labelledby="keep-mounted-modal-title"
//                 aria-describedby="keep-mounted-modal-description"
//             >
//                 <Box sx={style}>
//                     <div className="my-modal-content" style={{ display: "flex-relative" }}>
//                         <p>Going Into Marketplace</p>
//                         <LinearProgress />
//                         {/* <MarketplacePop /> */}
//                     </div>
//                     <div style={{ display: 'flex' }}>

//                         <button onClick={handleClose}>Cancel</button>
//                     </div>
//                 </Box>
//             </Modal>
//         </div>
//     );
// }

// export default MarketplaceLoader;

