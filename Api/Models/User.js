import bcrypt from 'bcrypt';
import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ['Researcher', 'Reviewer','Admin'],
    required: false,
  },
  // email: {
  //   type: String,
  //   required: [true, "Please enter email"],
  //   unique: true,
  //   match: [
  //     /^[A-Za-z0-9._%+-]+@students\.wits\.ac\.za$/,
  //     'Please use a valid student email address (e.g., 235445@students.wits.ac.za)',
  //   ],
  // },
  // password: {
  //   type: String,
  //   required: false,
  //   validate: {
  //     validator: function (value) {
  //       if (!value) return true;
  //       // Ensure password meets the following criteria:
  //       // - At least 8 characters long
  //       // - Contains at least one lowercase letter
  //       // - Contains at least one uppercase letter
  //       // - Contains at least one number
  //       // - Contains at least one special character
  //       return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/.test(value);
  //     },
  //     message:
  //       'Password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, one number, and one special character',
  //   },
  // },
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  academicrole: {
    type: String,
    enum: ['Student', 'Lecturer','Academic Researcher'],
    required: false,
  },
  contact: {
    type: String,
    required: false,
  },
  department: {
    type: String,
    required: false,
  },
  researcharea: {
    type: String,
    required: false,
  },
  researchExperience: {
    type: String,
    enum: ['Bachelor', 'Honours','Masters','PhD'],
    required: false,
  },
  
  status: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true }); 

// Middleware to hash password before saving
userSchema.pre('save', async function (next) {
  if (this.isModified('password')&& this.password) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});


const User = mongoose.model('User', userSchema);
export default User;
