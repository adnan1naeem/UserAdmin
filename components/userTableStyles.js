// userTableStyles.js
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';

// Styled switch component
export const CustomSwitch = styled((props) => (
  <Switch
    color="default"
    inputProps={{ 'aria-label': 'status toggle' }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiSwitch-switchBase': {
    color: '#bbb',
    '&.Mui-checked': {
      color: '#76c7c0',
      '& + .MuiSwitch-track': {
        backgroundColor: '#76c7c0',
      },
    },
  },
  '& .MuiSwitch-track': {
    backgroundColor: '#e0e0e0',
  },
}));

export const styles = {
  paper: {
    maxWidth: '90%',
    width: '100%',
    margin: '20px auto',
    backgroundColor: '#f7f9fc',
  },
  box: {
    padding: '16px',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  tableHead: {
    backgroundColor: '#e0e0e0',
  },
  tableRow: {
    '&:hover': {
      backgroundColor: '#dfe6e9',
    },
  },
  activeRow: {
    backgroundColor: '#e8f5e9', // Light green for active
  },
  inactiveRow: {
    backgroundColor: '#ffebee', // Light red for inactive
  },
  chip: {
    margin: 0.5,
  },
  userName: (status) => ({
    color: status === 'inactive' ? '#d32f2f' : '#388e3c', // Red for inactive, green for active
    display: 'flex',
    alignItems: 'center',
  }),
  statusIcon: {
    fontSize: '16px',
    marginLeft: '14px',
    marginTop: '-1px',
  },
};
