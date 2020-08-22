import { Router } from 'express';
import CreateDoctorDto from '../dtos/CreatDoctorDto';
import { NotFound } from '../errors/apiErrors';
import Doctor from '../models/Doctor';
import CreateDoctorService from '../services/CreateDoctorService';
import { transformAndValidate } from '../utils';

const doctorsRouter = Router();

doctorsRouter.get('/', async (request, response) => {
  const doctors = await Doctor.find({ relations: ['speciality'] });

  return response.json(doctors);
});

doctorsRouter.post('/', async (request, response) => {
  const dto = await transformAndValidate(CreateDoctorDto, request.body);
  const doctorService = new CreateDoctorService();
  const doctor = await doctorService.execute(dto);

  return response.status(201).json(doctor);
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
