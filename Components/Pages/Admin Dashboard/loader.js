import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import axios from 'axios';
import * as React from 'react';
import { toast } from 'react-toastify';
import spring_boot_url from '../../../Utils/springApi';
const loadermail = () => {

    const [progress, setProgress] = React.useState(0);

    React.useEffect(() => {
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            return 0;
          }
          const diff = Math.random() * 10;
          return Math.min(oldProgress + diff, 100);
        });
      }, 500);
  
      return () => {
        clearInterval(timer);
      };
    }, []);
    const sendmail = async (e) => {
        const formdata = new FormData();
        // formdata.append("fileName", "file");
        formdata.append('to', `${selectUserdata.email}`);

        // formdata.append('files', SelectedFile);
        // formdata.fileName('fileName' , fileName);
        try {
            const response = await axios.post(`${spring_boot_url}api/mails/send/${mailId}`, formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('File uploaded successfully:', response.data);
            toast.success(`Email sende to ${selectUserdata.email}`, {
                position: toast.POSITION.BOTTOM_CENTER,
            });

            if (response.data === "Email sent successfully") {

                setmailId(null)

            }
            // Assuming handleReload and toggle are functions defined in your component
            // handleReload();
            toggle();
        } catch (error) {
            // setDocError(true)
            // console.error('Error uploading file:', error);
            // toast.error('Error uploading file. Please try again.', {
            //   position: toast.POSITION.BOTTOM_CENTER,
            // });
        };
    }

    return (
        <Box sx={{ width: '100%' }}>
          <LinearProgress variant="determinate" value={progress} />
        </Box>
      );
    }

export default loadermail;





