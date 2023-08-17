import { Router } from "express";
import { workspaceChannelValidation } from "../../middleware/validation/validations";
import { validator } from "../../middleware/validation/validatorMiddleware";
import { verifyUser } from "../../middleware/auth";
import WorksSpaceController from "../../controllers/WorksSpace";
import WorkSpaceChannelController from "../../controllers/WorkSpaceChannel";

const router = Router();

router.get('/:workspaceId', verifyUser, WorkSpaceChannelController.getChannelByWorkSpace);
router.post('/:workspaceId', verifyUser, workspaceChannelValidation , validator , WorkSpaceChannelController.createChannel)
router.put('/:workspaceChannelId', verifyUser,  workspaceChannelValidation , validator , WorkSpaceChannelController.updateChannel)
router.put('/join/:workspaceChannelId', verifyUser, WorkSpaceChannelController.joinChannel)
router.put('/leave/:workspaceChannelId', verifyUser, WorkSpaceChannelController.leaveChannel)
router.delete('/:workspaceChannelId', verifyUser, WorksSpaceController.delete)

export default router;
