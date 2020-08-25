import { classToPlain } from 'class-transformer';
import { Router } from 'express';
import CreateDoctorDto from '../dtos/CreatDoctorDto';
import FilterDoctorDto from '../dtos/FilterDoctorDto';
import { NotFound } from '../errors/apiErrors';
import Doctor from '../models/Doctor';
import CreateDoctorService from '../services/CreateDoctorService';
import { transformAndValidate } from '../utils';

const doctorsRouter = Router();

doctorsRouter.get('/', async (request, response) => {
  const { search, speciality } = await transformAndValidate(
    FilterDoctorDto,
    request.query,
  );

  const doctors = await Doctor.findBySearchAndSpeciality({
    search,
    speciality,
  });

  return response.json(classToPlain(doctors));
});

doctorsRouter.post('/', async (request, response) => {
  const dto = await transformAndValidate(CreateDoctorDto, request.body);
  const doctorService = new CreateDoctorService();
  const doctor = await doctorService.execute(dto);

  return response.status(201).json(classToPlain(doctor));
});

doctorsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const doctor = await Doctor.findOne(id);

  if (!doctor) {
    throw new NotFound();
  }

  await doctor.remove();

  return response.status(204).send();
});

export default doctorsRouter;
