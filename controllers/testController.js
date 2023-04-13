export const testPostConstroller = (req,resp)=>{
    const {name} = req.body;
    resp.status(200).send(`Your name is ${name}`)
}