import React from 'react';
import { Box, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

// Define styles for the Header component
const styles = {
  header: {
    display: 'flex',              // Use flexbox for layout
    alignItems: 'center',        // Center items vertically
    padding: '16px',             // Add padding around the Box
    bgcolor: 'background.paper',  // Set background color from theme
    zIndex: 10,                  // Ensure the header is above other content
  },
};

// Header component for the application
const Header = ({ isMobile, onMenuClick }) => {
  return (
    <Box sx={styles.header}>  {/* Apply styles from the styles object */}
      {/* Render the menu icon button only on mobile devices */}
      {isMobile && (
        <IconButton onClick={onMenuClick}>  {/* Handle menu click event */}
          <MenuIcon />  {/* Icon for the menu button */}
        </IconButton>
      )}
    </Box>
  );
};

export default Header; // Export the Header component for use in other parts of the application
