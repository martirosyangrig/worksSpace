import { Router } from "express";
import UserController from "../../controllers/Users";
import { userDataValidation } from "../../middleware/validation/validations";
import { validator } from "../../middleware/validation/validatorMiddleware";
import { verifyUser } from "../../middleware/auth";
import { upload } from "../../middleware/multer";

const router = Router();

router.get('/',  UserController.getAllUsers);
router.post('/upload', verifyUser , upload.single('image'), UserController.uploadImg)
router.put('/:id', verifyUser,  userDataValidation , validator , UserController.updateUser)
router.delete('/:id', verifyUser, UserController.delete)

export default router;
