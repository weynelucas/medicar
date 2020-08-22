import { Expose } from 'class-transformer';
import {
  ArrayNotEmpty,
  ArrayUnique,
  IsDateString,
  IsDefined,
  IsInt,
  IsMilitaryTime,
} from 'class-validator';

class CreateScheduleDto {
  @Expose()
  @IsInt()
  @IsDefined()
  doctorId: number;

  @Expose()
  @IsDateString()
  @IsDefined()
  date: string;

  @Expose()
  @IsMilitaryTime({ each: true })
  @ArrayUnique()
  @ArrayNotEmpty()
  @IsDefined()
  times: string[];
}

export default CreateScheduleDto;
