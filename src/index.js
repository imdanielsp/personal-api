import express from 'express';
import { json } from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

// Dot Env Config
import { config as DotEnv } from 'dotenv';

const _ = DotEnv();

// Routes
import { MainRouter } from './routes';
import { ExperienceRouter } from './routes/experiences';
import { SkillRouter } from './routes/skills';

const app = express();

// MongoDB
mongoose.connect(
  `mongodb://${process.env.DB_URL}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  {
    useNewUrlParser: true,
    user: process.env.DB_USER,
    pass: process.env.DB_PASSWORD
  }
);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection'));

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
