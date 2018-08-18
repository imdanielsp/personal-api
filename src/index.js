import express from 'express';
import { json } from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import { RateLimiterMemory } from 'rate-limiter-flexible';

// Dot Env Config
import { config as DotEnv } from 'dotenv';

const _ = DotEnv();

// Routes
import { MainRouter } from './routes';
import { ExperienceRouter } from './routes/experiences';
import { SkillRouter } from './routes/skills';

const app = express();

// MongoDB
mongoose.connect(process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    user: process.env.DB_USER,
    pass: process.env.DB_PASSWORD
  }
);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection'));

// Looger
app.use(morgan('dev'));

// CORS
app.use(cors());

// JSON Parser
app.use(json({ extended: false, limit: '15mb' }));

// Rate Limiter
const rateLimiter = new RateLimiterMemory();
app.use((req, res, next) => {
  rateLimiter.consume(req.connection.remoteAddress)
    .then(() => {
      return next();
    }).catch(rejRes => {
      return res.sendStatus(429);
    });
});

// API Key Validator
app.use((req, res, next) => {

  if (req.headers['z-api-key']
    && req.headers['z-api-key'] === process.env.API_KEY) {
    return next();
  }

  res.sendStatus(401);
});

// App Routers
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
