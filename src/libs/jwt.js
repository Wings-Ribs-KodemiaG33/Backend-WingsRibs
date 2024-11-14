import jkw from "jsonwebtoken"
import {TOKEN_SECRET} from "../secret.js"

export function createAccessToken(payload){
  return new Promise((resolve, reject) =>{
    if (!payload || Object.keys(payload).length === 0) {
      return reject(new Error("El payload es vacío o inválido"));
    }
    jkw.sign(payload, TOKEN_SECRET, { expiresIn: "2h" }, (err, token) => {
    if(err)reject(err);//si hay error muestrame el error, si no muestrame el token
    if (!token || token.trim() === "") {
      return reject(new Error("El token generado es vacío o inválido"));
    }

    resolve(token)
    });
  });
}