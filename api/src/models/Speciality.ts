import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('speciality')
class Speciality extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;
}

export default Speciality;
