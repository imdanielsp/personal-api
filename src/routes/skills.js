import { Router } from 'express';
import DataManager from '../data';

export const SkillRouter = Router();

SkillRouter.get('/:id', (req, res, next) => {
  if (req.params.id > 0) {
    next();
  } else {
    res.sendStatus(404);
  }
});

// Skills
SkillRouter.get('/', (req, res) => {
  DataManager.getSkills(
    req.query.limit || 5
  ).then((skills) => {
    res.json(skills)
  }).catch((err) => {
    res.sendStatus(404);
  });
});

SkillRouter.get('/:id', (req, res) => {
  DataManager.getSkill(req.params.id).then(skill => {
    res.json(skill);
  }).catch(err => {
    res.sendStatus(404);
  });
});
