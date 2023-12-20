import { Router } from "express";
import User from '../models/User';
import controller from "../controllers/users";

const router = Router();

// Example route to create a new user
router.post('/register', controller.addMember);

// Example route to create a new user
router.delete('/remove-user/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.send('User removed successfully!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating user');
  }
});

router.get('/all-users', async (req, res) => {
  try {
    const users = await User.find({});
    console.log(users);
    res.send(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating user');
  }
});

export default router;