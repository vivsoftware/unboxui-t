

import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import spring_boot_url from '../../../Utils/springApi';
import RenderDetails from './renderDetails';
import RenderNewComponent from './renderNewComponent';

const TenderContain = ({ tender, rfq }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(true);
  const [userDe, setUserDe] = useState(true); ///change hook or userDe
  const [RFQDe, setRFQDe] = useState(true);
  const [searchdata, setsearchdata] = useState(true);
  const [searchRFQdata, setsearchRFQdata] = useState(true);
  const [searchQuery, setSearchQuery] = useState(true);
  const [searchRFQQuery, setSearchRFQQuery] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('All');
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedUserData, setSelectedUserData] = useState(null);
  const [showRFQ, setShowRFQ] = useState(true);
  const [showUsers, setShowUsers] = useState(true);
  const [showSearchCard, setShowSearchCard] = useState(false);
  const [showBid, setShowBid] = useState(false);
  const [nextButton, setNextButton] = useState(false);
  const searchRef = useRef(null);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [rfqdata, ssetrfqdata] = useState(true);
  const [uploadRfq, setuploadRfq] = useState("");
  const [open, setOpen] = React.useState(false);
  const [nextBtn, setnextBtn] = React.useState(false);
  const [tenderid, settenderid] = React.useState(null);
  const [tenderbid, settenderbid] = React.useState(null);
  const [tenderBids, setTenderBids] = useState({});


  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  const handleClickOutside = (e) => {
    if (searchRef.current && !searchRef.current.contains(e.target)) {
      // Clicked outside the search card, close it
      setShowSearchCard(false);
    }
  };
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
  const handleClose = () => {
    setOpen(false);
    setuploadRfq(null);
  }
  const handleOpen = (elem) => {
    setOpen(true);
    ssetrfqdata(elem);
  };

  useEffect(() => {
    const savedOption = localStorage.getItem('selectedOption');
    if (savedOption) {
      setSelectedOption(savedOption);
    }
    allUsers();
  }, []);

  const openModal = (userData) => {
    setSelectedUserData(userData);
    setModalOpen(true);
  };
  const toggleFilterDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    axios.get(`${spring_boot_url}api/userRfq`)
      .then(resp => {
        console.log(resp.data.json);
        localStorage.setItem("data", JSON.stringify(resp.data));
        setRFQDe(resp.data);
      });
  }, []);
  const handleFilterOptionClick = (option) => {
    setSelectedOption(option);
    localStorage.setItem('selectedOption', option);

    switch (option) {
      case 'Seller':
        seller();
        break;
      case 'Buyer':
        buyer();
        break;
      case 'Service Provider':
        serviceProvider();
        break;
      default:
        allUsers();
        break;
    }
    setIsOpen(false);
  };
  const allUsers = () => {
    axios.get(`${spring_boot_url}api/adminuser/allusers`)
      .then(resp => {
        console.log(resp.data.json);
        localStorage.setItem("data", JSON.stringify(resp.data));
        setUserDe(resp.data);
      });
  }
  const seller = () => {
    axios.get(`${spring_boot_url}api/adminuser/search?query=seller`)
      .then(resp => {
        console.log(resp.data.json);
        setUserDe(resp.data);
      });
  }
  const buyer = () => {
    axios.get(`${spring_boot_url}api/adminuser/search?query=buyer`)
      .then(resp => {
        console.log(resp.data.json);
        setUserDe(resp.data);
      });
  }
  const serviceProvider = () => {
    axios.get(`${spring_boot_url}api/adminuser/search?query=service provider`)
      .then(resp => {
        console.log(resp.data.json);
        setUserDe(resp.data);
      });
  }
  const handleCreateTender = () => {
    setShowDetails(false);
  }
  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };
  const handleOptionClick = (option) => {
    console.log(`Option clicked: ${option}`);
    setDropdownVisible(false);
  };

  const handleBackToDetails = () => {
    setShowDetails(true);
  };
  const openRFQDropdown = () => {
    setShowRFQ(!showRFQ);
  }
  const openUsersDropdown = () => {
    setShowUsers(!showUsers);
  }
  const handleSearchChange = (e) => {
    // Clear searchdata if the input is empty
    if (e.target.value.trim() === '') {
      setsearchdata(null);
    } else {
      // const query = e.target.value;
      setSearchQuery(e.target.value);
      searchSi();
    }
  };
  const handleSearchRFQChange = (e) => {
    // Clear searchdata if the input is empty
    if (e.target.value.trim() === '') {
      setsearchRFQdata(null);
    } else {
      // const query = e.target.value;
      setSearchRFQQuery(e.target.value);
      searchRFQ();
    }
  };
  const searchRFQ = (e) => {
    axios.get(`${spring_boot_url}api/userRfq/search?query=${searchQuery}`)
      .then(resp => {
        console.log(resp.data.json);
        setsearchRFQdata(resp.data);
      });
  };
  const searchSi = (e) => {
    axios.get(`${spring_boot_url}api/adminuser/search?query=${searchQuery}`)
      .then(resp => {
        console.log(resp.data.json);
        setsearchdata(resp.data);
      });
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleViewDetailsClick = (userData) => {
    openModal(userData);
    setsearchdata(null);
  };
  const handleViewRFQDetailsClick = (userData) => {
    openModal(userData);
    setsearchRFQdata(null);
  };

  const formatDate = (dateString) => {
    const originalDate = new Date(dateString);
    const day = originalDate.getDate();
    const month = originalDate.getMonth() + 1; // Months are zero-indexed, so add 1
    const year = originalDate.getFullYear() % 100; // Getting last two digits of the year

    // Padding single digits with a leading zero
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedYear = year < 10 ? `0${year}` : year;

    return `${formattedDay}-${formattedMonth}-${formattedYear}`;
  };

  const handleBidClick = () => {
    setShowBid(!showBid);
  }
  const handleNextButton = () => {
    setNextButton(!nextButton);
  }
  const tendernext = (elem) => {
    setTenderselectdata(elem)
    setnextBtn(true)
  }
  useEffect(() => {
    // Function to filter data based on search term
    const filterData = () => {
      const filteredData = rfq?.filter(item => {
        // Customize the conditions based on your data structure
        return (
          (item.projectName && item.projectName.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (item.email && item.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (item.phoneNumber && item.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      });
      setSearchResults(filteredData);
    };
    filterData();
  }, [rfq, searchTerm]);



  return (
    <div>
      {
        showDetails ? <RenderDetails
          tender={tender}
          tenderBids={tenderBids}
          formatDate={formatDate}
          handleOpen={handleOpen}
          handleBidClick={handleBidClick}
          userDe={userDe} 
        /> : (
          <RenderNewComponent handleBackToDetails={handleBackToDetails} tender={tender} 
          />
        )}
    </div>
  )
}
export default TenderContain;
