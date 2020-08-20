import { Router } from 'express';
import CreateSpecialityDto from '../dtos/CreateSpecialityDto';
import { NotFound } from '../errors/apiErrors';
import Speciality from '../models/Speciality';
import { validateAndConvert } from '../utils';

const specialitiesRouter = Router();

specialitiesRouter.get('/', async (request, response) => {
  const results = await Speciality.find();

  return response.json(results);
});

specialitiesRouter.post('/', async (request, response) => {
  const createDto = await validateAndConvert(CreateSpecialityDto, request.body);

  const speciality = Speciality.create(createDto);
  await speciality.save();

  return response.status(201).json(speciality);
});

specialitiesRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const speciality = await Speciality.findOne(id);

  if (!speciality) {
    throw new NotFound();
  }

  await speciality.remove();

  return response.status(204).send();
});

export default specialitiesRouter;
