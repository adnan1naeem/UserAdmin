// models/User.js
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure email addresses are unique
  },
  status: {
    type: String,
    enum: ['active', 'inactive'], // Specify the possible values
    default: 'active',
  },
}, { timestamps: true }); // Adds createdAt and updatedAt fields

export default mongoose.models.User || mongoose.model('User', UserSchema);
