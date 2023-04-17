import jobsModel from "../models/jobsModel.js";

export const createJobController = async (req,resp,next) =>{
    const {company,position} = req.body;
    if(!company || !position)
    {
        next('Please provide all fields')
    }
    req.body.createdBy = req.user.userId;
    const job = await jobsModel.create(req.body)
    resp.status(201).json({job});
}

export const getAllJobsController = async (req,resp,next)=>{
    const jobs = await jobsModel.find({createdBy:req.user.userId});
    resp.status(200).json({
        totalJobs : jobs.length,
        jobs
    })
}