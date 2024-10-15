import { styled } from '@mui/material/styles';
import { Drawer, List, ListItem, ListItemText, Typography, ListItemIcon } from '@mui/material';

// Main drawer style
export const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: 280,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: 280,
    backgroundColor: '#07275A', // Darker lavender background
    color: '#424242', // Dark gray text
    boxShadow: '2px 0 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '0 12px 12px 0',
  },
}));

// List style
export const StyledList = styled(List)({
  padding: '16px',
});

// List item style
export const StyledListItem = styled(ListItem)(({ selected }) => ({
  borderRadius: '8px',
  margin: '8px 0',
  padding: '12px',
  backgroundColor: selected ? '#1677FF26' : 'transparent', // Soft blue for selected
  boxShadow: selected ? '0 2px 4px rgba(0, 0, 0, 0.15)' : 'none',
  '&:hover': {
    backgroundColor: selected ? '#90caf9' : '#f5f5f5', // Light gray hover effect
  },
}));

// Icon style
export const StyledIcon = styled(ListItemIcon)(({ selected }) => ({
  color: selected ? 'white' : 'white', // Darker blue for selected, medium blue for default
}));

// Text style
export const StyledText = styled(ListItemText)(({ selected }) => ({
  color: selected ? 'white' : 'white', // Darker blue for selected text, dark gray otherwise
  '& .MuiTypography-root': {
    fontWeight: selected ? 'bold' : 'normal',
    fontSize: '1rem',
  },
}));

// Header and title styles
export const StyledHeader = styled(ListItem)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingBottom: '16px',
});

export const StyledTitle = styled(Typography)({
  color: '#424242', // Dark gray for title text
  fontWeight: 'bold',
});
