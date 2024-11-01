import { Router } from "express";
import { createSubsidiary, getListSubsidiary, updateSubsidiary,deleteSubsidiary } from "../controllers/sucursal.controllers";

const router = Router()
router.get("/subsidiary", getListSubsidiary);
router.post("/subsidiary",  createSubsidiary);
router.put("/subsidiary/:id",updateSubsidiary);
router.delete("/subsidiary/:id", deleteSubsidiary)
