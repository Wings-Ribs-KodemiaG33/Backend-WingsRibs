import Sucursales from "../models/sucursales.models.js"

export const getListSubsidiary = async (req, res) => {
    try {
        const sucursal = await Sucursales.find();
        res.json(sucursal);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const createSubsidiary = async (req, res) => {
    try {
      const { name, addres, phone} = req.body;
  
      if (!name || !addres || !phone) {
        return res.status(400).json({ message: "Por favor, completa todos los campos obligatorios" });
      }
  
      const newSubsidiary = new Sucursales ({
        name,
        addres,
        phone,
      });
  
      const saveSubsidiary = await newSubsidiary.save();
      res.status(201).json(saveSubsidiary); 
    } catch (error) {
      console.error("Error details:", error);
      res.status(500).json({ message: "Error al crear el producto", error: error.message });
    }
};


export const deleteSubsidiary = async (req, res) => {
    const Subsidiary = await Sucursales.findByIdAndDelete(req.params.id)
    if(!Subsidiary) return res.status(404).json({message: "Producto no encontrado"})
    return res.sendStatus(204);
}

export const updateSubsidiary = async (req, res) => {
    try {
        const subsidiary = await Sucursales.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true 
        });
        if (!subsidiary) {
            return res.status(404).json({ message: "Sucursal no encontrada" });
        }
        res.status(200).json(subsidiary);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar la sucursal" });
    }
}
