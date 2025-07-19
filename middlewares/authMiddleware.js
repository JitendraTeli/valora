import jwt from 'jsonwebtoken'

export const protect = (req,res,next) => {

    const token = req.headers?.authorization.split(" ")[1];

    if(!token) {
        return res.status(401).json({message : "Token not found please login"});
    } 

    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    
    console.log("decoded",decoded)
    req.user = decoded;
    
    console.log("token",token);
    next();

}

export const authorize = (...roles) => (req,res,next) => {
    console.log(roles);

    if(!roles.includes(req.user.role)) {
        return res.status(200).json({message : "missing permission",roles,role:req.user.role});
    } 
    
    next();
}