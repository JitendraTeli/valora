import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = mongoose.Schema({
    name : {
        type: String,
        require: true
    },
    email: {
        type : String,
        require : true,
        unique : true,
    },
    password : {
        type: String,
        require: true
    },
    role : {
        type : String,
        enum : ["admin","manager","teamlead","employee"],
        default: "employee",
    }
})

userSchema.pre("save",async function(next) {
    if(this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(3);
        this.password = bcrypt.hash(this.password,salt);
        next();
    } catch(err) {
        console.log(err);
        next(err);
    }
});

userSchema.methods.comparePassword = async function(pass) {
    return await bcrypt.compare(pass,this.password);
}

export default mongoose.model("User",userSchema);

