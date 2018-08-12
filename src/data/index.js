import Skill from '../models/skill';
import Experience from '../models/experience';
import Profile from '../models/profile';

import AWS from 'aws-sdk';

// AWS S3
const S3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  subregion: 'us-east-2'
});

export default class DataManager {
  static getProfile() {
    return new Promise((resolve/*, reject*/) => {
      resolve(
        new Profile(
          'Daniel Santos',
          '`https://s3.us-east-2.amazonaws.com/daniel-personal-api/profile-pic-0`',
          'Software Engineer - Computer Scientist',
          'I am passionate about system design and architecture development, IoT devices, machine learning and network communications. I enjoy working in an agile, team-driven environment and love collaborating with people. I live by two doctrines; learn-it-all and that the only true wisdom is in knowing that I know nothing.',
          'dsantosp12@gmail.com',
          'http://github.com/imdanielsp',
          'Lowell, MA',
          [
            {
              school: 'University of Massachusetts - Lowell',
              startDate: new Date(2015, 1),
              endDate: new Date(2018, 12),
              career: 'B.S. in Computer Science'
            }
          ],
          ['English', 'Spanish'],
          [
            {
              name: 'github',
              url: 'https://github.com/imdanielsp/'
            },
            {
              name: 'medium',
              url: 'https://medium.com/@imdanielsp'
            },
            {
              name: 'linkedin',
              url: 'https://www.linkedin.com/in/danielsantosio/'
            },
            {
              name: 'twitter',
              url: 'https://twitter.com/itisdaniel_'
            }
          ]
        )
      );
    });
  }

  static updateProfile(id, newProfile) {
    return new Promise((resolve, reject) => {
      const buffer = new Buffer.from(
        newProfile.profilePic.replace(/^data:image\/\w+;base64,/, ''),
        'base64'
      );

      S3.putObject({
        Bucket: 'daniel-personal-api',
        Key: `profile-pic-${id}`,
        Body: buffer,
        ContentEncoding: 'base64',
        ContentType: 'image/jpeg',
        ACL: 'public-read'
      }, err => {
        if (err) return reject(err);
        // Future: update data base.
        newProfile.profilePic = `https://s3.us-east-2.amazonaws.com/daniel-personal-api/profile-pic-${id}`
        resolve(newProfile);
      });
    });
  }

  static getExperience(id) {
    return new Promise((resolve, reject) => {
      resolve(
        new Experience(
          'Software Development Intern - Smart Speaker Platform',
          'Sonos, Inc.',
          new Date(2018, 5),
          undefined,
          'Work on the platform that supports the integrations between smart voice assistants (Alexa, Google Assistant), Apple AirPlay, Spotify, and other services supported by the Sonos portfolio of speakers. Extended internal functionalities of the speakers, such as radio location, toggle playback state, and more. Developed a cross-platform client application for the Control API that connects to the speakers in a LAN using Electron and React.'
        ));
    });
  }

  static addExperience(experience) {
    return new Promise((resolve, reject) => {
      resolve(experience);
    });
  }

  static getExperiences(limit) {
    return new Promise((resolve, reject) => {
      resolve(
        [
          new Experience(
            'Software Development Intern - Smart Speaker Platform',
            'Sonos, Inc.',
            new Date(2018, 5),
            undefined,
            'Work on the platform that supports the integrations between smart voice assistants (Alexa, Google Assistant), Apple AirPlay, Spotify, and other services supported by the Sonos portfolio of speakers. Extended internal functionalities of the speakers, such as radio location, toggle playback state, and more. Developed a cross-platform client application for the Control API that connects to the speakers in a LAN using Electron and React.'
          ),
          new Experience(
            'Software Engineer Intern',
            'ZOLL Medical Corporation',
            new Date(2018, 9),
            new Date(2018, 5),
            'Work closely with software engineers researching, documenting, and prototyping new technologies to be used in the next generation of ZOLL’s products. Prototyped applications using Bluetooth Low Energy (BLE) and Python. Built and deployed Board Support Packages (BSP) to System on Chip (SoC) and used toolchains to build software packages for different hardware targets.'
          ),
          new Experience(
            'Software Integration Engineer',
            'IBM',
            new Date(),
            new Date(),
            'Interfaced with client directly to integrate IBM Resilient with multiple applications like SIEMs, ticketing systems, and more using Python, REST and templates. Gathered integration requirements, give demos of custom integration, and provide continuous support for integrations to clients.'
          ),
        ]
      );
    });
  }

  static updateExperience(id, newExperience) {
    return new Promise((resolve, reject) => {
      resolve(newExperience);
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
