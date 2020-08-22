import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Schedule from './Schedule';

@Entity('schedule_time')
class ScheduleTime extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('time')
  time: Date;

  @Column({ name: 'is_available' })
  isAvaialble: boolean;

  @Column({ name: 'schedule_id' })
  scheduleId: number;

  @ManyToOne(() => Schedule, schedule => schedule.times)
  @JoinColumn({ name: 'schedule_id' })
  schedule: Schedule;
}

export default ScheduleTime;
