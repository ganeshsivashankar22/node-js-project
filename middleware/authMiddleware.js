const jwt=require("jsonwebtoken");

module.exports=function(req,res,next)
{
const token=req.header("Authorization");
if(!token)
{
return res.status(401).json({message:"token invalid"});
try
{
const verified=jwt.verify(token,"ganesh22");
req.user=verified;
next();
}
catch
{
return res.status(401).json({message:"invalid token"});
}
}
}
