import { Router } from 'express';
import doctorsRouter from './doctors.routes';
import schedulesRouter from './schedules.routes';
import specialitiesRouter from './speciality.routes';

const routes = Router();

routes.use('/specialities', specialitiesRouter);
routes.use('/doctors', doctorsRouter);
routes.use('/schedules', schedulesRouter);

export default routes;
