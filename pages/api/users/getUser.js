// pages/api/users/getUsers.js
import dbConnect from '../../../lib/dbConnect'; // Adjust the path as necessary
import User from '../../../model/User'; // Adjust the import according to your model file structure

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const users = await User.find({}); // Get all users
        res.status(200).json({ success: true, data: users });
      } catch (error) {
        console.error('Error fetching users:', error);
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.status(400).json({ success: false, error: 'Method not allowed' });
      break;
  }
}
