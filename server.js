import express from 'express';
import 'dotenv/config'
import mongoose from 'mongoose';
import cors from 'cors'
import taskRouter from './routers/taskRouter.js'
import userRouter from './routers/userRouter.js'


//import bodyParser from 'body-parser';

// ;(async()=>{
//     try {
//         await mongoose.connect(process.env.MONGOURI)
//         console.log("database is succesffuly connected")
//     } catch(err) {
//         console.log(err);
//     }
// })()

mongoose.connect(process.env.MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected')).catch(err => console.log(err));



const app = express();
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use(cors())
//app.use(bodyParser);

app.use((req,res,next)=> {
    console.log("getting requst at ",req.method,"  req :",req.body, " params ",req?.params);
    next();
})

app.get('/',(req,res) => {
    res.send("hello wassup");
})


app.use('/api/auth',userRouter);
app.use('/api',taskRouter);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("server is listening on ",PORT);
})