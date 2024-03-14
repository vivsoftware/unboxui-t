import React, { Fragment , useEffect ,useState} from 'react';
import { useDispatch } from 'react-redux';
import { Btn } from '../../AbstractElements';
import Router from 'next/router';
import { useRouter } from 'next/router';
import spring_boot_url from '../../../Utils/springApi';
import axios from 'axios';
import { auth } from '../../../Config/firebase';

const SecurityContain = () => {
  const router = useRouter();
  const [userDe, setUserDe] = useState(null);
  const [user, setuser] = useState(null)

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
        setuser(user)
        if (user.email) {
          axios.get(`${spring_boot_url}api/users/email?email=${user.email}`)
            .then(resp => {    
              console.log(resp.data.json);
              localStorage.setItem("data", JSON.stringify(resp.data));
              setUserDe(resp.data);
            });
        } else if (user.phoneNumber) {
          let phoneNumberd = user.phoneNumber
          phoneNumberd = phoneNumberd.replace(/\+/g, "");
          console.log("phonenumbereeeee", phoneNumberd);
          axios.get(`${spring_boot_url}api/users/phone?phoneNumber=${phoneNumberd}`)     
            .then(resp => {     
              console.log(resp.data.json);
              localStorage.setItem("data", JSON.stringify(resp.data));
              setUserDe(resp.data);
            });   

        }

    })

}, [])

  const signOut = () => {
    auth.signOut().then(() => {
      setuser(null)
        auth.onAuthStateChanged(async (user) => {
          setuser(user)
          console.log(user)
          if (user === null) {
            router.push("/login"); // Replace with your own page path
          }
        })
    })
  }

  const dispatch = useDispatch();
  const deleteModal = () => {
    dispatch({ type: 'OPENDELETEMODAL' });
  };

  return (
    <Fragment>
      <div className='box-head'>
      </div>
      <div className='security-details'>
        <h5 className='font-light mt-3'>
        {userDe ? (
                    <span>Hi..{userDe.firstName} {userDe.lastName}</span>
                  ) : (
                    <span>Please wait...</span>
                  )}
        </h5>
      </div>

      <div className=' mb-0'>
        <Btn attrBtn={{ className: 'btn-solid-default btn-sm fw-bold rounded', onClick: signOut }}>Logout</Btn>
      </div>
    </Fragment>

  );
  
};

export default SecurityContain;
