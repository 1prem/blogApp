import React, { useState } from 'react';
import {AppBar, Box, Button, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import { authActions } from '../redux/store';
import toast from 'react-hot-toast';

const Header = () => {
  const[value, setValue] = useState(0);

  let isLogin = useSelector((state)=> state.isLogin)
  isLogin = isLogin || localStorage.getItem('userId');

  const dispatch = useDispatch();
 const navigate = useNavigate();

const handleLogOut = ()=>{
  try{
 dispatch(authActions.logout());
 toast.success("Successfully LogOut");
 navigate("/login");
 localStorage.clear();
  }catch(error){
    console.log(error);
  }
}

  return (
    <div>
      <AppBar sx={{bgcolor:'grey'}} >
      <Toolbar>
      <Typography variant='h4' > App</Typography>
     {
      isLogin && (
        <Box display={'flex'} marginLeft={'auto'}>
        <Tabs textColor='inherit' value={value}  onChange={(e, val)=>setValue(val)} >
        <Tab label = "Blogs" LinkComponent={Link} to ="/blogs" />
        <Tab label = "My Blog" LinkComponent={Link} to ="/my-blog" />
        <Tab label = "Create Blog" LinkComponent={Link} to ="/create-blog" />
        </Tabs>
        </Box>
      )
     }
      <Box dispaly ={"flex"} marginLeft={"auto"}  >
     
      { !isLogin && (
        <>
        <Button sx={{ margin: 1, color: "white" }} LinkComponent={Link} to="/login">Login</Button>
      <Button sx={{ margin: 1, color: "white" }} LinkComponent={Link} to="/register"> Register </Button>
        </>)

      }

      {
        isLogin && <Button sx={{margin: 1, color: "white"}} onClick={handleLogOut} >LogOut</Button>}
      </Box>
      </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header;
