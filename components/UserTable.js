import React, { useState } from 'react';
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
  Snackbar, // Import Snackbar
  Alert, // Import Alert for styled notifications
} from '@mui/material';
import { updateUser } from '../context/api';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EditIcon from '@mui/icons-material/Edit'; // Import Edit icon
import { styles, CustomSwitch } from './userTableStyles';

const UserTable = ({ users, fetchData }) => {
  const [loadingId, setLoadingId] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null); // Track user being edited
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar state
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleStatusToggle = async (id, currentStatus) => {
    try {
      setLoadingId(id);
      const updatedStatus = !currentStatus ? 'active' : 'inactive';
      const endpoint = `update-user/${id}`;
      const body = { status: updatedStatus };
      await updateUser(endpoint, body);
      await fetchData();
    } catch (error) {
      console.error('Failed to update user status:', error);
    } finally {
      setLoadingId(null);
    }
  };

  const handleEditClick = (user) => {
    setCurrentUser(user);
    setEditModalOpen(true);
  };

  const handleModalClose = () => {
    setEditModalOpen(false);
    setCurrentUser(null); // Reset current user
  };

  const handleSave = async () => {
    if (currentUser) {
      const endpoint = `update-user/${currentUser.id}`;
      const body = { name: currentUser.name, email: currentUser.email };
      await updateUser(endpoint, body);
      await fetchData();
      handleSnackbarOpen('User updated successfully!'); // Show snackbar
      handleModalClose();
    }
  };

  const handleSnackbarOpen = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const filteredUsers = users.filter(user => {
    if (statusFilter === 'active') return user.status === 'active';
    if (statusFilter === 'inactive') return user.status === 'inactive';
    return true;
  });

  const statusOptions = [
    { label: 'All', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
  ];

  const tableHeaders = [
    { label: 'ID', key: 'id' },
    { label: 'Name', key: 'name' },
    { label: 'Email', key: 'email' },
    { label: 'Status', key: 'status' },
    { label: 'Edit', key: 'edit' }, // New Edit column
  ];

  return (
    <Paper sx={styles.paper}>
      <Box sx={styles.box}>
        <Typography variant="h6" component="div" sx={{ marginRight: 2 }}>
          Filter by Status:
        </Typography>
        {statusOptions.map(({ label, value }) => (
          <Chip
            key={value}
            label={label}
            onClick={() => setStatusFilter(value)}
            color={statusFilter === value ? 'primary' : 'default'}
            variant={statusFilter === value ? 'filled' : 'outlined'}
            sx={styles.chip}
          />
        ))}
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={styles.tableHead}>
              {tableHeaders.map(({ label }) => (
                <TableCell key={label}><strong>{label}</strong></TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map(user => (
              <TableRow
                key={user.id}
                sx={{
                  ...styles.tableRow,
                  ...(user.status === 'inactive' ? styles.inactiveRow : styles.activeRow),
                }}
              >
                <TableCell>{user.id}</TableCell>
                <TableCell>
                  <Typography variant="body2" sx={styles.userName(user.status)}>
                    {user.name}
                    {user.status === 'inactive' && (
                      <WarningIcon sx={{ ...styles.statusIcon, color: '#d32f2f' }} />
                    )}
                    {user.status === 'active' && (
                      <CheckCircleIcon sx={{ ...styles.statusIcon, color: '#388e3c' }} />
                    )}
                  </Typography>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {loadingId === user.id ? (
                    <CircularProgress size={24} />
                  ) : (
                    <>
                      <CustomSwitch
                        checked={user.status === 'active'}
                        onChange={() => handleStatusToggle(user.id, user.status === 'active')}
                      />
                      <Typography
                        variant="body2"
                        color={user.status === 'active' ? '#388e3c' : '#d32f2f'}
                      >
                        {user.status === 'active' ? 'Active' : 'Inactive'}
                      </Typography>
                    </>
                  )}
                </TableCell>
                <TableCell>
                  <EditIcon
                    onClick={() => handleEditClick(user)}
                    sx={{ cursor: 'pointer', color: 'primary.main' }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Modal */}
      <Dialog open={editModalOpen} onClose={handleModalClose}>
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
                value={currentUser.name}
                onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
              />
              <TextField
                margin="dense"
                label="Email"
                type="email"
                fullWidth
                variant="outlined"
                value={currentUser.email}
                onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for Notifications */}
      <Snackbar open={snackbarOpen} autoHideDuration={600} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'top', horizontal: 'center',  }} sx={{marginTop:'-4%'}}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default UserTable;
