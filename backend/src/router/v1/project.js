import express, { Router } from 'express';
import { createprojectcontroller } from '../../controllers/projectcontroller.js';


const router = express.Router()
router.post('/',createprojectcontroller)
export default router