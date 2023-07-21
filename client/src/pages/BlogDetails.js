import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


const BlogDetails = () => {

    const navigate = useNavigate();
    const[input, setInput] = useState({});

const[blog, setBlog] = useState();
const {id} = useParams();


  
const getBlogDetails = async()=>{
  try{
const {data} = axios.get(`http://localhost:8000/api/v1/blog/get-blog/${id}`)
if(data?.success){
    setBlog(data?.blog);
    setInput({
        title : data?.blog?.title,
        description : data?.blog?.description,
        image: data?.blog?.image
    })
} 
  }catch(error){
    console.log(error);
  }
}
useEffect(()=>{
getBlogDetails();
},[id]);
console.log(blog);


const handleChange = (e)=>{
  
    setInput({...input, [e.target.name]:e.target.value});
  }
 
      
    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
        const {data} = await axios.put(`http://localhost:8000/api/v1/blog/update-blog/${id}`, {
         title: input.title,
         description: input.description,
         image: input.image,
         user: id
        });
        if(data?.success){
         toast.success('Blog Updated successfully');
         navigate('/my-blog');
        }
        }catch(error){
         console.log(error);
        }
       }
   
  return (
    <div>
      <h2 className='heading'>Blog-Details</h2>
      <form onSubmit={handleSubmit}>
          
      <h2 className='head'> Update Post </h2>

    <label>Title </label>
    <input type= "text" name= 'title' value={input.title} onChange={handleChange}/><br/>

    <label>Description </label>
    <textarea type='message' className='message' name= 'description' value={input.description} onChange={handleChange} /><br/>

    <label htmlFor="image-url-input">Image URL:</label>
    <input type="text" name="image" value={input.image} onChange={handleChange} /><br/>

    {/*<label htmlFor="image-input">Image :</label>
  <input type="file"  name= "image" onChange={handleChange} /><br/>*/}

  <button type="submit" className='btn'>UpDate</button>
  

    </form>
    </div>
  )
}

export default BlogDetails;
