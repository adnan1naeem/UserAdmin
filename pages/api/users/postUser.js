// pages/api/users/postUser.js
import dbConnect from '../../../lib/dbConnect'; // Adjust the path as necessary
import SampleUser from '../../../models/User'; // Adjust the import according to your model file structure

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;

  switch (method) {
    case 'POST':
      try {
        console.log(req.body); // Log the request body
        const user = await SampleUser.create(req.body); // Add new user
        res.status(201).json({ success: true, data: user });
      } catch (error) {
        console.error('Error creating user:', error);
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.status(400).json({ success: false, error: 'Method not allowed' });
      break;
  }
}
