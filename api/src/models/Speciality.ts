import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Doctor from './Doctor';

@Entity('speciality')
class Speciality extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @OneToMany(type => Doctor, doctor => doctor.speciality)
  doctors: Doctor[];
}

export default Speciality;
