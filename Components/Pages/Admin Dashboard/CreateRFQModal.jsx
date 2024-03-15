import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Input, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { auth } from '../../../Config/firebase';
import spring_boot_url from '../../../Utils/springApi';

const CreateRFQModal = () => {
    const [selectedOption, setSelectedOption] = useState('');
    const [modelNo, setModelNo] = useState('');
    const [email, setemail] = useState('');
    const [quantity, setQuantity] = useState('');
    const [deliveryDate, setDeliveryDate] = useState('');
    const [purpose, setPurpose] = useState('');
    const [solutionDescription, setSolutionDescription] = useState('');
    const [description, setDescription] = useState('');
    const [searchdata, setsearchdata] = useState(true);
    const [selectedItem, setSelectedItem] = useState('');
    const [showSearchCard, setShowSearchCard] = useState('');
    const [searchOpen, setSearchOpen] = useState(false);
    const [productName, setProductName] = useState("");
    const [phoneNumber, setphoneNumber] = useState("");
    const [userDe, setUserDe] = useState(null);
    const [SelectedFile, setSelectedFile] = useState(null);
    const [purposeOfRfq, setpurposeofRfq] = useState("");
    const { createRFQModal } = useSelector((state) => state.ModalReducer);
    const [userId, setuserId] = useState("");
    const [RfqData, setRfqData] = useState("");
    const [fileName, setfileName] = useState("");
    const [createdBy, setcreatedBy] = useState("");
    const [projectName, setprojectName] = useState("");
    const [searchQuery, setSearchQuery] = useState('');
    const searchResultContainerRef = useRef(null);
    const dispatch = useDispatch();


    const toggle = () => {
        // Clear form fields and reset radio button selection when modal is closed
        setSelectedOption('');
        setProductName('');
        setModelNo('');
        setDescription('');
        setQuantity('');
        setPurpose('');
        setDeliveryDate('');
        dispatch({ type: 'CREATERFQMODAL' });

    };
    const [user, setUser] = useState(null);



    const handleOptionChange = (value) => {
        setSelectedOption(value);
        // Clear form fields when an option other than 'product' is selected
        if (value !== 'product') {
            setProductName('');
            setModelNo('');
            setQuantity('');
            setDeliveryDate('');
            setPurpose('');
        }
        else {
            setpurposeofRfq(value)

        }
    };
    const handleSearchChange = (e) => {

            // const query = e.target.value;
            setSearchQuery(e.target.value);
            searchSi()
        
    };
    const handleItemClick = (selectedItem) => {
        setuserId(selectedItem.id)
        setphoneNumber(selectedItem.phoneNumber)
        setemail(selectedItem.email)
        setSelectedItem((prevSelectedItem) =>
            prevSelectedItem === selectedItem.firstName ? '' : selectedItem.firstName
        );
        setShowSearchCard(false); // Hide search card when an item is clicked
        setSearchOpen(false);
    };
    const searchSi = (e) => {
        axios.get(`${spring_boot_url}api/adminuser/search?query=${searchQuery}`)
            .then(resp => {
                console.log(resp.data.json);
                setsearchdata(resp.data);
            });
    };

    useEffect(() => {
        const handleOutsideClick = (event) => {
          if (
            searchOpen &&
            searchResultContainerRef.current &&
            !searchResultContainerRef.current.contains(event.target)
          ) {
            setSearchOpen(false);
          }
        };
      
        document.addEventListener('click', handleOutsideClick);
      
        return () => {
          document.removeEventListener('click', handleOutsideClick);
        };
      }, [searchOpen]);

    useEffect(() => {
        searchSi();
      }, [searchQuery]);

    // const [user, setUser] = useState(null);
    const [DocError, setDocError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                auth.onAuthStateChanged(async (authUser) => {
                    setUser(authUser);
                });
            } catch (error) {
                // Handle errors
                console.error("Error setting user:", error);
                // Set error state or show an error message to the user
            }
        };

        fetchData();
    }, []); // Empty dependency array ensures that this effect runs once on mount

    useEffect(() => {




        const fetchUserData = async () => {
            try {
                if (user && user.email) {
                    const resp = await axios.get(`${spring_boot_url}api/users/email?email=${user.email}`);
                    setUserDe(resp.data);
                } else if (user && user.phoneNumber) {
                    let phoneNumberd = user.phoneNumber.replace(/\+/g, "");
                    console.log("phonenumbereeeee", phoneNumberd);
                    const resp = await axios.get(`${spring_boot_url}api/users/phone?phoneNumber=${phoneNumberd}`);
                    setUserDe(resp.data);
                }
            } catch (error) {
                // Handle errors
                console.error("Error fetching user data:", error);
                // Set error state or show an error message to the user
            }
        };
        // fetchUserData();
    }, [user]); // Dependency on user to react to changes in the user state
    const [uploadShow, setUploadShow] = useState(false);
    const registerRfq = (e) => {
        setSelectedFile(e.target.files[0]);
    };
    const handleReload = () => {
        router.reload();
    };
    const router = useRouter();
    const Documentupload = async (e) => {
        toast(`Wait...`, {
            position: toast.POSITION.BOTTOM_CENTER,
        });
        const formdata = new FormData();
        // formdata.append("fileName", "file");
        formdata.append('files', SelectedFile);
        // formdata.fileName('fileName' , fileName);
        try {
            const response = await axios.post(`${spring_boot_url}api/rfqdoc/${RfqData}`, formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('File uploaded successfully:', response.data);
            toast.success(`Thanks for your request, we will get back to you`, {
                position: toast.POSITION.BOTTOM_CENTER,
            });

            // Assuming handleReload and toggle are functions defined in your component
            handleReload();
            toggle();
        } catch (error) {
            setDocError(true)
            console.error('Error uploading file:', error);
            toast.error('Error uploading file. Please try again.', {
                position: toast.POSITION.BOTTOM_CENTER,
            });
        };
    }
    const CreateRfq = async (e) => {
        e.preventDefault();
        const userDetails = {
            purpose,
            productName,
            email,
            modelNo,
            phoneNumber,
            deliveryDate,
            purposeOfRfq,
            projectName, 
            description,
            quantity,
            createdBy, 
            originalFilename: "FILE"
        };
        fetch(`${spring_boot_url}api/userRfq/${userId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userDetails),
        }).then((resp) => {
            // setRfqData(resp.data);
            if (resp.ok === true) {
                setUploadShow(true);
                async function getLastEntryId(userId) {
                    try {
                        const response = await axios.get(`${spring_boot_url}api/userRfq/${userId}`);
                        // Assuming the response data is an array and you want the ID of the last entry
                        const lastEntry = response.data[response.data.length - 1];
                        if (lastEntry) {
                            const lastEntryId = lastEntry.id;
                            console.log('ID of the last entry:', lastEntryId);
                            console.log(' entry:', lastEntryId);
                            setRfqData(lastEntryId);
                            return lastEntryId;
                        } else {
                            console.error('No entries found');
                            return null; // or handle accordingly
                        }
                    } catch (error) {
                        setUploadShow(false);

                        console.error('Error fetching data:', error);
                        return null; // or handle accordingly
                    }
                }
                getLastEntryId(userId)
            }
        });
    };
    return (
        <>
            <Modal className='add-address-modal' centered={true} id='addAddress' isOpen={createRFQModal} toggle={toggle} backdrop="static" keyboard={false}>
                <ModalHeader toggle={toggle} > </ModalHeader>
                <ModalBody className='custom-modal-body'>
                    <div className='mb-3'>
                        <label htmlFor='name' className='form-label font-light'>
                            Send to Users
                        </label>
                        <input
                            type="search"
                            className="form-control otp-phone"
                            placeholder="Search User By Phone Number Or Email..."
                            aria-label="Search"
                            style={{ height: '40px', border: "1px solid #ddd", borderRadius: '8px',color:"black" }}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            value={searchQuery}
                            onKeyDown={(e) => {
                                if (e.key === 'Backspace' && selectedItem.length > 0) {
                                    setSelectedItem(selectedItem.slice(0, -1));
                                }
                            }}
                            onFocus={() => setSearchOpen(true)} //
                        />
                        {searchdata && searchdata.length === 0 && (
                            <p style={{ color: 'red' }}>No SI found.</p>
                        )}
                        
                        {searchOpen && searchQuery.trim() !== '' && searchdata && searchdata.length > 0 && (
                           <div className='user-searchCard' ref={searchResultContainerRef}>
                                {searchdata.map((elem, index) => (
                                    <div className='user-search' key={index} onClick={() => handleItemClick(elem)}>
                                        <p>{elem.firstName}</p>
                                        <hr></hr>
                                    </div>
                                ))}
                           </div>
                        )}
                        
                    </div>
                    {/* <div className='mb-3'>
                        <label htmlFor='name' className='form-label font-light'>
                            Company Name
                        </label>
                        <Input type='text' className='form-control otp-phone' id='name' placeholder='Name' required />
                    </div> */}
                    <div className="form-group">
                    {/* <label className='form-label font-light'>Coustmer Name</label>
                    
                    <Input type='text' className='form-control otp-phone' id='name' placeholder='Coustmer Name' required   value={createdBy} onChange={(e) => setcreatedBy(e.target.value)}/> */}


                    <label className='form-label font-light'>Project Name</label>
                    
                    <Input type='text' className='form-control otp-phone' id='name' placeholder='Project Name' required   value={projectName} onChange={(e) => setprojectName(e.target.value)}/>


                        <label className='form-label font-light'>Purpose of RFQ</label>
                        <div className="form-check">
                            <label className="form-check-label">
                                <input
                                    type="radio"
                                    className="form-check-input otp-phone"
                                    name="purpose"
                                    value="product"
                                    checked={selectedOption === 'product'}
                                    onChange={() => handleOptionChange('product')}
                                />
                                Product
                            </label>
                        </div>
                        <div className="form-check">
                            <label className="form-check-label">
                                <input
                                    type="radio"
                                    className="form-check-input otp-phone"
                                    name="purpose"
                                    value="solution"
                                    checked={selectedOption === 'solution'}
                                    onChange={() => handleOptionChange('solution')}
                                />
                                Solution
                            </label>
                        </div>
                        <div className="form-check">
                            <label className="form-check-label">
                                <input
                                    type="radio"
                                    className="form-check-input otp-phone"
                                    name="purpose"
                                    value="services"
                                    checked={selectedOption === 'services'}
                                    onChange={() => handleOptionChange('services')}
                                />
                                Services
                            </label>
                        </div>
                    </div>
                    {selectedOption === 'product' && (
                        <div>
                            <h4 className='mt-3'>RFQ for Product</h4>
                            <form>
                                <label htmlFor="productName">Product Name:</label>
                                <Input
                                    type="text"
                                    className='otp-phone'
                                    id="productName"
                                    name="productName"
                                    value={productName}
                                    onChange={(e) => setProductName(e.target.value)}
                                    required
                                />
                                <br />
                                <label htmlFor="modelNo" >Model No:</label>
                                <Input
                                    type="text"
                                    className='otp-phone'
                                    id="modelNo"
                                    name="modelNo"
                                    value={modelNo}
                                    onChange={(e) => setModelNo(e.target.value)}
                                    required
                                />
                                <label htmlFor="quantity">Quantity</label>
                                <Input
                                    type="number"
                                    className='otp-phone'
                                    id="Quantity"
                                    name="Quantity"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                    required
                                />
                                <label htmlFor="date">Expected Delivery Date</label>
                                <Input
                                    type="date"
                                    className='otp-phone'
                                    id="deliveryDate"
                                    name="deliveryDate"
                                    value={deliveryDate}
                                    onChange={(e) => setDeliveryDate(e.target.value)}
                                    required
                                />
                                <label htmlFor="purpose">Purpose</label>
                                <Input
                                    type="text"
                                    className='otp-phone'
                                    id="purpose"
                                    name="purpose"
                                    value={purpose}
                                    onChange={(e) => setPurpose(e.target.value)}
                                    required
                                />
                            </form>
                        </div>
                    )}
                    {(selectedOption === 'solution') && (
                        <div>
                            <h4 className='mt-3'>RFQ for Solution</h4>
                            <form>
                                <label htmlFor='projectName'>Project Name:</label>
                                <Input type='text' className='otp-phone' placeholder='Machine Vision' />
                                <label htmlFor="description">Description:</label>
                                <textarea
                                    id="description"
                                    className='otp-phone'
                                    name="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                />
                            </form>
                        </div>
                    )}
                    {(selectedOption === 'services') && (
                        <div>
                            <h4 className='mt-3'>RFQ for Service</h4>
                            <form>
                                <label htmlFor='projectName'>Project Name:</label>
                                <Input type='text' className='otp-phone' placeholder='Machine Vision' />
                                <label htmlFor="description">Description:</label>

                                <textarea
                                    id="description"
                                    className='otp-phone'
                                    name="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                />
                            </form>
                        </div>
                    )}
                    <div className="form-group">
                        {uploadShow ? (
                            <div>
                                <label htmlFor="document">Upload Document(optional)</label>
                                <input type="file" id="document" name="document" className='input-field otp-phone' onChange={registerRfq} />
                                <button onClick={Documentupload} >Upload</button>
                            </div>
                        ) : (
                            <p></p>
                        )}

                    </div>
                    <div className='row'>
                        <div className='col-lg-6 col-md-12 col-sm-12'>
                            <button type="button" className="btn registerSI-btn mt-2" onClick={CreateRfq}>Save</button>
                        </div>
                        <div className='col-lg-6 col-md-12 col-sm-12'>
                            <button type="button" className="btn registerSI-btn mt-2" onClick={toggle}>Close</button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </>
    )
}

export default CreateRFQModal
