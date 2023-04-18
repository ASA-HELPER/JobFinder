import jobsModel from "../models/jobsModel.js";
import mongoose from "mongoose";
import moment from "moment";

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

export const jobStatsController = async (req,resp)=>{
    const stats = await jobsModel.aggregate([
        // search by user jobs
        {
            $match:{
                createdBy:new mongoose.Types.ObjectId(req.user.userId),
            },
        },
        {
            $group:{
                _id:'$status',count:{$sum:1}
            }
        }
    ])
    //default stats
    const defaultStats = {
        pending: stats.pending || 0,
        reject: stats.reject || 0,
        interview: stats.interview || 0,
    };

    //monthly yearly stats
    let monthlyApplication = await jobsModel.aggregate([
        {
            $match: {
                createdBy: new mongoose.Types.ObjectId(req.user.userId),
            },
        },
        {
            $group: {
                _id: {
                    year: { $year: "$createdAt" },
                    month: { $month: "$createdAt" },
                },
                count: {
                    $sum: 1,
                },
            },
        },
    ]);
    monthlyApplication = monthlyApplication.map((item) => {
            const {
                _id: { year, month },
                count,
            } = item;
            const date = moment()
                .month(month - 1)
                .year(year)
                .format("MMM Y");
            return { date, count };
        }
    ).reverse();

    resp.status(200).json({totalJob:stats.length ,stats,defaultStats,monthlyApplication});
}