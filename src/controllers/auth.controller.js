import Usuario from "../models/user.model.js"
import bcrypt from "bcryptjs"
import {createAccessToken} from "../libs/jwt.js"
import jwt from "jsonwebtoken"
import {TOKEN_SECRET} from "../secret.js"
import OTP from "../models/userOTP.model.js"
import app from "../app.js"




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
         
         res.cookie("token", token); //estableces una cookie en la respuesta
         //envias respuesta
         res.json({
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
         .cookie('token', token); //estableces una cookie en la respuesta
         //envias respuesta
         res.json({
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
    res.cookie("token", "",{
        expires: new Date(0),
    });
    return res.sendStatus(200)
};



//actuaizar usuario
/*export const UpdateUser = async (req,res) => {
   
    try{

        
        const justUser = await Usuario.findByIdAndUpdate(req.params.id, req.body,
            {
                new: true,
            }
        )
        if(!justUser) return res.status(404).json({message: "Usuario no encontrado"})
        res.json(justUser)
    }catch(error){
        console.log(error)
    }

} */


export const profile = async (req,res) =>{
    const userFound = await Usuario.findById(req.user.id);

    if(!userFound)return res.status(400).json({message: "Usuario no encontrado"});
   
    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        address: userFound.address,
        phone: userFound.phone,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,
    })

    res.send("profile");
}






export const verifyToken = async (req, res) =>{
   const {token} = req.cookies

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

}


