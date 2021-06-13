import axios from 'axios';
import { useQuery } from 'react-query';
import { initAxiosInterceptors } from '../../helpers/helper-auth';

const url = "http://localhost:8000/api/";

async function getDataModule(module) {
  initAxiosInterceptors();
  const query = url + module;
  const res = await axios.get(query);
  return res.data;
}

export const getDataModuleId = async (module, id, setData) => {
  initAxiosInterceptors();
  const query = url + module + "/" + id;
  const {data: item} = await axios.get(query);
  setData(item.data);
  return item.data;

}

export function useItemId(id, module, setData) {
  return useQuery(`${module}${"/"}${id}`, () => getDataModuleId(module, id, setData));
}

export function useGetData(module) {

  return useQuery(module, () => getDataModule(module), {
    staleTime: Infinity,
    notifyOnChangePropsExclusions: ['isStale']
  });
}


export function usePlants() {
  return useQuery('PLANTS', () => getDataModule('plants'), {
    staleTime: Infinity,
    notifyOnChangePropsExclusions: ['isStale'],

  });
}

export function useCategories() {
  return useQuery('CATEGORIES', () => getDataModule('categories'), {
    staleTime: Infinity,
    notifyOnChangePropsExclusions: ['isStale'],
  });
}

export function useProviders() {
  return useQuery('PROVIDERS', () => getDataModule('providers'), {
    staleTime: Infinity,
    notifyOnChangePropsExclusions: ['isStale'],
  });
}

export function useShopping() {
  return useQuery('SHOPPING', () => getDataModule('shopping'), {
    staleTime: Infinity,
    notifyOnChangePropsExclusions: ['isStale'],
  });
}
