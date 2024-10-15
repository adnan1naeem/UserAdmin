import React, { useState, useEffect } from 'react'; // Import React and hooks
import { Box, Typography, CircularProgress } from '@mui/material'; // Import Material UI components
import useMediaQuery from '@mui/material/useMediaQuery'; // Import media query hook
import { motion } from 'framer-motion'; // Import framer-motion for animations
import UserDrawer from '../components/UserDrawer'; // Import UserDrawer component
import UserTable from '../components/userTable'; // Import UserTable component
import Header from '../components/header'; // Import Header component
import { getRequest1 } from '../context/api'; // Import API requests

const Home = () => {
  const [users, setUsers] = useState([]); // State to hold users
  const [open, setOpen] = useState(false); // State to control drawer visibility
  const isMobile = useMediaQuery('(max-width:900px)'); // Check if the device is mobile
  const [isOnline, setIsOnline] = useState(true); // Default to true; will update later
  const [loading, setLoading] = useState(false); // State to manage loading status

  // Function to fetch user data from the API
  const fetchData = async () => {
    setLoading(true); // Set loading to true before fetching
    try {
      const result = await getRequest1(); // Fetch users
      console.log(result.data);
      setUsers(result.data); // Update users state
    } catch (error) {
      console.error('Failed to fetch users:', error); // Log error
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  // Effect to fetch users on component mount
  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array means it runs once on mount

  // Effect to handle online/offline status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    // Check if navigator is defined to avoid ReferenceError
    if (typeof navigator !== 'undefined') {
      setIsOnline(navigator.onLine);
      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);

      // Cleanup event listeners
      return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
      };
    }
  }, []);

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
        {loading ? ( // Show loader while fetching data
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <CircularProgress /> {/* Loader component */}
          </Box>
        ) : isOnline ? ( // Check if online
          <>
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
          </>
        ) : ( // If offline, show message
          <Typography
            sx={{
              fontWeight: 'bold',
              marginTop: '2rem',
              textAlign: 'center',
              color: 'red', // Change color for visibility
            }}
          >
            Please check your internet connection.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Home; // Export the Home component
