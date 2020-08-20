import { Router } from 'express';
import specialitiesRouter from './speciality.routes';

const routes = Router();

routes.use('/specialities', specialitiesRouter);

export default routes;
