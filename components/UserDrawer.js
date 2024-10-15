import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const UserDrawer = ({ open, onClose, isMobile }) => {
  // Array of tab items
  const tabs = ['Users', 'Settings', 'Reports'];
  const [selectedTab, setSelectedTab] = useState('Users'); // Default selected tab

  return (
    <Drawer
      variant={isMobile ? "temporary" : "permanent"}
      open={open}
      onClose={onClose}
      sx={{
        width: isMobile ? 0 : 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          backgroundColor: '#282c34',
          color: '#fff',
        },
      }}
    >
      <List>
        <ListItem sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ color: '#ffffff' }}>Dashboard</Typography>
          {isMobile && (
            <IconButton onClick={onClose}>
              <CloseIcon sx={{ color: 'white' }} />
            </IconButton>
          )}
        </ListItem>
        {/* Map over the tabs array to create ListItems */}
        {tabs.map((tab) => (
          <ListItem
            button
            key={tab}
            onClick={() => setSelectedTab(tab)} // Update the selected tab
            sx={{
              backgroundColor: selectedTab === tab ? '#3a3f47' : 'transparent', // Highlight the selected tab
              '&:hover': {
                backgroundColor: '#3a3f47', // Optional hover effect
              },
            }}
          >
            <ListItemText primary={tab} sx={{ color: '#ffffff' }} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default UserDrawer;
