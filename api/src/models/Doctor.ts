import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
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

  @ManyToOne(type => Speciality, speciality => speciality.doctors)
  @JoinColumn({ name: 'speciality_id' })
  speciality: Speciality;
}

export default Doctor;
