import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { createItem, getItem, updateItems, deleteItem, getListItems} from "../controllers/items.controller.js";
import { get } from "mongoose";
import { upload } from "../middlewares/multer.middleware.js";
const router = Router()

//router.get("/items", authRequired  , getItems)
router.get("/items/:id",getItem)
//router.post("/items", authRequired,createItems)
router.delete("/items/:id", deleteItem)

 
//Nat
router.get("/items", getListItems);
router.post("/item", upload.single('photo'), createItem);
router.put("/items/:id",upload.single('photo'), updateItems)

export default router;

 