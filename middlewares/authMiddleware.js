import JWT from "jsonwebtoken";

const userAuth = async (req,resp,next)=>{
    const authHeader = req.headers.authorization;
    // If did not get any authorization from request
    if(!authHeader || !authHeader.startsWith('Bearer')){
        next('Auth Failed')
    }
    // splitting the bearer and token by space into an array and then taking token from index 1.
    const token = authHeader.split(' ')[1];
    try {
        // verifying the token with the secret key created
        const payload = JWT.verify(token,process.env.JWT_SECRET);
        req.user = {userId:payload.userId};
        next();
    }
    catch (error) {
        next('Auth Failed')    
    }
}

export default userAuth;