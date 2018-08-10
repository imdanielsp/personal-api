import Skill from "../models/skill";

const DataManager = () => {
  return {
    getProfile: (id, cb) => {},
    updateProfile: (id, newProfile, cb) => {},

    getExperience: (id, cb) => {},
    getExperiences: (limit, cb) => {},
    updateExperience: (id, newExperience, cb) => {},

    getSkill: (id, cb) => {
      cb(new Skill("C++", 9));
    },

    getSkills: (limit, cb) => {
      cb(true, [
        new Skill("C++", 9),
        new Skill("Python", 9),
        new Skill("JavaScript", 7),
        new Skill("React", 7),
        new Skill("Swift", 6),
      ]);
    },

    updateSkill: (id, newSkill, cb) => {
      cb(true, newSkill);
    },

  }
}