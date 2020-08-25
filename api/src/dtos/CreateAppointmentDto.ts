import { Expose } from 'class-transformer';
import { IsDefined, IsMilitaryTime, IsNumber } from 'class-validator';

class CreateAppointmentDto {
  @Expose()
  @IsNumber()
  @IsDefined()
  scheduleId: number;

  @Expose()
  @IsMilitaryTime()
  @IsDefined()
  time: string;
}

export default CreateAppointmentDto;
