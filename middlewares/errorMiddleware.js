// Error middleware || NEXT Function
const errorMiddleware = (err,req,resp,next)=>{
    console.log(err)
    resp.status(500).send({
        success:false,
        message:"Something went wrong",
        err,
    })
}

export default errorMiddleware;