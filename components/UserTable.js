import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Switch, CircularProgress } from '@mui/material';
import { updateUser } from '../context/api';

const UserTable = ({ users, fetchData }) => {
  const [loadingId, setLoadingId] = useState(null);

  const handleStatusToggle = async (id, currentStatus) => {
    try {
      setLoadingId(id);
      const updatedStatus = !currentStatus ? 'active' : 'inactive';
      const endpoint = `update-user/${id}`;
      const body = { "status": updatedStatus };
      await updateUser(endpoint, body);
      await fetchData();
    } catch (error) {
      console.error('Failed to update user status:', error);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <TableContainer component={Paper} sx={{ maxWidth: '90%', width: '100%' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>ID</strong></TableCell>
            <TableCell><strong>Name</strong></TableCell>
            <TableCell><strong>Email</strong></TableCell>
            <TableCell><strong>Status</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(user => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                {loadingId === user.id ? (
                  <CircularProgress size={24} />
                ) : (
                  <>
                    <Switch
                      checked={user.status === 'active'}
                      onChange={() => handleStatusToggle(user.id, user.status === 'active')}
                      color="success"
                      inputProps={{ 'aria-label': 'status toggle' }}
                    />
                    {user.status === 'active' ? 'Active' : 'Inactive'}
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
