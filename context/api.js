const API_TOKEN = process.env.REACT_APP_API_TOKEN; 
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
export const getRequest = async (endpoint) => {
  try {
    console.log(process.env.REACT_APP_API_URL)
    const response = await fetch(`${"http://192.168.1.110:4000/api/admin/sampleUser/"}${endpoint}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
export const updateUser = async (endpoint, body) => {
    try {
        console.log("userData"+JSON?.stringify(body))
        const response = await fetch(`${"http://192.168.1.110:4000/api/admin/sampleUser/"}${endpoint}`, {
            method: 'PUT', 
            headers: {
                'Authorization': `Bearer ${API_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON?.stringify(body),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to update user');
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};
export const postRequest = async (endpoint, body) => {
  try {
    const response = await fetch(`${API_ENDPOINT}${endpoint}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body), // Convert body object to JSON
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error('Error posting data:', error);
    throw error; // Rethrow the error for further handling
  }
};
