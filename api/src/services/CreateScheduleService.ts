import { isBefore, parseISO, set, startOfDay, startOfSecond } from 'date-fns';
import { ServiceError } from '../errors/apiErrors';
import Doctor from '../models/Doctor';
import Schedule from '../models/Schedule';
import ScheduleTime from '../models/ScheduleTime';

interface Request {
  doctorId: number;
  date: string;
  times: string[];
}

class CreateScheduleService {
  public async execute({ doctorId, date, times }: Request): Promise<Schedule> {
    const doctor = await Doctor.findOne(doctorId);
    if (!doctor) {
      throw new ServiceError(`Speciality with id=${doctorId} not found.`);
    }

    const today = new Date();
    const parsedDate = startOfDay(parseISO(date));

    if (isBefore(parsedDate, startOfDay(today))) {
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

    const isSomeTimePast = times.some(time => {
      const [hours, minutes, seconds] = time
        .split(':')
        .map(part => Number(part));

      const scheduleTimeDate = set(parsedDate, { hours, minutes });

      return isBefore(scheduleTimeDate, startOfSecond(today));
    });

    if (isSomeTimePast) {
      throw new ServiceError(
        'Cannot create schedules for past times of today.',
      );
    }

    const schedule = Schedule.create({ doctor, date });
    await schedule.save();

    const scheduleTimes = times.map(time => {
      return ScheduleTime.create({
        schedule,
        time,
        isAvaialble: true,
      });
    });

    await ScheduleTime.save(scheduleTimes);

    return schedule;
  }
}

export default CreateScheduleService;
