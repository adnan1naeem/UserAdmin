// pages/index.js or pages/home.js (your Home component)
import React, { useState, useEffect } from 'react'; // Import React and hooks
import { Box, Typography } from '@mui/material'; // Import Material UI components
import useMediaQuery from '@mui/material/useMediaQuery'; // Import media query hook
import { motion } from 'framer-motion'; // Import framer-motion for animations
import UserDrawer from '../components/UserDrawer'; // Import UserDrawer component
import UserTable from '../components/UserTable'; // Import UserTable component
import Header from '../components/Header'; // Import Header component
import { getRequest1, postRequest } from '../context/api'; // Import API requests

const Home = () => {
  const [users, setUsers] = useState([]); // State to hold users
  const [open, setOpen] = useState(false); // State to control drawer visibility
  const isMobile = useMediaQuery('(max-width:900px)'); // Check if the device is mobile

  // Function to fetch user data from the API
  const fetchData = async () => {
    try {
      const result = await getRequest1(); // Fetch users
      console.log(result.data);
      setUsers(result.data); // Update users state
    } catch (error) {
      console.error('Failed to fetch users:', error); // Log error
    }
  };

  // Effect to fetch users on component mount
  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array means it runs once on mount

  // Animation variants for the table
  const tableVariants = {
    hidden: { opacity: 0, y: 50 }, // Initial state
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } } // Animated state
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', position: 'relative', flexDirection: { xs: 'column', md: "row" } }}>
      {isMobile && <Header isMobile={isMobile} onMenuClick={() => setOpen(!open)} />} {/* Show header on mobile */}
      <UserDrawer open={open} onClose={() => setOpen(false)} isMobile={isMobile} /> {/* Drawer component */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: '#F0F7FF',
          padding: isMobile ? '1rem' : '2rem',
          display: 'flex',
          flexDirection: 'column',
          height: '110vh' // Ensure it stretches the height
        }}
      >
        <Typography
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
          initial="hidden" // Initial animation state
          animate="visible" // Animated state
          variants={tableVariants} // Animation variants
        >
          <UserTable users={users} fetchData={fetchData} /> {/* UserTable component with users data */}
        </motion.div>
      </Box>
    </Box>
  );
};

export default Home; // Export the Home component
