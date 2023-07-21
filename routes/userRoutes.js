import express from 'express';
import {getAllUsers, registerController, logInController} from '../controllers/userControllers.js';


//router object
const router = express.Router();

//Get all Users || GET
router.get("/all-users", getAllUsers);

//Create user || POST
router.post("/register", registerController);

//LOGIN ||POST
router.post("/login", logInController);

export default router;