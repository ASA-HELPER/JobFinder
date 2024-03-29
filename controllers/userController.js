import userModel from "../models/userModel.js";

export const getAllUsers = async (req, res, next) => {
    const users = await userModel.find();
    res.status(200).json({
      message: "Users retrieved successfully",
      users,
    });
};

export const updateUserController = async (req,resp,next)=>{
    const {name,email,lastName,location} = req.body;
    if(!name || !email || !lastName || !location)
    {
        next('Please provide all fields')
    }
    const user = await userModel.findOne({_id:req.user.userId})
    user.name = name;
    user.lastName = lastName;
    user.email = email;
    user.location = location
    await user.save();
    const token = user.createJWT();
    resp.status(200).json({
        user,
        token
    })
}