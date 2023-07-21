import React, {useState} from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import  {useNavigate}  from 'react-router-dom';


const CreateBlog = () => {
  const[input, setInput] = useState({
    title:'',
    description: '',
    image: ""
  });
 const id = localStorage.getItem('userId');

const navigate = useNavigate();

 
const handleChange = (e)=>{
    setInput({...input, [e.target.name]:e.target.value});
  }
 


  const handleSubmit = async(e)=>{
   e.preventDefault();
   try{;

   const {data} = await axios.post(`http://localhost:8000/api/v1/blog/create-blog`, {
         title: input.title,
        description: input.description,
        image: input.image,
        user: id,
   });
   if(data?.success){
    toast.success('Blog created successfully');
    navigate('/my-blog');
   }
   }catch(error){
    console.log("create Blog Error", error);
   }
  
  }

  return (
    <div>
    <div className='createform'> 
      <form onSubmit={handleSubmit}>
          
        <h2 className='head'> Create Post </h2>

        <label>Title </label>
        <input type= "text" name= 'title' value={input.title} onChange={handleChange} required/><br/>
  
        <label>Description </label>
        <textarea type='message' className='message' name= 'description' value={input.description} onChange={handleChange} required/><br/>
  
        <label htmlFor="image-url-input">Image URL:</label>
    <input type="text" name="image" value={input.image} onChange={handleChange} /><br/>
  
    {/*<label htmlFor="image-input">Image :</label>
  <input type="file"  name= "image" onChange={handleChange} /><br/>*/}
  
  
      <button type="submit" className='btn'>Submit</button>
    

      </form> 
      </div>

    </div>
  )
}

export default CreateBlog;
