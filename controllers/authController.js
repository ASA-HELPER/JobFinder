import userModel from "../models/userModel.js";

export const registerController = async (req,resp)=>{
    try {
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
            return resp.status(400).send({
                success:false,
                message:'Please provide email'
            });
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
        resp.status(201).send({
            success:true,
            message:"User created successfully",
            user
        })

    } catch (error) {
        console.log(error)
        resp.status(400).send({
            message:'Error in register controller',
            success:false,
            error
        })
    }
}