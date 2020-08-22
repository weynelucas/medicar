import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Doctor from './Doctor';

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
}

export default Schedule;
