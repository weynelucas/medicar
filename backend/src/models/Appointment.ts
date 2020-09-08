import { Exclude, Expose, Transform } from 'class-transformer';
import { format, startOfSecond } from 'date-fns';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  SelectQueryBuilder,
  UpdateDateColumn,
} from 'typeorm';
import Doctor from './Doctor';
import Schedule from './Schedule';
import User from './User';

@Entity()
class Appointment extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Exclude()
  @Column({ name: 'user_id' })
  userId: number;

  @Exclude()
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Exclude()
  @Column({ name: 'schedule_id' })
  scheduleId: number;

  @Exclude()
  @ManyToOne(() => Schedule)
  @JoinColumn({ name: 'schedule_id' })
  schedule: Schedule;

  @Column('time')
  @Transform((value: string) => value.substring(0, 5))
  time: string;

  @Exclude()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @Expose()
  public get date(): Date {
    return this.schedule.date;
  }

  @Expose()
  public get doctor(): Doctor {
    return this.schedule.doctor;
  }

  static findOneByUserAndDate(
    userId: number,
    date: Date,
    time: string,
  ): Promise<Appointment | undefined> {
    return this.createQueryBuilder('appointment')
      .innerJoin('appointment.schedule', 'schedule')
      .where('appointment.user_id = :userId', { userId })
      .andWhere('schedule.date = :date', { date })
      .andWhere('appointment.time = :time', { time })
      .getOne();
  }

  static findAvailablesByUser(userId: number): Promise<Appointment[]> {
    return this.getAvailblesQuery()
      .andWhere('appointment.user_id = :userId', { userId })
      .getMany();
  }

  static findOneAvailableByUserAndId(
    userId: number,
    id: number | string,
  ): Promise<Appointment | undefined> {
    return this.getAvailblesQuery()
      .andWhere('appointment.user_id = :userId', { userId })
      .andWhere('appointment.id = :id', { id })
      .getOne();
  }

  static getAvailblesQuery(): SelectQueryBuilder<Appointment> {
    const today = new Date();
    const dateFormat = 'yyyy-MM-dd HH:mm:ss';
    const minDateTime = format(startOfSecond(today), dateFormat);

    return this.createQueryBuilder('appointment')
      .innerJoinAndSelect('appointment.schedule', 'schedule')
      .innerJoinAndSelect('schedule.doctor', 'doctor')
      .innerJoinAndSelect('doctor.speciality', 'specielity')
      .where('(schedule.date + appointment.time) >= :minDateTime', {
        minDateTime,
      })
      .orderBy({
        'schedule.date': 'ASC',
        'appointment.time': 'ASC',
        'appointment.created_at': 'DESC',
      });
  }
}

export default Appointment;
