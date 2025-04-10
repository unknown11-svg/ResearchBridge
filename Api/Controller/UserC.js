import User from "../Models/User.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const createUser = async (payload, file) => {
  try {
    const newUser = new User(payload);
    const savedUser = await newUser.save();

    const token = jwt.sign(
      { id: savedUser._id, email: savedUser.email },
      process.env.JWT_SECRET,
      { expiresIn: '100h' }
    );
    // Return the user and token
    return { user: savedUser, token };
  } catch (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }
};

export const loginUser = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET, 
      { expiresIn: '100h' }
    );
    return { user, token, role: user.role};  
  } catch (error) {
    throw new Error(`Error logging in user: ${error.message}`);
  }
};


export const getAllUsers = async () => {
    const users = await User.find(); 
    return users;  
};


export const getUserById = async (id) => {
  try {
    const user = await User.findById(id); 
    if (!user) {
      throw new Error('User not found');
    }
    return user; 
  } catch (error) {
    throw new Error(`Error fetching user: ${error.message}`);
  }
};


export const modifyUser = async (id, payload, file) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    // Update other fields from payload
    Object.keys(payload).forEach((key) => {
      user[key] = payload[key];
    });

    // Save the updated user
    const updatedUser = await user.save();
    return updatedUser;
  } catch (error) {
    throw new Error(`Error updating user: ${error.message}`);
  }
};



export const deleteUserById = async (id) => {
  try {
    const result = await User.findByIdAndDelete(id); 
    if (!result) {
      throw new Error('User not found');
    }
    return result; 
  } catch (error) {
    throw new Error(`Error deleting user: ${error.message}`);
  }
};
