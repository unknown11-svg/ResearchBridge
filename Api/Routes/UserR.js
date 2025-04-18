import express from 'express';
import {
  deleteUserById,
  getAllUsers,
  getUserById,
  modifyUser,
  createUser,
  loginUser, 
} from '../Controller/UserC.js';
import User from '../Models/User.js';

const router = express.Router();


router.get('/', async (req, res) => {
    const users = await getAllUsers();
    res.status(200).json(users); 

});


router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await getUserById(id);
    if (user) {
      res.status(200).json(user); 
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
});

router.get('/:userId/profile-picture', async (req, res) => {
  try {
      const user = await User.findById(req.params.userId);

      if (!user || !user.profilePicture || !user.profilePicture.data) {
          // If no picture is found, send the default image
          return res.sendFile(path.join(__dirname, '../Icons/default-profile.png')); 
      }

      // Set the content type and send the image data
      res.set('Content-Type', user.profilePicture.contentType);
      res.send(user.profilePicture.data);
  } catch (error) {
    console.log(error);
      res.status(500).json({ message: 'Error fetching profile picture', error: error.message });
  }
});


router.post('/', async (req, res) => {
  const { role, fname, lname,contact,department,researcharea,academicrole,researchExperience } = req.body;

  // Prepare the payload for user creation
  const payload = {
    role,
    fname,
    lname,
    contact,
    department,
    researcharea,
    academicrole,
    researchExperience,
  };

  try {
    const user = await createUser(payload); 
    res.status(201).json(user); 
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
});



router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const payload = req.body;
    try {
      const user = await modifyUser(id, payload);
  
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ message: 'Error updating user', error: error.message });
    }
  });


router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const { user, token, role} = await loginUser(email, password);
    res.status(200).json({ userId: user._id, token, role});
  } catch (error) {
    res.status(401).json({ message: 'Login failed', error: error.message });
  }
});


router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deleteUserById(id);
    if (result) {
      res.status(200).json({ message: 'User deleted successfully' }); 
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
});

export default router;
