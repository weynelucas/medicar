import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Schedule from './Schedule';
import Speciality from './Speciality';

@Entity()
class Doctor extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  crm: number;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column({ name: 'speciality_id' })
  specialityId: number;

  @ManyToOne(() => Speciality, speciality => speciality.doctors)
  @JoinColumn({ name: 'speciality_id' })
  speciality: Speciality;

  @OneToMany(() => Schedule, schedule => schedule.doctor)
  schedules: Schedule[];
}

export default Doctor;
