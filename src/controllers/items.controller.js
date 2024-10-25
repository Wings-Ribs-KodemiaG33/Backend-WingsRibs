
import Productos from "../models/items.model.js";

export const getListItems = async (req, res) => {
  try {
    const items = await Productos.find();
    const itemsWithFullUrl = items.map(item => {
      return {
        ...item.toObject(),
        photo: `${req.protocol}://${req.get('host')}/uploads/${item.photo}`, // Aquí usamos solo el nombre
      };
    });
    res.json(itemsWithFullUrl);
  } catch (error) {
    console.error("Error details:", error); // Añadir esto para ver el error en la consola
    res.status(500).json({ message: "Error al obtener los productos", error });
  }
}


//crear item Nat
export const createItem = async (req, res) => {
  console.log('Archivo recibido:', req.file);
  try {
    const { item, subsidiary, price, discount, description, category, timecook, showitem} = req.body;
    showitem = true;
    
    //const photo = req.file ? req.file.path : null;
    const photo = req.file ? req.file.filename : null;

    if (!item || !price || !description || !category || !timecook || !showitem) {
      return res.status(400).json({ message: "Por favor, completa todos los campos obligatorios" });
    }

    const newItem = new Productos({
      item,
      subsidiary,
      photo,
      price,
      discount,
      description,
      category,
      timecook,
      showitem
    });

    const saveItem = await newItem.save();
    res.status(201).json(saveItem); 
  } catch (error) {
    console.error("Error details:", error);
    res.status(500).json({ message: "Error al crear el producto", error: error.message });
  }
};

//obtener un solo item
export const getItem = async (req, res) => {
  const item = await Productos.findById(req.params.id)
  if(!item) return res.status(404).json({message: "Producto no encontrado"})
  res.json(item)
}

//eliminar item
export const deleteItem = async (req, res) => {
    const item = await Productos.findByIdAndDelete(req.params.id)
    if(!item) return res.status(404).json({message: "Producto no encontrado"})
    return res.sendStatus(204);
}

//actualizar item
export const updateItems = async (req, res) => {

    /*const item = await Productos.findByIdAndUpdate(req.params.id, req.body,
        {
            new: true
        }
    )
    if(!item) return res.status(404).json({message: "Producto no encontrado"})
    res.json(item)*/

    try {
      const { id } = req.params;
      let item = await Productos.findById(id);
      if (!item) return res.status(404).json({ message: "Producto no encontrado" });
  
      if (req.file) {
        const photoPath = req.file.filename; 
        req.body.photo = photoPath; 
      }
      
      item = await Productos.findByIdAndUpdate(id, req.body, {
        new: true,
      });
  
      res.json(item);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al actualizar el producto" });
    }
}