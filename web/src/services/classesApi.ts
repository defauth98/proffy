import { Class, ClassFilter } from '../type/classes';
import api from './api';

export const requestFilteredClasses = async (classFilter: ClassFilter) => {
  const response = await api.get<Class[]>('classes', {
    params: classFilter,
  });

  return response.data;
};

export const requestAllClasses = async () => {
  const response = await api.get<Class[]>('classes');

  return response.data;
};
