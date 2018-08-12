import express from 'express';
import { json } from 'body-parser';
import cors from 'cors';

// Dot Env Config
import { config as DotEnv } from 'dotenv';

const _ = DotEnv();

// Routes
import { MainRouter } from './routes';
import { ExperienceRouter } from './routes/experiences';
import { SkillRouter } from './routes/skills';

const app = express();

app.use(cors());

app.use(json({ extended: false, limit: '15mb' }));

app.use(MainRouter);
app.use('/experiences', ExperienceRouter);
app.use('/skills', SkillRouter);

// 404 Handler
app.use((req, res, next) => {
  res.sendStatus(404);
});

app.listen(process.env.PORT, () => {
  console.log(`Listening @ ${process.env.PORT}`);
});
