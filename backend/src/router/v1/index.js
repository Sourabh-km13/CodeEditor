import express from 'express'
import { pingCheck } from '../../controllers/pingcontroller.js';
import projectrouter from './project.js'
const router = express.Router();
router.use('/ping' , pingCheck)

router.use('/projects', projectrouter)
export default router