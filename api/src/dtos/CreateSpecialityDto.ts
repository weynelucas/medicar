import { Expose } from 'class-transformer';
import { IsDefined, MaxLength } from 'class-validator';

class CreateSpecialityDto {
  @Expose()
  @IsDefined()
  @MaxLength(45)
  name: string;
}

export default CreateSpecialityDto;
