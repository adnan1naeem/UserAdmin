import React from 'react';
import { Box, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Header = ({ isMobile, onMenuClick }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center', 
        padding: '16px',
        bgcolor: 'background.paper',
        zIndex: 10,
      }}
    >
      {isMobile && (
        <IconButton
          onClick={onMenuClick}
        >
          <MenuIcon />
        </IconButton>
      )}
    </Box>
  );
};

export default Header;
