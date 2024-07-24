import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import 'express-async-errors';
import { connect } from './connections/db.js';
import { errorHandler } from './middlewares/errorMiddleware.js';
import taskRoutes from "../src/routes/TaskRoutes.js";
import userRoutes from "../src/routes/UserRoutes.js";
import bodyParser from "body-parser"

connect();
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use('/task', taskRoutes);
app.use('/user', userRoutes);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log(`Listening to port ${process.env.PORT}`);
});