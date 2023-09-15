import asyncHandler from 'express-async-handler';
import Schedule from '../models/scheduleModel.js';
import  { isValid, parseISO } from 'date-fns';

const validateInput = (input, res) => {
  const { title, selectedDate } = input;
  const parsedDate = parseISO(selectedDate);

  if (!title || title.trim().length === 0) {
   return 'input cannot be empty.';
  }
  
  if (!isValid(parsedDate)) {
     return 'Invalid date format. Please use YYYY-MM-DD format.';
  }
}
const createSchedule = asyncHandler(async (req, res) => {
  const { title, description, selectedDate } = req.body;
  
  const validateData = validateInput(req.body)
  if (validateData) {
    res.status(400);
    throw new Error(validateData)
  }
  const scheduleExists = await Schedule.findOne({ title });

  if (scheduleExists) {
    res.status(400);
    throw new Error('Schedule already exists');
  }

  const schedule = await Schedule.create({
    title,
    description,
    selectedDate,
  });

  if (schedule) {
    res.status(201).json({
      _id: schedule._id,
      title: schedule.title,
      description: schedule.description,
      selectedDate: schedule.selectedDate
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

const getSchedule = asyncHandler(async (req, res) => {
  const schedule = await Schedule.findById(req.params.id);
  if (schedule) {
    res.json({
      id: schedule._id,
      title: schedule.title,
      description: schedule.description,
      selectedDate:schedule.selectedDate
    });
  } else {
    res.status(404);
    throw new Error('Schedule not found');
  }
});

const getAllSchedules = asyncHandler(async (req, res) => {
  try {
    const schedules = await Schedule.find();
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const deleteSchedule = asyncHandler(async (req, res) => {
  const schedule = await Schedule.findById(req.params.id);
  if (schedule) {
    await Schedule.findByIdAndRemove(req.params.id);
    res.json({ error: false, message: 'Item deleted' });
  } else {
    res.status(404);
    throw new Error('Schedule not found');
  }
});


const updateSchedule = asyncHandler(async (req, res) => {
  const schedule = await Schedule.findById(req.body.id);
  const filter = { _id: req.body.id }
  if (schedule) {
    const updatedSchedules = {
      'title': req.body.title,
      'description': req.body.description,
      'selectedDate': req.body.selectedDate  
    }

    const updatedSchedule = await Schedule.updateOne(filter, updatedSchedules);
   console.log('update',updatedSchedule)
    res.json({
      title: updatedSchedules.title,
      description: updatedSchedules.description,
      selectedDate: updatedSchedules.selectedDate
    });
  } else {
    res.status(404);
    throw new Error('Schedule not found');
  }


});
export {
  createSchedule,
  deleteSchedule,
  getSchedule,
  updateSchedule,
  getAllSchedules
};
