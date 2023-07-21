import React, {useState, useEffect} from 'react';
import axios from 'axios';
import BlogCard from '../Components/BlogCard';


const Blogs = () => {
const[blogs, setBlogs] = useState([]);


const getAllBlogs = async()=>{
try{
const {data} = await axios.get("http://localhost:8000/api/v1/blog/all-blog");
if(data?.success){
setBlogs(data?.blogs)
}
}catch(error){
  console.log(error);
};
};

useEffect(()=>{
getAllBlogs();

},[]);

  return (
    
    <div>
    {blogs && 
      blogs.map((blog, i)=><BlogCard
      key = {i}
      id = {blog?._id}
      isUser = {localStorage.getItem("usrId") === blog?.user?._id}
      title = {blog?.title}
      name = {blog?.user?.name}
      description = {blog?.description}
      image= {blog?.image}
      time = {blog?.createdAt}
      />)
    }
    
    </div>
  )
}

export default Blogs;
