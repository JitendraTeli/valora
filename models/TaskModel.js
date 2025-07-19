import mongoose from 'mongoose';


const taskSchema = new mongoose.Schema({
    name : String,
    to :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required: true
    },
    description : {
        type : String,
        required : true
    },
    status : {
        type : String,
        enum : ['pending','completed'],
        default : 'pending',
        required : true
    },
    date : {
        type : Date,
        default : Date.now()
    }
});



export default mongoose.model("Tasks",taskSchema);