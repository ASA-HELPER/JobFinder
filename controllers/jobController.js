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

export const updateJobController = async (req,resp,next)=>{
    const {id} = req.params;
    const {company,position} = req.body;
    // validation
    if(!company || !position)
    {
        next('Please provide all fields')
    }
    // find job
    const job = await jobsModel.findOne({_id:id});
    if(!job)
    {
        next(`No jobs found with this id ${id}`)
    }
    if(!req.user.userId === job.createdBy.toString())
    {
        next('You are not authorised to update this job.');
        return
    }
    const updateJob = await jobsModel.findOneAndUpdate({_id:id},req.body,{new:true,runValidators:true});
    resp.status(200).json({updateJob});
}

export const deleteJobController = async (req,resp,next)=>{
    const {id} = req.params;
    const job = await jobsModel.findOne({_id:id});
    if(!job)
    {
        next(`No jobs found with this id ${id}`)
    }
    if(!req.user.userId === job.createdBy.toString())
    {
        next('You are not authorised to delete this job.');
        return
    }
    await job.deleteOne();
    resp.status(200).json({
        message:"Success, Job deleted"
    })
}