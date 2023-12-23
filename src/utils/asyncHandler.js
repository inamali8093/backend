// const asyncHandler = ()=>{}
// const asyncHandler = (fn)=>{}
// const asyncHandler = (fn)=>{async ()=>{}}
// const asyncHandler = (fn)=> async ()=>{}


// it is a wrapper function used to interact with database everytime with async/await method
/*
const asyncHandler = (fn) => async (req,res,next)=>{
    try {
        await fn(req,res,next)
    } catch (error) {
        res.status(error.code || 500).json({
            success: false,
            message: error.message
        })
    }
}
*/


//promise method
const asyncHandler = (requestHandler)=>{
   return (req,res,next) => {
        Promise.resolve(requestHandler(req,res,next)).catch((err)=> next(err))
    }
}

export {asyncHandler}