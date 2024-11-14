import jwt from "jsonwebtoken"
import {TOKEN_SECRET} from "../secret.js"
import Usuario from "../models/user.model.js"
import bcrypt from "bcryptjs"
import {createAccessToken} from "../libs/jwt.js"
import OTP from "../models/userOTP.model.js"
import app from "../app.js"
import { number } from "zod"

/*app.post("/google-auth", async (req, res) => {
    const { credential, client_id } = req.body;
    try {
        const ticket = await client.verifyIdToken({
        idToken: credential,
        audience: client_id,
    });
        const payload = ticket.getPayload();
        const userid = payload['sub'];
        res.status(200).json({ payload });
    } catch (err) {
        
    }
});*/

//app.listen(PORT, () => console.log(`Server running on PORT : ${PORT}`));


export const register =  async (req, res) => {
    const {email, password, username, role = 'user'} = req.body;

    try{
        const userFound = await Usuario.findOne({email})
        if(userFound) return res.status(400).json(["El correo ya está en uso"])

        const passwordHash = await bcrypt.hash(password, 10)//guardar variable de encriptado de contraseña
        //verificacion OTP de correo
       
        const photo = req.file ? req.file.filename : null;
        const newUser = new Usuario({
            username,
            email,
            password: passwordHash,
            roles: [role],
            photo,
            authSource: 'google',
            //verified: false,
        });
        //enviar vaidacion por emai
 
        //guardar usuario en mondodb
         const userSaved = await newUser.save();
          //guardas el usuario
          //userSaved.then((result) =>{
          //sendVerificationEmail(result, res)
         //})
         
         
         const token = await createAccessToken({id:userSaved._id}); //creas el token
         
         if (!token) {
            return res.status(500).json({ message: "Error al generar el token" });
          }

         res
            .status(202)
            .cookie('token', token, {
                httpOnly: false,
                secure: false, 
                path: '/', 
                sameSite: 'None',
                maxAge: 3600000,
            })
            .json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            address: userSaved.address,
            phone: userSaved.phone,
            photo: userSaved.photo,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt,

         });
        }catch(error){
        res.status(500).json({ message: error.message });
    }

};



export const showSellers = async(req,res)=>{
    try {
        const sellers = await Usuario.find();
        const sellerList= sellers.filter(user=>user.roles.includes('vendor'))
        const usersList = sellerList.map(user=>{
            return{
                ...user.toObject(),
                photo:`${req.protocol}://${req.get('host')}/uploads/${user.photo}`, 
            };
        })
        res.json(usersList);
    } catch (error) {
        console.error("Error details:", error);
    res.status(500).json({ message: "Error la lista de vendedores", error })
    }
}

export const addNewSeller = async(req, res) =>{
    console.log()
}



export const login =  async (req, res) => {
    const { email, password} = req.body;

    try{

        //buscar el usuario si existe
        const userFound = await Usuario.findOne({ email });

        //si no se encuentra el usuario que me mande el status
        if(!userFound) 
            return res.status(400).json({ message: "Usuario no encontrado" });

        //variable de coincidencia
        const isMatch = await bcrypt.compare(password, userFound.password)
         if(!isMatch)
            return res.status(400).json( {message: "Contraseña incorrecta"});

         const token = await createAccessToken({ id: userFound._id }); 
         
         res
            .status(202)
            .cookie('token', token, {
                httpOnly: false,
                secure: false, 
                path: '/', 
                sameSite: 'None',
                maxAge: 3600000,
            })
            .json({
                token,
                id: userFound._id,
                username: userFound.username,
                email: userFound.email,
                createdAt: userFound.createdAt,
                updatedAt: userFound.updatedAt,
            });
        }catch(error){
        res.status(500).json({ message: error.message });
    }
};



export const logout = (req, res) =>{
    localStorage.removeItem('token');
    res.cookie("token", "",{
        httpOnly: false, 
        secure: false, 
        path: '/',
        sameSite: 'None',
        expires: new Date(0),
    });
    
    return res.sendStatus(200)
};


// get info para pagina de profile
export const profile = async (req,res) =>{
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "No autorizado" });
      }
      
      jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        if (err) {
          return res.status(401).json({ message: "No autorizado" });
        }
    
        // Si el token es válido, busca el usuario en la base de datos
        const userFound = await Usuario.findById(user.id);
        if (!userFound) {
          return res.status(401).json({ message: "No autorizado" });
        }
    
        // Si todo está bien, retorna los datos del usuario
        return res.json({
          id: userFound._id,
          username: userFound.username,
          email: userFound.email,
          street: userFound.street,
          number: userFound.number,
          colony: userFound.colony,
          cpnum: userFound.cpnum,
          phone: userFound.phone,
          createdAt: userFound.createdAt,
          updatedAt: userFound.updatedAt,
        });
      });
}

//put info pagina de profile
export const updatedUser = async(req, res)=>{
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "No autorizado" });
    }
      
    jwt.verify(token, TOKEN_SECRET, async (err, decodedUser) => {
        if (err) {
          return res.status(401).json({ message: "No autorizado" });
        }

        try {
            // Buscar al usuario en la base de datos
            const userFound = await Usuario.findById(decodedUser.id);
            if (!userFound) {
              return res.status(404).json({ message: "Usuario no encontrado" });
            }
      
            // Si hay un archivo (foto), actualizamos el campo `photo` en `req.body`
            if (req.file) {
              const photoPath = req.file.filename;
              req.body.photo = photoPath;
            }
      
            // Actualización de los datos del usuario
            const updatedUser = await Usuario.findByIdAndUpdate(decodedUser.id, req.body, {
              new: true,
            });
      
            // Responder con los datos actualizados
            res.json(updatedUser);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error al actualizar el usuario" });
        }
    });
}

export const verifyToken = async (req, res ) =>{
    const token = req.headers.authorization?.split(" ")[1] || req.cookies.token; 

   if(!token) return res.status(401).json({message: "No autorizado"});

   jwt.verify(token, TOKEN_SECRET,  async (err, user) => {
    if(err) return res.status(401).json({message: "No autorizado"});

    const userFound = await Usuario.findById(user.id)
    if(!userFound) return res.status(401).json({message: "No autorizado"});

    return res.json({
        id: userFound,
        username: userFound.username,
        email: userFound.email,
    })
   })

  };
  

