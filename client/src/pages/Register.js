import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {Box, TextField, Typography, Button} from '@mui/material';
import axios from 'axios';
import toast from 'react-hot-toast';

const Register = () => {
  const data = {name:'', email: '', password:''};
  const[input, setInput] = useState(data);

  const navigate = useNavigate();

  const handleChange =(e)=>{
  setInput({...input, [e.target.name]:e.target.value})
}
const handleSubmit =async(e)=>{
  e.preventDefault();
  try{
  const {data} = await axios.post(`http://localhost:8000/api/v1/user/register`,{
    name:input.name,
    email: input.email,
    password: input.password
    });
    if(data.success){
      toast.success("User Registerd Successfully");
      navigate("/login");
    }
  }catch(error){
    console.log(error);
  }
  setInput({
    name:'',
    email:'',
    password: ''
    
  });
}

  return (
    <div>
    <form onSubmit={handleSubmit}>
          <Box maxWidth={450} display={'flex'} flexDirection={'column'} justifyContent={'center'} margin={'auto'} marginTop={10} 
      alignItems={'center'} boxShadow='11px 10px 20px grey' padding={4}>
      <Typography variant='h4' >Register</Typography>
    
      <TextField type="text" placeholder='name' name= 'name' value={input.name} padding={1} onChange={handleChange} margin='normal' required/>
      <TextField type="email" placeholder='Email' name= 'email' value={input.email} onChange={handleChange} padding={1} margin='normal' required/>
      <TextField type="password" placeholder='password' name= 'password' value={input.password} onChange={handleChange} padding={1} margin='normal' required />
  
      <Button type ="submit" variant="contained" sx={{borderRadisu:1, marginTop:2}} >Submit</Button>
      <Button type ="submit" sx={{borderRadisu:1, marginTop:2}} onClick={()=>navigate("/login")} >Allready user ? Please LogIn</Button>
    
      </Box>
      </form>

    </div>
  )
}

export default Register;
