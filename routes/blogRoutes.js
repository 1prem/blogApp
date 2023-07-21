import express from 'express';
import { createBlogController, deleteBlogController, getAllBlogController, singleBlogController, updateBlogController, userBlogController } from '../controllers/blogControllers.js';

const router = express.Router();

//Routes
//get all blogs
router.get("/all-blog", getAllBlogController);

//Create a blog
router.post("/create-blog", createBlogController);

//Update a blog
router.put("/update-blog/:id", updateBlogController);

//get single blog
router.get("/get-blog/:id", singleBlogController);

//delete blog
router.delete("/delete-blog/:id", deleteBlogController);

//Single blog
router.get("/user-blog/:id", userBlogController);

export default router;