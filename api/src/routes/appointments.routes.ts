import { classToPlain } from 'class-transformer';
import { Router } from 'express';
import CreateAppointmentDto from '../dtos/CreateAppointmentDto';
import { NotFound } from '../errors/apiErrors';
import Appointment from '../models/Appointment';
import CancelAppointmentService from '../services/CancelAppointmentService';
import CreateAppointmentService from '../services/CreateAppointmentService';
import { transformAndValidate } from '../utils';

const appointmentsRouter = Router();

appointmentsRouter.get('/', async (request, response) => {
  const userId = request.user.id;
  const appointments = await Appointment.findAvailablesByUser(userId);

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

appointmentsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;
  const userId = request.user.id;

  const appointment = await Appointment.findOneAvailableByUserAndId(userId, id);

  if (!appointment) {
    throw new NotFound();
  }

  const appointmentService = new CancelAppointmentService();
  await appointmentService.execute({ appointment });

  return response.status(204).send();
});

export default appointmentsRouter;
