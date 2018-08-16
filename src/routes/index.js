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

MainRouter.post('/profile', (req, res) => {
  DataManager.createProfile(req.body)
    .then(profile => res.json(profile))
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
});

MainRouter.put('/profile', (req, res) => {
  if (req.body.id === undefined) {
    return res.sendStatus(400);
  }

  DataManager.updateProfile(
    req.body.id, req.body  // WTF is this Dan?
  ).then(newProfile => {
    res.json(newProfile);
  }).catch(err => {
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
    let cValue = 0;
    return languages.filter(it => it.percent > 5.0).map(it => {
      // I don't write C, wakatime has bug where it marks .cxx files as C.
      // Here I add the values of C to C++ because that's the real truth!
      if (it.name === 'C') {
        cValue = it.percent;
        it.percent = 0;
      }

      if (it.name === 'C++')
        it.percent += cValue;

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