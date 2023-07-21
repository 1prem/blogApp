import mongoose from "mongoose";
import blogModel from "../models/blogModel.js";
import userModel from "../models/useModels.js";

//Get all blogs
export const getAllBlogController = async(req, res)=>{
    try{
   const blogs = await blogModel.find({}).populate('user').sort({ createdAt: -1 });
   if(!blogs){
    return res.status(400).send({
        success: false,
        message: "Blog not found",
    })
   }
   return res.status(200).send({
    success: true,
    message: "All blog List",
    BlogCount: blogs.length,
    blogs,
   })
    }catch(error){
        return res.status(400).send({
            success : false,
            message: "Error to get all blogs",
            error,
        })
    }
};

//create blog
export const createBlogController = async(req, res)=>{
    try{
   const {title, description, image, user} = req.body;
   if(!title || !description || !image || !user){
    return res.status(400).send({
        success: false, 
        message: "Please provide all fields"
    });
   };
   const existingUser = await userModel.findById(user);
   if(!existingUser){
    return res.status(404).send({
        success: false,
        message : "Unable to find user"
    })
   }
   const newBlog = new blogModel({title, description, image, user});
   const session = await mongoose.startSession();
   session.startTransaction();
   await newBlog.save({session});
   existingUser.blogs.push(newBlog);
   await existingUser.save({session});
   await session.commitTransaction();
   
   await newBlog.save();
   return res.status(201).send({
    success: true,
    message: "Blog created Successfully",
    newBlog,

   })
    }catch(error){
        return res.status(400).send({
            success: false,
            message: "Error while creating blog",
            error,
        })
    }
};

//update blog
export const updateBlogController = async(req, res)=>{
    try{
   const {id} = req.params;
   const{title, description, image} = req.body;
   const blog = await blogModel.findByIdAndUpdate(id, {...req.body}, {new:true});
   return res.status(200).send({
    success: true,
    message: "Suucessfully updated a blog",
    blog
   })
    }catch(error){
return res. status(400).send({
    success : false,
    message: "Error in Updating blog",
    error,
})
    }
};

//Single blog
export const singleBlogController = async(req, res)=>{
    try{
        const {id} = req.params;
   const blog = await blogModel.findById(id);
   if(!blog){
    return res.status(404).send({
        success: false,
        message:"Blog not found with this id",
    });
   }
   return res.status(200).send({
    success: true,
    message: "Blog found",
    blog,
   })
    }catch(error){
        return res. status(400).send({
            success : false,
            message: "Error in getting a singld blog",
            error,
        })
    }
};

//delete blog
export const deleteBlogController = async(req, res)=>{
    try{
        const{id} = req.params;
    const blog =  await blogModel.findByIdAndDelete(id).populate("user");
    await blog.user.blogs.pull(blog);
    await blog.user.save();

    return res.status(200).send({
        success: true,
        message: "Blog successfully deleted"
    })
    }catch(error){
        return res.status(404).send({
            success:false,
            message: "Error while deleting",
            error,
        })
    }
};

//Single blog
export const userBlogController = async(req, res)=>{
    try {

        const userBlog = await userModel.findById(req.params.id).populate("blogs").sort({ createdAt: -1 });
    
        if (!userBlog) {
          return res.status(404).send({
            success: false,
            message: "blogs not found with this id",
          });
        }
        return res.status(200).send({
          success: true,
          message: "user blogs",
          userBlog,
        });
      } catch (error) {
        console.log(error);
        return res.status(400).send({
          success: false,
          message: "error in user blog",
          error,
        });
      }
    };
    //     const userId = req.body.userId; 
    //     console.log('user ==> '+userId);

    //     let blogsQuery = blogModel.find({});
    
    //     if (userId) {
    //       blogsQuery = blogsQuery.where('user').equals(userId);
    //       console.log('works');
    //     }
    
    //     const blogs = await blogsQuery.populate('user').sort({ createdAt: -1 });
    
    //     if (!blogs || blogs.length === 0) {
    //       return res.status(404).send({
    //         success: false,
    //         message: "Blogs not found",
    //       });
    //     }
    
    //     return res.status(200).send({
    //       success: true,
    //       message: "All blog List",
    //       BlogCount: blogs.length,
    //       blogs,
    //     });
    //   } catch (error) {
    //     return res.status(400).send({
    //       success: false,
    //       message: "Error retrieving blogs",
    //       error,
    //     });
    //   }

    // }

  






