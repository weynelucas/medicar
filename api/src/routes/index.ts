import { Router } from 'express';
import doctorsRouter from './doctors.routes';
import schedulesRouter from './schedules.routes';
import sessionsRouter from './sessions.routes';
import specialitiesRouter from './speciality.routes';
import usersRouter from './users.routes';

const routes = Router();

routes.use('/', sessionsRouter);
routes.use('/users', usersRouter);
routes.use('/specialities', specialitiesRouter);
routes.use('/doctors', doctorsRouter);
routes.use('/schedules', schedulesRouter);

export default routes;
