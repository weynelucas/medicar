import { Router } from 'express';
import doctorsRouter from './doctors.routes';
import specialitiesRouter from './speciality.routes';

const routes = Router();

routes.use('/specialities', specialitiesRouter);
routes.use('/doctors', doctorsRouter);

export default routes;
