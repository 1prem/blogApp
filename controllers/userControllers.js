import userModel from '../models/useModels.js';
import bcrypt from 'bcrypt';

//create Register user
export const registerController = async (req, res)=>{
  try{
   const{name, email, password} = req.body
   if(!name || !email || !password){
    return res.status(400).send({
        success: false,
        message: "Please fill all the fields"
    })
   }
   //Existing user
   const existinguser = await userModel.findOne({email})
   if(existinguser){
    return res.status(402).send({
        success: false,
        message: 'User Already exist'
    })
   }
   //HAshed password
const hashedPassword = await bcrypt.hash(password, 10);

//Save New user
const user = await new userModel({name, email, password:hashedPassword});
await user.save();
return res.status(201).send({
    success: true,
    message: "New user Created",
    user
})
  }catch(error){
    console.log("error");
    return res.status(500).send(({
        message: "Error in Register callback",
        success : false,
        error
    }))
  }
};

//get allUsers
export const getAllUsers = async(req, res)=>{
  try{
    const users = await userModel.find({});
    return res.status(200).send({
      success: true,
      message:"All user Data",
      UserCount : users.length,
      users,
    })
  }catch(error){
  return res.status(400).send({
    success: false, 
    message: "Error in get user data",
    error,
  });
  }

};

//logIn
export const logInController = async(req, res)=>{
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(401).send({
        success: false,
        message: "Please provide email or password",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "email is not registerd",
      });
    }
    //password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Invlid username or password",
      });
    }
    return res.status(200).send({
      success: true,
      messgae: "login successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Login Callcback",
      error,
    });
  }
};







