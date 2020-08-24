import {
  BaseEntity,
  Brackets,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Schedule from './Schedule';
import Speciality from './Speciality';

interface FilterDoctorOptions {
  search?: string;
  speciality?: string;
}

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

  static findBySearchAndSpeciality({
    search,
    speciality,
  }: FilterDoctorOptions): Promise<Doctor[]> {
    var query = this.createQueryBuilder('doctor').leftJoinAndSelect(
      'doctor.speciality',
      'speciality',
    );

    if (search) {
      query = query.andWhere(
        new Brackets(qb => {
          qb.where('doctor.name ILIKE :search', {
            search: `%${search}%`,
          }).orWhere('doctor.email ILIKE :search', {
            search: `%${search}%`,
          });

          if (Number.isInteger(Number(search))) {
            qb.orWhere('doctor.crm = :search', { search });
          }
        }),
      );
    }

    if (speciality) {
      query = query.andWhere('speciality.id = :speciality', { speciality });
    }

    return query.getMany();
  }
}

export default Doctor;
