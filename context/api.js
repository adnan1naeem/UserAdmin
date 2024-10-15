// context/api.js
export const getRequest1 = async () => {
  try {
    const response = await fetch('/api/users'); // Call the GET endpoint
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Something went wrong');
    }

    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const postRequest = async (userData) => {
  try {
    const response = await fetch('/api/users/postUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Something went wrong');
    }

    return data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};
export const putRequest = async (userId, updateFields) => {
  try {
    const response = await fetch('/api/users/updateUser', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: userId, ...updateFields }), // Spread the updateFields object
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Something went wrong');
    }

    return data;
  } catch (error) {
    console.error('Error updating data:', error);
    throw error;
  }
};