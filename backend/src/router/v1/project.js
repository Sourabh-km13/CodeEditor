import express, { Router } from 'express';
import { createprojectcontroller, getProjectTreeController } from '../../controllers/projectcontroller.js';


const router = express.Router()
router.post('/',createprojectcontroller)
router.get('/:projectid/tree',getProjectTreeController)
export default router