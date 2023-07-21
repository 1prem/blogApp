import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {Box, TextField, Typography, Button} from '@mui/material';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import {authActions} from '../redux/store'
import toast from 'react-hot-toast';


const LogIn = () => {
  const data = { email: '', password:''};
  const[input, setInput] = useState(data);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange =(e)=>{
  setInput({...input, [e.target.name]:e.target.value})
}
const handleSubmit =async(e)=>{
  e.preventDefault();
  try{
  const {data} = await axios.post(`http://localhost:8000/api/v1/user/login`,{
    email: input.email,
    password: input.password
    });
    if(data.success){
      localStorage.setItem('userId', data?.user._id)
      dispatch(authActions.login()); 
      toast.success("User Login Successfully");
      navigate("/");
    }
  }catch(error){
    console.log(error);
  }
  setInput({
    email:'',
    password: ''
    
  });
}

  return (
    <div>
    <form onSubmit={handleSubmit} marginTop={6}>
          <Box maxWidth={450} display={'flex'} flexDirection={'column'} justifyContent={'center'} margin={'auto'} marginTop={10} 
      alignItems={'center'} boxShadow='11px 10px 20px grey' padding={4}>
      <Typography variant='h4' >LogIn</Typography>
    
      <TextField type="email" placeholder='Email' name= 'email' value={input.email} onChange={handleChange} padding={1} margin='normal' required/>
      <TextField type="password" placeholder='password' name= 'password' value={input.password} onChange={handleChange} padding={1} margin='normal' required />
  
      <Button type ="submit" variant="contained" sx={{borderRadisu:1, marginTop:2}} >Submit</Button>
      <Button type ="submit" sx={{borderRadisu:1, marginTop:2}} onClick={()=>navigate("/register")} >Not a user ? Please Register</Button>
    
      </Box>
      </form>

    </div>
  )
}

export default LogIn;
