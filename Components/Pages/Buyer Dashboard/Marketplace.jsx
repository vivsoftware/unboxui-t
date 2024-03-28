import React, { useEffect, useState } from 'react';
import Home from '../../../pages';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { faL } from '@fortawesome/free-solid-svg-icons';
import Dashboard from './Dashboard';

const Marketplace = ({ activeTab }) => {
    const [data, setData] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [cancel, setCancel] = useState(false);

    const [showDashboard, setShowDashboard] = useState(false);
    const router = useRouter();


    const handleReload = () => {
        router.reload();
    };   //Reload and go to dashboard page when click cancel button

    const handleClose = () => {
        setCancel(true)
    }
    const handleOpen = () => {
        setOpen(true);
    };

    useEffect(() => {
        if (activeTab === 5) {  //Id of marketplace page
            handleOpen();
        }
        else if (open === false) {
            handleClose();
        }
    })

    setTimeout(() => {
        if (open === true) {
            router.push('/');   //Timeout function take you to home page in 3 seconds 
        }
    }, 3000);

    // Timeout(()=> {
    //     if(user==true)
    //     return setTimeout(handleOpen,3000);
    // })

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '4px solid #ff8400',
        boxShadow: 24,
        p: 4,
    };

    
    return (
        <>
            {showDashboard ? <Dashboard /> : (
                <>
                    <div>
                        <div>
                            <Modal
                                keepMounted
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="keep-mounted-modal-title"
                                aria-describedby="keep-mounted-modal-description"
                            >
                                <Box sx={style}>
                                    <div className="my-modal-content" style={{ display: "flex-relative" }}>
                                        <p style={{fontSize: '16px', marginLeft: '50px'}}>Going Into Marketplace</p>
                                        <LinearProgress />
                                    </div>
                                    <div style={{ display: 'flex' }}>
                                        <button onClick={handleReload} style={{marginLeft: '90px', marginTop: '24px', width: '140px', height: '40px', fontSize: '24px', backgroundColor:'#ff8400', border: '1px solid #ccc'}}>Cancel</button>
                                    </div>
                                </Box>
                            </Modal>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}
export default Marketplace;



// import React, { useEffect, useState } from 'react';
// import Home from '../../../pages';
// import { useRouter } from 'next/router';

// const Marketplace = ( activeTab ) => {
//     const [data, setData] = useState(false);
//     useEffect(() => {
//         if (activeTab === null) {
//             setData(true);
//         }
//     })

//     return (
//         <div>
//             {data ? (
//                 <h1>Marketplace</h1>
//             ) : (
//                 <h1>Marketplace</h1>
//             )}
//         </div>
//     )
// }
// // const Marketplace = ({ activeTab }) => {

// //     const router = useRouter();
// //     useEffect(() => {
// //         // if (activeTab(id) === 0) {
// //         //     router.push("/");
// //         // }

// //         if(activeTab===0)
// //         {
// //           router.push("/");
// //         }
// //     })

// //     console.log("Marketplace", activeTab)

// //     return (
// //         <div>

// //         </div>
// //     )
// // }

// export default Marketplace;



// import React, {useState, useEffect} from 'react';
// import Home from '../../../pages';
// import { useRouter } from 'next/router';

// const Marketplace = (activeTab) => {
//   const [data, setData] = useState(false);
//     useEffect(() => {
//         if (activeTab === null) {
//             setData(true);
//         }
//     })

//   return (
//     <div>
//             {data ? (
//                 <h1>Marketplace</h1>
//             ) : (
//                 <h1>Marketplace</h1>
//             )}
//         </div>
//   )
// }

// export default Marketplace;


// // const Marketplace = ({ activeTab }) => {

// //     const router = useRouter();
// //     useEffect(() => {
// //         // if (activeTab(id) === 0) {
// //         //     router.push("/");
// //         // }

// //         if(activeTab===0)
// //         {
// //           router.push("/");
// //         }
// //     })

// //     console.log("Marketplace", activeTab)

// //     return (
// //         <div>

// //         </div>
// //     )
// // }

