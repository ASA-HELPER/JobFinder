import userModel from "../models/userModel.js";

export const registerController = async (req,resp,next)=>{
    const {name,email,password} = req.body;
    // validate
    if(!name)
    {
        return resp.status(400).send({
            success:false,
            message:'Please provide name'
        });
    }
    if(!email)
    {
        next('Please provide email');
    }
    if(!password)
    {
        return resp.status(400).send({
            success:false,
            message:'Please provide password'
        });
    }
    const existingUser = await userModel.findOne({email})
    if(existingUser)
    {
        return resp.status(200).send(
            {
                success:false,
                message:'Email already register please login'
            }
        )
    }
    const user = await userModel.create({name,email,password});
    // Token
    const token = user.createJWT()
    resp.status(201).send({
        success:true,
        message:"User created successfully",
        user:{
            name:user.name,
            lastName:user.lastName,
            email:user.email,
            location:user.location,
        },
        token,
    })
}

export const loginController = async (req,resp,next) =>{
    const {email,password} = req.body;
    // validation
    if(!email || !password)
    {
        next('Please provide all fields')
    }
    // getting user data while removing password
    const user = await userModel.findOne({email}).select("+password");
    if(!user)
    {
        next('Invalid username or password');
    }
    // Compare password
    const isMatch = await user.comparePassword(password);
    if(!isMatch)
    {
        next('Invalid username or password')
    }
    user.password = undefined;
    const token = user.createJWT();
    resp.status(200).json({
        success:true,
        message:'Login Successfully',
        user,
        token
    })
}