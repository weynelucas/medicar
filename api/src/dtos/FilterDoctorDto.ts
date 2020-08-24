import { Expose } from 'class-transformer';
import { IsNumberString, IsOptional } from 'class-validator';

class FilterDoctorDto {
  @Expose()
  @IsOptional()
  search?: string;

  @Expose()
  @IsNumberString({ no_symbols: true })
  @IsOptional()
  speciality: string;
}

export default FilterDoctorDto;
