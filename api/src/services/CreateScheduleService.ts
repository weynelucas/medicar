import { isBefore, parseISO, startOfDay } from 'date-fns';
import { ServiceError } from '../errors/apiErrors';
import Doctor from '../models/Doctor';
import Schedule from '../models/Schedule';

interface Request {
  doctorId: number;
  date: string;
}

class CreateScheduleService {
  public async execute({ doctorId, date }: Request): Promise<Schedule> {
    const doctor = await Doctor.findOne(doctorId);
    if (!doctor) {
      throw new ServiceError(`Speciality with id=${doctorId} not found.`);
    }

    const today = startOfDay(new Date());
    const parsedDate = startOfDay(parseISO(date));

    if (isBefore(parsedDate, today)) {
      throw new ServiceError('Cannot create schedules for past dates.');
    }

    const isDoctorAlreadyScheduled = await Schedule.findOne({
      doctorId,
      date: parsedDate,
    });

    if (isDoctorAlreadyScheduled) {
      throw new ServiceError(
        `Doctor ${doctor.name} is already scheduled for this date.`,
      );
    }

    const schedule = Schedule.create({ doctor, date });
    await schedule.save();

    return schedule;
  }
}

export default CreateScheduleService;
