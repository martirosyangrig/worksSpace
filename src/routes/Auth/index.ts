import { Router } from 'express'
import AuthControler from '../../controllers/Auth';
import { userDataValidation, userLogingValidation } from '../../middleware/validation/validations';
import { validator } from '../../middleware/validation/validatorMiddleware';
import UserController from '../../controllers/Users';

const router = Router();

router.post('/signup', userDataValidation , validator , UserController.createUser)
router.post('/login', userLogingValidation , validator , AuthControler.login);

export default router;
