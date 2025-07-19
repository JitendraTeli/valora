import TaskModel from "../models/TaskModel.js";

//post
export const makeTask = async (req,res) => {
    const {name,description,to} = req.body;

    if(!name) {
        return res.status(400).json({message : "name cannot be empty"})
    }
    if(!description) {
        return res.status(400).json({message : "description cannot be empty"})
    }
    if(!to) {
        return res.status(400).json({message : "assigendTo cannot be empty"})
    }


    try {
        const task = await TaskModel.create({name,description,to});

        return res.status(200).json({message : "task Assigend to user"});
    } catch(err) {
        console.log(err);

        return res.status(500).json({message: "Internal server error"});
    }

}

//get
export const taskList = async (req,res) => {
    try {
        const tasks = await TaskModel.find({}).populate('to');

        console.log("taskList",tasks);

        return res.status(200).json({tasks : tasks});
    } catch(err) {
        console.log(err);

        return res.status(500).json({message: "Internal server error"});
    }
}

//delete
export const deleteTask = async (req,res) => {
    const id = req.params.id;

    try {
        const deadTask =await TaskModel.findByIdAndDelete(id);

        if(!deadTask) {
            return res.status(400).json({message : "task not found"});
        }

        return res.status(200).json({message : "Task deleted success"});
    } catch(err) {
        console.log(err);

        return res.status(500).json({message: "Internal server error"});
    }
} 

//put
export const updateStatus = async (req,res) => {
    const {id,status} = req.body;
    
    if(!id || !status) {
        res.status(200).json({message : "missing parameters"})
    }

    try {
        const task = await TaskModel.findById(id);
        task.status = status;

        await task.save();
    } catch(err) {
        console.log(err);
        res.status(500).json({message : "internal server error"});
    }
}

export const myTasks = async (req,res) => {
    const id = req.user.id;
    console.log(id,"requesting for tasks");
    
    try {
        const tasks =await TaskModel.find({to:id}).lean();

        console.log(tasks);
        res.status(200).json({tasks : tasks});

    } catch(err) {
        console.log(err);
        res.status(500).json({message : "internal server error"});
    }
}



