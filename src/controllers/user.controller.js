import Usuario from "../models/user.model.js"

export const UpdateUser = async (req,res) => {
    const {id, address, phone} = req.body
    const user = await Usuario.findByIdAndUpdate(id)
    if(!user) return res.status(404).send({ message: 'Usuario no encontrado' });

    user.address = address
    user.phone = phone
    await user.save();
    res.send({message: "actuaizado correctamente"})

}