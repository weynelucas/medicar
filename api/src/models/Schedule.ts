import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Doctor from './Doctor';
import ScheduleTime from './ScheduleTime';

@Entity('schedule')
class Schedule extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  date: Date;

  @Column({ name: 'doctor_id' })
  doctorId: number;

  @ManyToOne(() => Doctor, doctor => doctor.schedules)
  @JoinColumn({ name: 'doctor_id' })
  doctor: Doctor;

  @OneToMany(() => ScheduleTime, scheduleTime => scheduleTime.schedule)
  times: ScheduleTime[];
}

export default Schedule;
