import { Expose } from 'class-transformer';
import { IsNumberString, IsOptional } from 'class-validator';
import IsDateFormatString from '../validation/IsDateFormatString';

class FilterScheduleDto {
  @Expose()
  @IsNumberString({ no_symbols: true })
  @IsOptional()
  doctor?: string;

  @Expose()
  @IsNumberString({ no_symbols: true })
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
