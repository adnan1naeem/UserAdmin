// pages/api/users.js
import dbConnect from '../../lib/dbConnect';
import User from '../../model/User'; // Adjust the import according to your model file structure

export default async function handler(req, res) {
  try {
    await dbConnect();
    console.log("Database connected successfully"); // Log this in the server console
  } catch (error) {
    console.error("Error connecting to the database:", error);
    res.status(500).json({ success: false, message: "Database connection failed" });
    return; // Exit early if there’s a DB connection issue
  }

  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const users = await User.find({}); // Get all users
        res.status(200).json({ success: true, data: users });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case 'POST':
      try {
        console.log(req.body);
        const user = await User.create(req.body); // Add new user
        res.status(201).json({ success: true, data: user });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.status(400).json({ success: false, error: 'Method not allowed' });
      break;
  }
}
