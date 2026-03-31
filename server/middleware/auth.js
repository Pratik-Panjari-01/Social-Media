export const protect = async (req,res,next)=>
{
    try
    {
        const {userId} = await req.auth();
        if(!userId)
        {
            return res.json({sucess:false, message:"not authenticated"})
        }
        next();
    }
    catch(error)
    {
        res.json({sucess:false, message:error.message})
    }
}