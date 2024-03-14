import React, {useState, useEffect} from 'react'
import TopHeaderBar from '../../Element/TopHeaderBar'
import NavBar from '../../Element/NavBar'
import PrimarySearchAppBar from '../../../Components/Element/searchbar'
import { useHeaderScroll } from '../../../Utils/HeaderScroll'
import { Row, Col } from 'reactstrap'
import TopHeaderBar2 from '../../Element/TopHeaderBar2'
import axios from 'axios'
import spring_boot_url from '../../../Utils/springApi'

const Header = ({noStyle}) => {
  const UpScroll = useHeaderScroll(false);
  const [userDe, setUserDe] = useState(null);

  useEffect(() => {
    axios.get(`${spring_boot_url}api/adminuser/allusers`)
      .then(resp => {
        console.log(resp.data.json);
        setUserDe(resp.data);
      });

  }, [])
  return (
    <>
      <header id="home" className={`custom-header ${!noStyle ? `${UpScroll ? 'nav-down nav-up' : ''}` : ''}`}>
        <TopHeaderBar2  userDe={userDe}/>

        {/* <div className="main-header navbar-searchbar">
          <div className="container-fluid">
            <Row>
              <Col lg="12">
                <div className="second-header">
                  <div className="d-none d-xl-block d-md-none">
                    <nav>
                      <NavBar  />
                    </nav>
                  </div>
                  <div className="d-block d-xl-none d-md-block mb-2">
                    <PrimarySearchAppBar />
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div> */}
      </header>
    </>
  )
}

export default Header
