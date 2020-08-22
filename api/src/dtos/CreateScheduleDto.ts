import { Expose } from 'class-transformer';
import { IsDateString, IsDefined, IsInt } from 'class-validator';
class CreateScheduleDto {
  @Expose()
  @IsInt()
  @IsDefined()
  doctorId: number;

  @Expose()
  @IsDateString()
  @IsDefined()
  date: string;
}

export default CreateScheduleDto;
