import { plainToClass } from 'class-transformer';
import { ClassType } from 'class-transformer/ClassTransformer';
import { validate } from 'class-validator';
import { ValidationError } from '../errors/apiErrors';

async function validateAndConvert<T>(
  type: ClassType<T>,
  plainObject: any,
): Promise<T> {
  const classObject = plainToClass(type, plainObject, {
    excludeExtraneousValues: true,
  });

  const errors = await validate(classObject);
  if (errors.length > 0) {
    throw new ValidationError(errors);
  }

  return classObject;
}

export default validateAndConvert;
