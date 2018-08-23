import Skill from '../models/skill';
import { Experience } from '../models/experience';
import { Profile } from '../models/profile';
import uuidv4 from 'uuid/v4';

import AWS from 'aws-sdk';

// AWS S3
const S3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  subregion: 'us-east-2'
});

export default class DataManager {
  static getProfile() {
    return new Promise((resolve, reject) => {
      Profile.find()
        .then(profile => {
          if (profile.length > 0) {
            resolve(profile[0]);
          } else {
            const err = new Error('Profile is not yet created!');
            reject(err);
          }
        }).catch(err => reject(err));
    });
  }

  static createProfile(newProfile) {
    return new Promise((resolve, reject) => {
      const buffer = new Buffer.from(
        newProfile.profilePic.replace(/^data:image\/\w+;base64,/, ''),
        'base64'
      );
      const pictureName = uuidv4() + '-profile';

      S3.putObject({
        Bucket: 'daniel-personal-api',
        Key: pictureName,
        Body: buffer,
        ContentEncoding: 'base64',
        ContentType: 'image/png',
        ContentDisposition: 'inline',
        ACL: 'public-read'
      }, err => {
        if (err) return reject(err);

        const resumeBuffer = new Buffer.from(newProfile.resume, 'base64');
        const fileName = uuidv4() + '-resume.pdf';

        S3.putObject({
          Bucket: 'daniel-personal-api',
          Key: fileName,
          ContentEncoding: 'base64',
          ContentType: 'application/pdf',
          Body: resumeBuffer,
          ACL: 'public-read'
        }, err2 => {
          if (err2) return reject(err);

          newProfile.resume = `https://s3.us-east-2.amazonaws.com/daniel-personal-api/${fileName}`;
          newProfile.profilePic = `https://s3.us-east-2.amazonaws.com/daniel-personal-api/${pictureName}`;

          const profile = new Profile(newProfile);
          profile.save()
            .then(profile => resolve(profile))
            .catch(err => reject(err));
        });
      });
    });
  }

  static updateProfile(id, newProfile) {
    return new Promise((resolve, reject) => {
      const buffer = new Buffer.from(
        newProfile.profilePic.replace(/^data:image\/\w+;base64,/, ''),
        'base64'
      );
      const pictureName = uuidv4() + '-profile';

      S3.putObject({
        Bucket: 'daniel-personal-api',
        Key: pictureName,
        Body: buffer,
        ContentEncoding: 'base64',
        ContentType: 'image/png',
        ContentDisposition: 'inline',
        ACL: 'public-read'
      }, err => {
        if (err) return reject(err);

        const resumeBuffer = new Buffer.from(newProfile.resume, 'base64');
        const fileName = uuidv4() + '-resume.pdf';

        S3.putObject({
          Bucket: 'daniel-personal-api',
          Key: fileName,
          ContentEncoding: 'base64',
          ContentType: 'application/pdf',
          Body: resumeBuffer,
          ACL: 'public-read'
        }, err2 => {
          if (err2) return reject(err);

          newProfile.resume = `https://s3.us-east-2.amazonaws.com/daniel-personal-api/${fileName}`;
          newProfile.profilePic = `https://s3.us-east-2.amazonaws.com/daniel-personal-api/${pictureName}`;

          Profile.findOneAndUpdate(
            { '_id': id },
            newProfile
          ).then(doc => {
            resolve(newProfile);
          }).catch(err => reject(err));
        });
      });
    });
  }

  static getExperience(id) {
    return new Promise((resolve, reject) => {
      Experience.find({ '_id': id })
        .then(experience => resolve(experience))
        .catch(err => reject(err));
    });
  }

  static addExperience(newExperience) {
    return new Promise((resolve, reject) => {
      console.log(newExperience);
      const experience = new Experience(newExperience);
      experience.save()
        .then(doc => resolve(doc))
        .catch(err => reject(err));
    });
  }

  static getExperiences(limit) {
    return new Promise((resolve, reject) => {
      Experience.find()
        .then(experiences => resolve(experiences))
        .catch(err => reject(err));
    });
  }

  static updateExperience(id, newExperience) {
    return new Promise((resolve, reject) => {
      Experience.findOneAndUpdate(
        { '_id': id },
        newExperience
      ).then(doc => resolve(newExperience))
        .catch(err => reject(err));
    });
  }

  static getSkill(id) {
    return new Promise((resolve, reject) => {
      resolve(new Skill('C++', 9));
    });
  }

  static addSkill(skill) {
    return new Promise((resolve, reject) => {
      resolve(skill);
    });
  }

  static getSkills(limit) {
    return new Promise((resolve, reject) => {
      resolve(
        [
          new Skill('C++', 9),
          new Skill('Python', 9),
          new Skill('JavaScript', 7),
          new Skill('React', 7),
          new Skill('Swift', 6),
        ]
      );
    });
  }

  static updateSkill(id, newSkill) {
    return new Promise((resolve, reject) => {
      resolve(newSkill);
    });
  }
}
