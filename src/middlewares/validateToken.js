import jwt from "jsonwebtoken"
import {TOKEN_SECRET} from "../secret.js"

export const authRequired = (req, res, next) =>{
  //const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  const token = req.headers.authorization?.split(' ')[1] || req.cookies.token;
  
  if(!token)return res.status(401).json({message: "NO hay token, sin acceso"});
  jwt.verify(token, TOKEN_SECRET, (err, decoded)=>{
    if(err) return res.status(403).json({message: "token invalido"});
    req.decoded = decoded;
    
    next();
  })

}