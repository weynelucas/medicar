import { classToPlain } from 'class-transformer';
import { Router } from 'express';
import CreateAppointmentDto from '../dtos/CreateAppointmentDto';
import Appointment from '../models/Appointment';
import CreateAppointmentService from '../services/CreateAppointmentService';
import { transformAndValidate } from '../utils';

const appointmentsRouter = Router();

appointmentsRouter.get('/', async (request, response) => {
  const userId = request.user.id;
  const appointments = await Appointment.findAvaiablesByUser(userId);

  return response.json(classToPlain(appointments));
});

appointmentsRouter.post('/', async (request, response) => {
  const userId = request.user.id;
  const { scheduleId, time } = await transformAndValidate(
    CreateAppointmentDto,
    request.body,
  );

  const appointmentService = new CreateAppointmentService();
  const appointment = await appointmentService.execute({
    userId,
    scheduleId,
    time,
  });

  return response.status(201).json(classToPlain(appointment));
});

export default appointmentsRouter;
