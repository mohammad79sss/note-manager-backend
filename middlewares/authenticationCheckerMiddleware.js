function authenticationChecker(req,res,next){
    const token = req.headers['authorization'];
    console.log(token);
    if (!token){
        return res.status(401).json({message:"unauthorized"});
    }
    //other logic
    next();
}
export default authenticationChecker;