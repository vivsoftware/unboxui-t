import { useRouter } from 'next/router';
import { User } from 'react-feather';
const AdminUser = () => {
  const router = useRouter();

  return (
    <>
    <div className='d-none d-xl-block d-md-block d-sm-none'>
      <div className='cart-icon'>
        {/* <User /> */}
        <img src="/Gopal.svg" width="30px" height="30px"/>
      </div>
      </div>
      <div className='d-block d-xl-none d-md-none d-sm-block'>
      <div className='cart-icon'>
        <User style={{color:'white'}}/>
      </div>
      </div>
    </>


  )

};
export default AdminUser;