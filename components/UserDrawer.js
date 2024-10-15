import React, { useState } from 'react'; // Import React and useState hook
import { IconButton } from '@mui/material'; // Import IconButton from Material UI
import CloseIcon from '@mui/icons-material/Close'; // Import Close icon
import PeopleIcon from '@mui/icons-material/People'; // Import People icon
import SettingsIcon from '@mui/icons-material/Settings'; // Import Settings icon
import AssessmentIcon from '@mui/icons-material/Assessment'; // Import Assessment icon
import {
  StyledDrawer,
  StyledList,
  StyledListItem,
  StyledIcon,
  StyledText,
  StyledHeader,
  StyledTitle,
} from './UserDrawerStyles'; // Import styled components for custom styles

// UserDrawer component definition
const UserDrawer = ({ open, onClose, isMobile }) => {
  // Define an array of tab items with names and icons
  const tabs = [
    { name: 'Users', icon: <PeopleIcon /> }, // Tab for Users
    { name: 'Settings', icon: <SettingsIcon /> }, // Tab for Settings
    { name: 'Reports', icon: <AssessmentIcon /> }, // Tab for Reports
  ];
  
  // State to track the currently selected tab, default is 'Users'
  const [selectedTab, setSelectedTab] = useState('Users');

  return (
    // Render the styled drawer with conditional variant based on isMobile prop
    <StyledDrawer
      variant={isMobile ? 'temporary' : 'permanent'} // Set drawer variant based on mobile view
      open={open} // Control the open state of the drawer
      onClose={onClose} // Callback function to close the drawer
    >
      <StyledList>
        <StyledHeader>
          <StyledTitle variant="h5">Logo</StyledTitle> {/* Header title for the drawer */}
          {isMobile && ( // Conditionally render close button for mobile view
            <IconButton onClick={onClose}> {/* Close button to dismiss the drawer */}
              <CloseIcon sx={{ color: '#455a64' }} /> {/* Close icon */}
            </IconButton>
          )}
        </StyledHeader>

        {/* Map over the tabs array to create list items for each tab */}
        {tabs.map((tab) => (
          <StyledListItem
            button // Make the list item clickable
            key={tab.name} // Use the tab name as a unique key
            onClick={() => setSelectedTab(tab.name)} // Update the selected tab on click
            selected={selectedTab === tab.name} // Apply selected styling if this tab is currently selected
          >
            <StyledIcon selected={selectedTab === tab.name}> {/* Style the icon based on selection */}
              {tab.icon} {/* Render the tab icon */}
            </StyledIcon>
            <StyledText primary={tab.name} selected={selectedTab === tab.name} /> {/* Render the tab name */}
          </StyledListItem>
        ))}
      </StyledList>
    </StyledDrawer>
  );
};

export default UserDrawer; // Export the UserDrawer component for use in other files
