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
    maxWidth: { xs: '100%', sm: '90%' },
    width: '100%',
    margin: '20px auto',
    backgroundColor: 'white',
    border: 'none',
    boxShadow: 'none'

  },
  paperTwo: {
    maxWidth: '95%',
    width: '100%',
    margin: '20px auto',
    backgroundColor: 'white',
    border: 'none',
    boxShadow: 'none',
    borderRadius: '30px',
    paddingBottom: '2%'

  },
  box: {
    padding: '16px',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  tableHead: {
    backgroundColor: '#F0F7FF',
  },
  tableRow: {
    '&:hover': {
      backgroundColor: '#dfe6e9',
    },
  },
  activeRow: {
    backgroundColor: 'white', // Light green for active
  },
  inactiveRow: {
    backgroundColor: 'white', // Light red for inactive
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
