import React, { useState } from 'react'; // Import React and useState hook from React
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  Box,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Snackbar, // Import Snackbar for displaying notifications
  Alert, // Import Alert for styled notifications
} from '@mui/material';
import { putRequest } from '../context/api'; // Import API functions
import WarningIcon from '@mui/icons-material/Warning'; // Import warning icon for inactive status
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // Import check icon for active status
import EditIcon from '@mui/icons-material/Edit'; // Import Edit icon for editing user details
import { styles, CustomSwitch } from './userTableStyles'; // Import custom styles and switch component

const UserTable = ({ users, fetchData }) => {
  // State to manage loading status for user updates
  const [loadingId, setLoadingId] = useState(null);
  // State to manage filter for user status
  const [statusFilter, setStatusFilter] = useState('all');
  // State to manage edit modal visibility
  const [editModalOpen, setEditModalOpen] = useState(false);
  // State to track the user currently being edited
  const [currentUser, setCurrentUser] = useState(null);
  // State to control snackbar visibility and message
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Function to handle status toggle for a user
  const handleStatusToggle = async (id, currentStatus) => {
    try {
      setLoadingId(id); // Set loading ID to show loading indicator
      const updatedStatus = currentStatus === 'active' ? 'inactive' : 'active'; // Toggle status
      const body = { status: updatedStatus }; // Prepare the body for update
      await putRequest(id, body); // Call the putRequest function with the user ID and updated status
      await fetchData(); // Fetch updated user data
    } catch (error) {
      console.error('Failed to update user status:', error); // Log any errors that occur
    } finally {
      setLoadingId(null); // Reset loading ID
    }
  };

  // Function to open the edit modal for a user
  const handleEditClick = (user) => {
    setCurrentUser(user); // Set the current user to be edited
    setEditModalOpen(true); // Open the edit modal
  };

  // Function to close the edit modal
  const handleModalClose = () => {
    setEditModalOpen(false); // Close the modal
    setCurrentUser(null); // Reset current user
  };

  // Function to save the edited user details
  const handleSave = async () => {
    if (currentUser) {
      const body = { name: currentUser.name, email: currentUser.email }; // Prepare updated user data
      await putRequest(currentUser?._id, body); // Update user details
      await fetchData(); // Fetch updated user data
      handleSnackbarOpen('User updated successfully!'); // Show snackbar notification
      handleModalClose(); // Close the modal
    }
  };

  // Function to open the snackbar with a message
  const handleSnackbarOpen = (message) => {
    setSnackbarMessage(message); // Set the snackbar message
    setSnackbarOpen(true); // Open the snackbar
  };

  // Function to close the snackbar
  const handleSnackbarClose = () => {
    setSnackbarOpen(false); // Close the snackbar
  };

  // Filter users based on the selected status
  const filteredUsers = users.filter(user => {
    if (statusFilter === 'active') return user.status === 'active';
    if (statusFilter === 'inactive') return user.status === 'inactive';
    return true; // Return all users if 'all' is selected
  });

  // Options for the status filter
  const statusOptions = [
    { label: 'All', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
  ];

  // Define the table headers
  const tableHeaders = [
    { label: 'ID', key: 'id' },
    { label: 'Name', key: 'name' },
    { label: 'Email', key: 'email' },
    { label: 'Status', key: 'status' },
    { label: 'Edit', key: 'edit' }, // New Edit column
  ];

  return (
    <Paper sx={styles.paper}> {/* Main container for the table */}
      <Paper sx={styles.paperTwo}> {/* Secondary paper for styling */}
        <Box sx={styles.box}> {/* Box for status filter */}
          <Typography variant="h6" component="div" sx={{ marginRight: 2 }}>
            Filter by Status:
          </Typography>
          {statusOptions.map(({ label, value }) => (
            <Chip
              key={value} // Unique key for each Chip
              label={label}
              onClick={() => setStatusFilter(value)} // Update filter on click
              color={statusFilter === value ? 'primary' : 'default'} // Change color based on active filter
              variant={statusFilter === value ? 'filled' : 'outlined'} // Change variant based on active filter
              sx={styles.chip} // Apply custom styles
            />
          ))}
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={styles.tableHead}> {/* Table header */}
                {tableHeaders.map(({ label }) => (
                  <TableCell key={label}><strong>{label}</strong></TableCell> // Render table header cells
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map(user => ( // Map through filtered users
                <TableRow
                  key={user.id} // Unique key for each row
                  sx={{
                    ...styles.tableRow, // Apply base styles
                    ...(user.status === 'inactive' ? styles.inactiveRow : styles.activeRow), // Conditional styling based on status
                  }}
                >
                  <TableCell>{user.id}</TableCell> {/* User ID */}
                  <TableCell>
                    <Typography variant="body2" sx={styles.userName(user.status)}> {/* User Name with status indicator */}
                      {user.name}
                      {user.status === 'inactive' && (
                        <WarningIcon sx={{ ...styles.statusIcon, color: '#d32f2f' }} /> // Show warning icon if inactive
                      )}
                      {user.status === 'active' && (
                        <CheckCircleIcon sx={{ ...styles.statusIcon, color: '#388e3c' }} /> // Show check icon if active
                      )}
                    </Typography>
                  </TableCell>
                  <TableCell>{user.email}</TableCell> {/* User Email */}
                  <TableCell>
                    {loadingId === user.id ? ( // Show loading indicator if updating status
                      <CircularProgress size={24} />
                    ) : (
                      <>
                        <CustomSwitch
                          checked={user.status === 'active'} // Determine switch state based on user status
                          onChange={() => handleStatusToggle(user._id, user.status)} // Handle status toggle
                        />
                        <Typography
                          variant="body2"
                          color={user.status === 'active' ? '#388e3c' : '#d32f2f'} // Color based on user status
                        >
                          {user.status === 'active' ? 'Active' : 'Inactive'}
                        </Typography>
                      </>
                    )}
                  </TableCell>
                  <TableCell>
                    <EditIcon
                      onClick={() => handleEditClick(user)} // Handle edit icon click
                      sx={{ cursor: 'pointer', color: 'primary.main' }} // Styling for edit icon
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Edit Modal */}
        <Dialog open={editModalOpen} onClose={handleModalClose} >
          <DialogTitle>Edit User</DialogTitle>
          <DialogContent>
            {currentUser && (
              <>
                <TextField
                  autoFocus
                  margin="dense"
                  label="Name"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={currentUser.name} // Bind input value to current user's name
                  onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })} // Update name on change
                />
                <TextField
                  margin="dense"
                  label="Email"
                  type="email"
                  fullWidth
                  variant="outlined"
                  value={currentUser.email} // Bind input value to current user's email
                  onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })} // Update email on change
                />
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleModalClose} color="primary">Cancel</Button>
            <Button onClick={handleSave} color="primary">Save</Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar for Notifications */}
       
      </Paper>
    </Paper>
  );
};

export default UserTable; // Export the UserTable component
