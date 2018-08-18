import { Router } from 'express';
import DataManager from '../data';

export const ExperienceRouter = Router();

ExperienceRouter.get('/:id', (req, res, next) => {
  if (req.params.id > 0) {
    next();
  } else {
    res.sendStatus(404);
  }
});

// Experiences
ExperienceRouter.get('/', (req, res) => {
  DataManager.getExperiences(
    req.query.limit || 10
  ).then(experiences => {
    res.json(experiences);
  }).catch(err => res.sendStatus(404));
});

ExperienceRouter.post('/', (req, res) => {
  DataManager.addExperience(req.body)
    .then(experience => {
      res.json(experience);
    }).catch(err => {
      console.error(err);
      res.sendStatus(400);
    });
});

ExperienceRouter.get('/:id', (req, res) => {
  DataManager.getExperience(req.params.id).then(experience => {
    res.json(experience);
  }).catch(err => res.sendStatus(404));
});

ExperienceRouter.put('/:id', (req, res) => {
  DataManager.updateExperience(req.params.id, req.body)
    .then(newExperience => res.json(newExperience))
    .catch(err => res.sendStatus(404));
});