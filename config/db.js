import mongoose from 'mongoose';
import colors from 'colors';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async ()=>{
try{
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected to mongodb database ${mongoose.connection.host}`.bgCyan.white);

}catch(err){
    console.log(`Mongo connection Error ${err}`.bgRed.white);
}
} 
export default connectDB;

