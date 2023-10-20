import env from 'dotenv'
import express from 'express';
const app = express();
import databaseConnection from './db.js';
import note from './routes/noteRoute.js';
import user from './routes/userRoute.js';
const port = 3000;

// use env
env.config();

// databse connection
databaseConnection();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/note", note);
app.use("/user", user);

// server start
app.listen(port, () => {
    console.log(`Application Listening on port ${port}`);
});
