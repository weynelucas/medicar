import { Expose } from 'class-transformer';
import { IsNumberString, IsOptional } from 'class-validator';
import IsDateFormatString from '../validation/IsDateFormatString';

class FilterScheduleDto {
  @Expose()
  @IsNumberString()
  @IsOptional()
  doctor?: string;

  @Expose()
  @IsNumberString()
  @IsOptional()
  speciality?: string;

  @Expose()
  @IsDateFormatString('yyyy-MM-dd')
  @IsOptional()
  dateAfter?: string;

  @Expose()
  @IsDateFormatString('yyyy-MM-dd')
  @IsOptional()
  dateBefore?: string;
}

export default FilterScheduleDto;
