import  mongoose from 'mongoose';

const ProfileSchema = new mongoose.Schema({
  name: String,
  profilePic: String,
  title: String,
  about: String,
  email: String,
  resume: String,
  location: String,
  links: Array,
  website: String,
  languages: Array,
  education: Array
});

export const Profile = mongoose.model('Profile', ProfileSchema);
