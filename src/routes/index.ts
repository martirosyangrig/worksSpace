import { Router } from "express";
import IndexUserRouter from './Users/index'
import IndexAuthRouter from './Auth/index'
import IndexWorkSpaceRouter from './WorkSpaces/index'
import IndexWorkSpacechannelRouter from './WorkSpaceChannel/index'

const router = Router();

router.use('/user', IndexUserRouter);
router.use('/auth', IndexAuthRouter);
router.use('/workspace', IndexWorkSpaceRouter)
router.use('/workspacechannel', IndexWorkSpacechannelRouter)


export default router;
