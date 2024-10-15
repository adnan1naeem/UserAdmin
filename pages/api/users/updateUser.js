// pages/api/users/updateUser.js
import dbConnect from '../../../lib/dbConnect';
import SampleUser from '../../../models/User'; // Adjust the import according to your model file structure

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;

  switch (method) {
    case 'PUT':
      try {
        const { id, ...updateFields } = req.body; // Destructure id and gather all other fields

        if (!id) {
          return res.status(400).json({ success: false, error: 'User ID is required' });
        }

        const user = await SampleUser.findByIdAndUpdate(
          id,
          updateFields,
          { new: true } // Return the updated document
        );

        if (!user) {
          return res.status(404).json({ success: false, error: 'User not found' });
        }

        res.status(200).json({ success: true, data: user });
      } catch (error) {
        console.error('Error updating user:', error);
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.status(400).json({ success: false, error: 'Method not allowed' });
      break;
  }
}
