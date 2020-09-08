import { ServiceError } from '../errors/apiErrors';
import Appointment from '../models/Appointment';
import Schedule from '../models/Schedule';
interface Request {
  userId: number;
  scheduleId: number;
  time: string;
}

class CreateAppointmentService {
  public async execute({
    userId,
    scheduleId,
    time,
  }: Request): Promise<Appointment> {
    const schedule = await Schedule.findOneAvailableById(scheduleId);
    if (!schedule) {
      throw new ServiceError('Agenda não encontrada.');
    }

    const scheduleTime = schedule.getScheduleTime(time);
    if (!scheduleTime) {
      throw new ServiceError('Não há horário disponível para essa agenda.');
    }

    const appointmentOnSameDate = await Appointment.findOneByUserAndDate(
      userId,
      schedule.date,
      scheduleTime.time,
    );

    if (appointmentOnSameDate) {
      throw new ServiceError(
        'Você já tem uma consulta marcada para esta mesma data e horário.',
      );
    }

    const appointment = Appointment.create({
      userId,
      schedule,
      time: scheduleTime.time,
    });

    await appointment.save();
    await scheduleTime.disable();

    return appointment;
  }
}

export default CreateAppointmentService;
