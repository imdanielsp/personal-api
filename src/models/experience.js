import mongoose from 'mongoose';

const ExperienceSchema = new mongoose.Schema({
  role: String,
  company: String,
  startDate: Date,
  endDate: {
    type: Date,
    required: false
  },
  description: String,
  link: String
});

export const Experience = mongoose.model('Experience', ExperienceSchema);
