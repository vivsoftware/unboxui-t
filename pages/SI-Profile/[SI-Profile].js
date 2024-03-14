import { useDispatch } from 'react-redux';
import AdminDashboard from '../../Components/Pages/Admin Dashboard/AdminDashboard';
import Layout4 from '../../Layout/Layout4';
import Head from 'next/head';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Col, Row } from 'reactstrap';
import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import springWithAuth from '../../Utils/spring_auth';
import spring_boot_url from '../../Utils/springApi';
import { useRouter } from 'next/router';
import { AdminDashboardData } from '../../Data/AdminDashboardData';
import AllTabContain from '../../Components/Pages/Admin Dashboard/AllTabContain';
import { Link } from 'react-feather';


const siDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const router = useRouter();
  const id = (router.si);
  const [userDe, setUserDe] = useState(null);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(true);
  const [searchdata, setsearchdata] = useState(true);
  const [searchQuery, setSearchQuery] = useState(true);
  const [num, setNum] = useState(1);
  const toggle = (id) => {
    setNum(id);
  };

  useEffect(() => {
    axios.get(`${spring_boot_url}api/si/SystemInergrator/12`)
      .then(resp => {
        console.log(resp.data.json);
        setUserDe(resp.data);
      });
  }, [])

  const toggleDropdown = () => {
    setDropdownVisible((prevState) => !prevState);
  };


  const handleOptionClick = (option) => {
    console.log(`Option clicked: ${option}`);
    setDropdownVisible(false);
    if (option === 'view') {
      setShowDetails(false);
    }
  };
  const dispatch = useDispatch();
  const handleModal = () => {
    dispatch({ type: "REGISTERSIMODAL" });
  };

  const handleModalSI = () => {
    dispatch({ type: "ALLSIMODAL" });
  };

  const handleSearchChange = (e) => {
    // Clear searchdata if the input is empty
    if (e.target.value.trim() === '') {
      setsearchdata(null);
    } else {
      // const query = e.target.value;
      setSearchQuery(e.target.value);
      searchSi()

    }

  };

  const searchSi = (e) => {
    axios.get(`${spring_boot_url}api/si/SystemInergrator/search?query=${searchQuery}`)
      .then(resp => {
        console.log(resp.data.json);
        setsearchdata(resp.data);
      });

  };



  const handleClick = (tab) => {
    setActiveTab(tab);
  };


  console.log("userDEEEE", userDe)
  return (
    <>

      <Layout4>
        <div className='container'>
        <div className='row mt-4'>
          <div className='col-8'>
            <h2>Profile</h2>
          </div>
          <div className='col-2'>
            <a href='/admin-dashboard'>
            <button className="btn ViewSI-btn">
              Dashboard
            </button>
            </a>
          </div>
          <div className='col-2'>
            <button className="btn ViewSI-btn" >
              <i className='bi bi-trash' style={{ color: 'white' }}></i>Delete
            </button>
          </div>
        </div>
        <div className='SI-profileCard mt-1 mb-3'>
          <div className='row'>
            <div className='col-6'>
              <img src='/You2.png' style={{ borderRadius: '50%', width: '100px', height: '90px' }} />
            </div>
            <div className='col-6 text-end'>
              <button className='btn' style={{ backgroundColor: 'white', color: "#FF8400", height: '20px', padding: '0' }} >Edit</button>
            </div>
          </div>
          <div className='row'>
            <div className='col-4'>
              <label style={{ color: '#979696 ' }}>name:</label>
            </div>
            <div className='col-6'>
              <p>{userDe?.name}</p>
            </div>

          </div>
          <div className='row'>
            <div className='col-4'>
              <label style={{ color: '#979696 ' }}>Company Name:</label>
            </div>
            <div className='col-6'>
              <p>Pooja Sharma</p>
            </div>

          </div>
          <div className='row'>
            <div className='col-4'>
              <label style={{ color: '#979696 ' }}>Email Id:</label>
            </div>
            <div className='col-6'>
              <p>Pooja Sharma</p>
            </div>

          </div>
          <div className='row'>
            <div className='col-4'>
              <label style={{ color: '#979696 ' }}>Phone No.:</label>
            </div>
            <div className='col-6'>
              <p>Pooja Sharma</p>
            </div>

          </div>
          <div className='row'>
            <div className='col-4'>
              <label style={{ color: '#979696 ' }}>Region:</label>
            </div>
            <div className='col-6'>
              <p>Pooja Sharma</p>
            </div>

          </div>
          <div className='row'>
            <div className='col-4'>
              <label style={{ color: '#979696 ' }}>Address:</label>
            </div>
            <div className='col-6'>
              <p>Pooja Sharma</p>
            </div>

          </div>
          <div className='row'>
            <div className='col-4'>
              <label style={{ color: '#979696 ' }}>Type:</label>
            </div>
            <div className='col-6'>
              <p>Pooja Sharma</p>
            </div>

          </div>
          <div className='row'>
            <div className='col-4'>
              <label style={{ color: '#979696 ' }}>Description:</label>
            </div>
            <div className='col-6'>
              <p>Pooja Sharma</p>
            </div>

          </div>
        </div>
        </div>
      </Layout4>
    </>

  )
}

export default siDashboard
