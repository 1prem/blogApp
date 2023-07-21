import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { green } from '@mui/material/colors';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box }  from '@mui/material';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function BlogCard({id, title, description, image, name, isUser, time}) {
  
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/blog-details/${id}`);
  };

  const handleDelete = async()=>{
    try{
  const {data}= await axios.delete(`http://localhost:8000/api/v1/blog/delete-blog/${id}`)
  if(data?.success){
    toast.success("Blog Deleted");
    window.location.reload();
  }
    }catch(error){
      console.log(error)
    }
  }

  const CapName = (name)=>{
    if(!name){
      return " ";
    }
    const words = name.split(' ');
    if(words.length >0){
      return(
      words[0].charAt(0).toUpperCase() 
      //words[words.length - 1].charAt(0).toUpperCase()
      )
    }
    

 }
 const formatDate = (dateString) => {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', options);
};

  return (
    <Card sx={{ width: '50%', margin:'auto', marginTop: 12, padding:2, boxShadow:'5px 4px 10px grey' }}>
    {
      isUser && (
        <Box display= {'flex'}>
        <IconButton onClick= {handleEdit} sx={{marginLeft: "auto"}}>
        <ModeEditIcon/>
        </IconButton>
        <IconButton onClick={handleDelete}>
        <DeleteIcon/>
        </IconButton>
        
        </Box>
      )
    }
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: green[500] }} aria-label="recipe"> {CapName(name)}
           </Avatar>}
        action={ <IconButton aria-label="settings">
          </IconButton>
        }
        
        subheader={formatDate(time)}
      />
      
      <CardMedia component="img" height="220" width="220" image={image} alt="Loading image......" />
      <CardContent>
         
        <Typography variant="h6" color="text.secondary" sx={{fontWeight:'bold', fontSize:'18px', color:'green'}} >
          Blog Name : {title}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ fontSize:'16px', fontFamily:'sans-serif' }}>
         Description= {description}
        </Typography>
      </CardContent>
      
     
    </Card>
  );
}