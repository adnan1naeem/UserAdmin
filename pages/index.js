// pages/index.js or pages/home.js (your Home component)
import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { motion } from 'framer-motion';
import UserDrawer from '../components/UserDrawer';
import UserTable from '../components/userTable';
import Header from '../components/header';
import { getRequest1, postRequest } from '../context/api';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:900px)');

  const fetchData = async () => {
    try {
      const result = await getRequest1();
      console.log(result.data);
      setUsers(result.data); 
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  const tableVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', position: 'relative',flexDirection:{xs:'column',md:"row"} }}>

     {isMobile&& <Header isMobile={isMobile} onMenuClick={() => setOpen(!open)} />}
       <UserDrawer open={open} onClose={() => setOpen(false)} isMobile={isMobile} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: '#F0F7FF',
          padding: isMobile ? '1rem' : '2rem',
          display: 'flex',
          flexDirection: 'column',
          height:'110vh'
        }}
      >
        <Typography
          variant="h4" // You can adjust the size with h4, h5, etc.
          sx={{
            fontWeight: 'bold',
            marginTop: '2rem', // Adjust the margin top
            marginBottom: '2rem', // Adjust the margin bottom
            textAlign: 'center', // Center the text
          }}
        >
          Dashboard
        </Typography>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={tableVariants}
        >
          <UserTable users={users} fetchData={fetchData} />
        </motion.div>
      </Box>
    </Box>
  );
};

export default Home;
