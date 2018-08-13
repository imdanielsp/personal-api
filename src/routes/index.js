import axios from 'axios';
import { Router } from 'express';
import DataManager from '../data';
import Profile from '../models/profile';

export const MainRouter = Router();

MainRouter.get('/profile', (req, res) => {
  DataManager.getProfile().then(profile => {
    res.json(profile);
  }).catch(err => {
    res.sendStatus(404);
  });
});

MainRouter.put('/profile', (req, res) => {
  if (req.body.id === undefined) {
    return res.sendStatus(400);
  }

  const newProfile = new Profile(
    req.body.name,
    req.body.profilePic,
    req.body.title,
    req.body.about,
    req.body.email,
    req.body.resume,
    req.body.location,
    req.body.education,
    req.body.language,
    req.body.links
  );

  DataManager.updateProfile(
    req.body.id, newProfile
  ).then(newProfile => {
    res.json(newProfile);
  }).catch(err => {
    console.log(err);
    res.sendStatus(500);
  });
});

// Wakatime Proxy
// GET /stats
MainRouter.get('/stats', (req, res) => {
  axios.get(process.env.WAKATIME_API_URL, {
    headers: {
      'Authorization': 'Basic ' + process.env.WAKATIME_API_KEY,
    }
  }).then(resp => {
    return resp.data.data.languages;
  }).then(languages => {
    return languages.map(it => {
      return {
        name: it.name,
        value: it.percent
      };
    });
  }).then(stats => {
    res.json(stats);
  })
    .catch(err => {
      res.sendStatus(err.response.status);
    });
});