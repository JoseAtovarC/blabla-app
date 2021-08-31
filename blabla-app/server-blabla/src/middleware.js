import { validateReg } from "./model.js"
import jwt from 'jsonwebtoken';
import { secret } from "../data/secrets.js";



export const isValidateReg=async (req,res,next)=>{
    console.log(req.body)
     const check = await validateReg(req.body.email)
     console.log(check)
     if(check){
        res.status(409);
     }else{
        next()     
}     
}


export const validateJWTAuth = (req, res, next) => {
   const headerAuth = req.get('Authorization'); 
   
   const jwtToken = headerAuth?.split(' ')[1]; 
  
   try{
       const jwtDecoded = jwt.verify(jwtToken, secret);
       req.email = jwtDecoded.user;
       next();
   }catch(err){
       console.log(err);
       res.status(401).send('Usuario sin token válido');
   }
   
}