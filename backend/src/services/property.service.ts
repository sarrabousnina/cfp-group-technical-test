import * as model from '../models/property.model';
import { CreateInput, UpdateInput } from '../schemas/property.schema';

export const findAll = () => model.getAll();
export const findById = (id: string) => model.getById(id);
export const createOne = (data: CreateInput) => model.create(data);
export const updateOne = (id: string, data: UpdateInput) => model.update(id, data);
export const deleteOne = (id: string) => model.remove(id);