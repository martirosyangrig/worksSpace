import { Router } from "express";
import { workspaceDataValidation } from "../../middleware/validation/validations";
import { validator } from "../../middleware/validation/validatorMiddleware";
import { verifyUser } from "../../middleware/auth";
import WorksSpaceController from "../../controllers/WorksSpace";

const router = Router();

router.get('/', verifyUser, WorksSpaceController.getWorkSpaces);
router.post('/', verifyUser, workspaceDataValidation , validator , WorksSpaceController.createWorksSpace)
router.put('/:workSpaceId', verifyUser,  workspaceDataValidation , validator , WorksSpaceController.updateWorkSpace)
router.put('/join/:workSpaceId',  verifyUser, WorksSpaceController.joinWorkSpace)
router.put('/leave/:workSpaceId',  verifyUser, WorksSpaceController.leaveWorkSpace)
router.delete('/:workSpaceId', verifyUser, WorksSpaceController.delete)

export default router;
