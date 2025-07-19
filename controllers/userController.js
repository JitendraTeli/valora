
import UserModel from '../models/UserModel.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config'



function createToken(user) {
    const payload = {
          id: user._id,
        name : user.name,
        email : user.email,
        role : user.role
    }
    return jwt.sign(payload,process.env.JWT_SECRET,{expiresIn: '1d'});
}

export const login = async (req,res) =>  {
    const {email,password} = req.body;
    if(!email) {
        return res.status(400).json({message : "Email is required"});
    }
    if(!password) {
        return res.status(400).json({message : "Password is required"});
    }

    // const ere = /\S+  /

    try {
        const user = await UserModel.findOne({email});
        
        if(!user) {
            return res.status(404).json({message: "Email does not exist please register"});
        }

        if(!user.comparePassword(password)) {
            return res.status(400).json({message : "wrong password"})
        }
        

        return res.status(200).json({
            token: createToken(user),
            user : {
                name : user.name,
                email : user.email,
                role : user.role
            }
        })
        
    } catch(err) {
        console.log(err);
        res.status(500).json({message: "Internal Server erro pleaser retry" } );
    }
}


export const register = async (req,res) => {
    const {name,email,password} = req.body;

    if(!name) {
        return res.status(400).json({message : "name is required"});
    }
    if(!email) {
        return res.status(400).json({message : "email is required"});
    }
    if(!password) {
        return res.status(400).json({message : "password is required"});
    }

    try {
        let user = await UserModel.findOne({email});
        
        if(user) {
            return res.status(400).json({msg:"a User already exist with that email"});
        }

        const newUser = await UserModel.create({name,email,password});

        return res.status(200).json({
            token : createToken(newUser),
            user : {
                name : newUser.name,
                email : newUser.email,
                password: newUser.password,
            }
        });

    } catch(err) {
        
        return res.status(500).json({error: err,message: "Internal Server error please retry"});
    }

}

export const userList = async (req,res) => {
    try {
        const users  = await UserModel.find({},'name email role password').lean();

        return res.status(200).json({users : users,by: req.user});
    } catch(err) {
        return res.status(500).json({message : "Internal Server Error ;( "  ,  by : req.user});   
    }
}

export const changePassword = async (req,res) => {
    const {pass,newPass} = req.body;
    const id = req.user.id;

    try {
        const user = await UserModel.findById(id);

        if(!user.comparePassword(pass)) {
            return res.status(300).json({message : "password did not match"});
        }
        
        user.password = newPass;
        await user.save();

        return res.status(200).json({message : "password has been changed"});
    } catch(err) {
        return res.status(500).json({message : "Internal Server Error ;( "});
    }
}

export const changeRole = async (req,res) => {
    const id = req.params.id;
    const {role} = req.body;

    
    if(!id) {
        return res.status(400).json({message : "id is missing ",id:id,role:role});
    }

    try {

        await UserModel.updateOne({_id :id},{$set : {role : role}});
        return res.status(200).json({message :"role updated successfully"});

    } catch(err) {
        console.log(err);
        res.status(500).json({message : "Internal server error",error : err});
    }
}
