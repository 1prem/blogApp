import React,{useState, useEffect} from 'react';
import axios from 'axios';
import BlogCard from '../Components/BlogCard';


const UserBlogs = () => {

const[blogs, setBlogs] = useState([]);

const getUserBlogs = async()=>{
    try{
  const id = localStorage.getItem('userId');
  const {data} = await axios.get(`http://localhost:8000/api/v1/blog/user-blog/${id}`);
  //console.log('data ==> '+JSON.stringify(data));
  if(data?.success){
    setBlogs(data?.userBlog?.blogs);
  } 
    }catch(error){
        console.log(error);
    }
}

useEffect(()=>{
 getUserBlogs();
},[]);


  return (
    <div>
      <h2 className='head'>User Blogs</h2>
      {blogs &&
        blogs.length > 0 ? (
        blogs.map((blog)=><BlogCard
        id ={blog._id}
        isUser = {true}
        title = {blog.title}
        description = {blog.description}
        image= {blog.image}
        name = {blog.name}
        time = {blog.createdAt}
        />)
      ): (<h2>OopS...! You have not Created any Blog</h2>)
        
      }

    </div>
  )
}

export default UserBlogs;

