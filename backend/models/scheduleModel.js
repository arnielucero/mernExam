import mongoose from 'mongoose';

const scheduleSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    selectedDate: {
      type: Date
    },
  },
  {
    timestamps: true,
  }
);

const Schedule = mongoose.model('Schedule', scheduleSchema);

export default Schedule;
