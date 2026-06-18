import { Class, ClassFilter } from '../type/classes';
import api from './api';

export const requestFilteredClasses = async (classFilter: ClassFilter) => {
  const response = await api.get<Class[]>('classes', {
    params: { ...classFilter, page: 1 },
  });

  return response.data;
};

export const requestAllClasses = async () => {
  const response = await api.get<Class[]>('classes', {
    params: { page: 1 },
  });

  return response.data;
};
