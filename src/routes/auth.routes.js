import {Router} from "express"
import {login, register, logout, profile, verifyToken, updatedUser } from "../controllers/auth.controller.js";
import {authRequired} from "../middlewares/validateToken.js"
import {validateSchema} from "../middlewares/validator.middleware.js";
import {loginSchema, registerSchema} from "../schemas/auth.schema.js";
import { upload } from "../middlewares/multer.middleware.js";


const router = Router()

router.post("/register", validateSchema(registerSchema), register)

router.post("/login", validateSchema(loginSchema), login);


router.post("/logout", logout)

router.get("/verify", verifyToken)

router.get("/profile", authRequired, profile)
router.put("/profile",upload.single('photo'), updatedUser )

export default router;