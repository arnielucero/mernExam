import express from 'express';
import {
  createSchedule,
  updateSchedule,
  deleteSchedule,
  getSchedule,
  getAllSchedules
} from '../controllers/scheduleController.js';

const router = express.Router();

router.post('/', createSchedule);
router.get('/', getAllSchedules);
router.put('/', updateSchedule);
router.delete('/:id', deleteSchedule);
router.get('/:id', getSchedule);


export default router;
